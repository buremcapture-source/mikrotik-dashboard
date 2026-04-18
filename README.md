# 🌐 MikroTik PPPoE Client Manager Dashboard

Dashboard web untuk mengelola client PPPoE MikroTik dengan mudah. Isolir/aktifkan client tanpa harus merubah setting MikroTik secara manual.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node](https://img.shields.io/badge/node-18.x-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Fitur

- ✅ **Manage PPPoE Clients** - Lihat daftar semua client terhubung
- ✅ **Isolir Instant** - Blokir akses internet client dengan satu klik
- ✅ **Aktivasi Client** - Kembalikan akses normal client
- ✅ **Real-time Status** - Online/Offline/Isolated status
- ✅ **Responsive Design** - Desktop & Mobile friendly
- ✅ **Live Statistics** - Total, Online, Isolated, Offline count
- ✅ **Search & Filter** - Cari client by nama
- ✅ **Detail View** - Lihat informasi lengkap client

---

## 🚀 Quick Start

### Requirement
- Node.js 18.x atau lebih tinggi
- MikroTik RouterOS 7.x dengan REST API enabled
- Network akses ke MikroTik

### Setup Lokal (3 Langkah)

**1. Download/Clone repository ini**
```bash
git clone https://github.com/YOUR_USERNAME/mikrotik-dashboard.git
cd mikrotik-dashboard
```

**2. Jalankan Proxy Server**
```bash
node proxy-server.js
```
Output:
```
╔══════════════════════════════════════════════════════════╗
║       🚀 MikroTik CORS Proxy & Dashboard Server         ║
╚══════════════════════════════════════════════════════════╝

📱 Akses dari device dalam jaringan:
   • Desktop:  http://localhost:3000
   • Mobile:   http://192.168.1.100:3000
```

**3. Buka Dashboard di Browser**
- Desktop: `http://localhost:3000`
- Mobile: `http://192.168.1.100:3000` (ganti IP desktop Anda)

Login dengan credential MikroTik Anda → Done! ✅

---

## 📱 Cara Akses

### Opsi 1: Desktop Lokal
```
http://localhost:3000
```
✅ Cepat | ❌ Hanya desktop

### Opsi 2: Mobile + Desktop (Lokal Network)
```
http://[IP-DESKTOP]:3000
# Contoh: http://192.168.1.100:3000
```
✅ Mobile & Desktop | ❌ Tidak bisa dari luar

### Opsi 3: Cloud Public (Railway.app)
```
https://mikrotik-dashboard-prod.railway.app
```
✅ Akses dari mana saja | 🟡 Setup lebih kompleks

Lihat **RAILWAY_DEPLOY.md** untuk setup cloud.

---

## 📋 Setup MikroTik

Sebelum pakai dashboard, pastikan MikroTik sudah siap:

### 1. Enable REST API
```
# Di MikroTik terminal:
/ip service enable www
```

Atau via Winbox:
> IP → Services → centang **www** (port 80)

### 2. Create User untuk Dashboard
```
/user add name=dashboard password=UBAH_DENGAN_PASSWORD_KUAT group=write
```

### 3. Pastikan Profile Isolir Ada
```
/ppp profile
# Pastikan ada: "Profil Isolir" dan "Profil Isolir Manual"
```

---

## 🔧 Struktur File

```
mikrotik-dashboard/
├── proxy-server.js              # Node.js proxy server (CORS bypass)
├── mikrotik-dashboard-v2.html   # Web dashboard UI
├── package.json                 # Dependencies
├── Dockerfile                   # Docker container config
├── railway.json                 # Railway deployment config
├── .gitignore                   # Git ignore rules
├── README.md                    # Dokumentasi ini
├── QUICK_START.md              # Quick start guide
├── SETUP_GUIDE.md              # Setup lokal detail
├── MOBILE_SETUP.md             # Mobile access guide
└── RAILWAY_DEPLOY.md           # Cloud deployment guide
```

---

## 🌐 Deployment

### Local Development
```bash
npm install  # (opsional, tidak perlu dependency eksternal)
node proxy-server.js
```

### Cloud Deployment (Railway)

Lihat file `RAILWAY_DEPLOY.md` untuk panduan lengkap.

Quick setup:
1. Push ke GitHub
2. Login ke railway.app
3. Connect repository
4. Auto-deploy!

---

## 🔐 Security

### Best Practices
- ✅ Gunakan HTTPS di production
- ✅ Password MikroTik strong & kompleks
- ✅ Firewall restrict akses jika perlu
- ✅ Monitor logs untuk aktivitas mencurigakan

### Untuk Public Access
- Tambahkan authentication layer
- Setup SSL/HTTPS
- Rate limiting
- IP whitelist (optional)

---

## 🐛 Troubleshooting

### "Cannot connect to router"
```
1. Cek REST API MikroTik aktif: /ip service enable www
2. Cek IP router: ping 192.168.1.2
3. Cek user dashboard ada di MikroTik
4. Cek password benar
```

### "Tidak bisa akses dari mobile"
```
1. Cek IP desktop: ipconfig (Windows) atau ifconfig (Mac/Linux)
2. Cek mobile & desktop di WiFi sama
3. Cek firewall tidak block port 3000
4. Test: http://[IP-DESKTOP]:3000
```

### "Cloud deployment gagal"
```
1. Check Railway logs
2. Verify Dockerfile syntax
3. Verify package.json correct
4. Try redeploy dari Railway dashboard
```

Lihat `SETUP_GUIDE.md` untuk troubleshooting lengkap.

---

## 📊 API Reference

Dashboard berkomunikasi dengan MikroTik via REST API:

### Endpoints
- `GET /rest/ppp/secret` - List PPPoE secrets
- `GET /rest/ppp/active` - List active connections
- `PATCH /rest/ppp/secret/{id}` - Update client profile

### Request Format
```javascript
// Via proxy server:
GET /proxy?target=http://192.168.1.2&path=/rest/ppp/secret&auth=BASE64_CREDENTIALS
```

---

## 🤝 Kontribusi

Contributions welcome! 

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📝 Roadmap

- [ ] Historical logs isolir/aktivasi
- [ ] Bandwidth monitoring per client
- [ ] WhatsApp/Email notifications
- [ ] Multi-user management
- [ ] Client grouping by paket
- [ ] Bulk actions (isolir multiple)
- [ ] Dark mode toggle
- [ ] API documentation
- [ ] Mobile native app

---

## 🆘 Support

- 📖 Lihat dokumentasi: `SETUP_GUIDE.md`
- 🚀 Quick start: `QUICK_START.md`
- 📱 Mobile setup: `MOBILE_SETUP.md`
- ☁️ Cloud deploy: `RAILWAY_DEPLOY.md`
- 🐛 Issue? Open GitHub issue

---

## 📜 License

MIT License - feel free to use for personal & commercial projects.

---

## 👨‍💻 Author

Created for HN-Net WiFi Management System

---

## 🎉 Credits

- MikroTik RouterOS
- Node.js
- Railway.app

---

## 📞 Version

- **Current:** v1.0.0
- **Last Updated:** April 2026
- **Status:** Stable ✅

---

**Happy managing your clients!** 🚀

Untuk pertanyaan atau feedback, silakan buka issue di repository ini.
