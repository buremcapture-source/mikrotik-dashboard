# ☁️ Deploy ke Cloud (Railway) - Akses Public

Setelah sukses akses lokal, sekarang buat dashboard bisa diakses dari mana saja (public internet).

---

## 🚀 Setup Railway (Easiest Cloud Hosting)

Railway adalah platform cloud **gratis untuk 500 jam/bulan** (cukup untuk dashboard).

### Step 1: Siapkan GitHub Repository

```bash
# Buat folder project
mkdir mikrotik-dashboard
cd mikrotik-dashboard

# Initialize git
git init
git config user.name "Your Name"
git config user.email "your@email.com"

# Copy semua file ke folder ini:
# - proxy-server.js
# - mikrotik-dashboard-v2.html
# - package.json
# - Dockerfile
# - railway.json

# Add & commit
git add .
git commit -m "Initial commit: MikroTik Dashboard"

# Create repo di GitHub (https://github.com/new)
# Nama: mikrotik-dashboard
git remote add origin https://github.com/YOUR_USERNAME/mikrotik-dashboard.git
git branch -M main
git push -u origin main
```

---

### Step 2: Login ke Railway

1. Buka https://railway.app
2. Click **"Login"** → Sign in dengan GitHub
3. Authorize Railway app

---

### Step 3: Deploy

1. **New Project** → **Deploy from GitHub repo**
2. Select repository: `mikrotik-dashboard`
3. Railway auto-detect Dockerfile
4. Click **Deploy**

⏳ Tunggu ~2 menit...

---

### Step 4: Dapatkan Public URL

Setelah deploy selesai:

1. Buka Railway dashboard
2. Click project → **Deployments** tab
3. Lihat **URL** (contoh: `https://mikrotik-dashboard-prod.railway.app`)
4. Copy & share!

---

## 📱 Akses dari Mana Saja

**Desktop/Mobile/Tablet:**
```
https://mikrotik-dashboard-prod.railway.app
```

**Login:**
- Router IP: `http://192.168.1.2` (IP lokal MikroTik)
- Username & Password: sesuai MikroTik
- Proxy Server: `https://mikrotik-dashboard-prod.railway.app` (auto-filled)

✅ Done! Dashboard sekarang accessible dari internet!

---

## ⚙️ Custom Domain (Optional)

Mau pakai domain sendiri (misal: `dashboard.yourdomain.com`)?

### Step 1: Beli domain
- Namecheap, Cloudflare, atau registrar lokal
- Contoh: `yourdomain.com`

### Step 2: Setup DNS
1. Di Railway → Project Settings → **Domains**
2. Add custom domain: `dashboard.yourdomain.com`
3. Railway akan generate CNAME record
4. Update DNS di registrar domain Anda

### Step 3: Wait SSL
Railway auto-generate HTTPS certificate (via Let's Encrypt)

---

## 🔐 Security Tips (Penting!)

Setelah public, pastikan setup keamanan:

### 1. Add Authentication (Optional tapi recommended)

Modifikasi `proxy-server.js` untuk require password:

```javascript
// Tambah middleware auth
const DASHBOARD_PASS = process.env.DASHBOARD_PASS || 'ubahsendirisecure123';

function checkAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const credentials = Buffer.from(authHeader?.split(' ')[1] || '', 'base64').toString();
  
  if (credentials !== `dashboard:${DASHBOARD_PASS}`) {
    res.writeHead(401);
    res.end('Unauthorized');
    return;
  }
  next();
}

// Apply ke route /proxy
if (req.url.startsWith('/proxy')) {
  checkAuth(req, res, () => {
    // ... proxy logic
  });
}
```

### 2. Use Environment Variables

Di Railway → Settings → Environment Variables

```
DASHBOARD_PASS=ubah_dengan_password_kuat_12345
```

### 3. Enable HTTPS (Automatic)

Railway udah provide HTTPS free + SSL certificate.

---

## 🔧 Monitoring & Logs

Railway dashboard menunjukkan:
- **Logs** - error message jika ada
- **Metrics** - memory, CPU usage
- **Deployments** - history deploy

Kalau ada error, lihat logs untuk debug.

---

## 💰 Pricing

**Railway:**
- **Free:** $5/bulan credit (~500 jam)
- **Pro:** $10/bulan credit
- Dashboard hanya pakai ~10-50 MB, jadi FREE tier cukup!

**Alternative (jika mau lebih murah):**
- **Render:** https://render.com (free tier unlimited, tapi ada limitations)
- **Heroku:** Free tier sudah dihapus (2022)
- **Vercel:** Untuk frontend-only
- **Replit:** Kalau mau simple

---

## 🐛 Troubleshooting

### "Cannot read property 'split' of undefined"
Pastikan `Dockerfile` dan file lain copyrighted benar.

### "Port already in use"
Railway auto-assign port 3000.

### "Proxy connection timeout"
MikroTik di lokal tidak bisa diakses dari cloud. Gunakan VPN atau expose via port forward.

---

## 🔄 Update Dashboard

Setiap kali update file:

```bash
git add .
git commit -m "Update dashboard UI"
git push origin main
```

Railway **auto-redeploy** otomatis!

---

## 📊 Advanced: Custom Domain + Email Alerts

1. **Custom Domain** → Railway Domains setting
2. **Email Notifications** → Railway alerts jika deployment fail
3. **Auto-rollback** → Kalau deployment error, auto-revert

---

**Selesai! Dashboard sekarang production-ready dan accessible dari mana saja!** 🎉

Mau next step? Bisa tambah fitur seperti:
- 📊 Historical logs isolir
- 🔔 Notifikasi WhatsApp/Email
- 📈 Charts bandwidth per client
- 👥 Multi-user management

Let me know! 😊
