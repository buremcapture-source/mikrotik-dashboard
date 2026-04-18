// MikroTik CORS Proxy Server
// Jalankan: node proxy-server.js

const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;

// Get local IP
function getLocalIP() {
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const LOCAL_IP = getLocalIP();

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Serve dashboard HTML
  if (req.url === '/' || req.url === '/dashboard') {
    serveFile(res, 'mikrotik-dashboard-v2.html', 'text/html');
    return;
  }

  // Proxy endpoint
  if (req.url.startsWith('/proxy')) {
    res.setHeader('Content-Type', 'application/json');
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        handleProxy(req, res, body);
      } catch (err) {
        console.error('Error:', err);
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404);
  res.end('Not found');
});

function serveFile(res, filename, contentType) {
  const filePath = path.join(__dirname, filename);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(`File not found: ${filename}`);
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

function handleProxy(req, res, body) {
  const queryObj = url.parse(req.url, true).query;
  const targetRouter = queryObj.target;
  const targetPath = queryObj.path;
  const auth = queryObj.auth;

  if (!targetRouter || !targetPath || !auth) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'Missing target, path, or auth' }));
    return;
  }

  const targetUrl = url.parse(targetRouter + targetPath);
  const protocol = targetRouter.startsWith('https') ? https : http;

  const options = {
    hostname: targetUrl.hostname,
    port: targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80),
    path: targetUrl.path,
    method: req.method,
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    },
    rejectUnauthorized: false
  };

  console.log(`[${req.method}] ${targetRouter}${targetPath}`);

  const proxyReq = protocol.request(options, (proxyRes) => {
    let responseBody = '';
    proxyRes.on('data', chunk => { responseBody += chunk; });
    proxyRes.on('end', () => {
      res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
      res.end(responseBody);
    });
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err);
    res.writeHead(502);
    res.end(JSON.stringify({ error: err.message }));
  });

  if (body) proxyReq.write(body);
  proxyReq.end();
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║       🚀 MikroTik CORS Proxy & Dashboard Server         ║
╚══════════════════════════════════════════════════════════╝

📱 Akses dari device dalam jaringan:
   • Desktop:  http://localhost:${PORT}
   • Mobile:   http://${LOCAL_IP}:${PORT}

🔌 Proxy endpoint: http://${LOCAL_IP}:${PORT}/proxy

✨ Pastikan dashboard file berada di folder yang sama dengan proxy-server.js
  `);
});
