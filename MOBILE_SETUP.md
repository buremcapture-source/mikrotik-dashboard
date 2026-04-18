# 📱 Setup Mobile & Remote Access

---

## **Opsi 1: Akses Dashboard dari Mobile (Lokal Network) ✅**

### Setup:
1. **Jalankan proxy server di komputer:**
   ```bash
   node proxy-server.js
   ```
   Catat IP komputer Anda (contoh: `192.168.1.100`)

2. **Di mobile (smartphone/tablet), akses:**
   - Buka browser → ketik: `http://192.168.1.100:3000`
   - Dashboard akan load langsung
   - Atau buka terminal proxy, lihat: `📱 Akses dari device dalam jaringan`

3. **Login:**
   - Router IP: `http://192.168.1.2`
   - Username & Password: sesuai MikroTik
   - **Proxy Server:** `http://192.168.1.100:3000` (IP komputer, bukan localhost!)

---

## **Opsi 2: Akses dari Luar Jaringan (VPN)**

Anda sudah punya VPN: `http://remote.nathaya.my.id:14271/`

### Step:
1. Jalankan proxy server di komputer lokal (tetap)
2. Dari mana saja, connect ke VPN `remote.nathaya.my.id:14271`
3. Setelah VPN terhubung, akses: `http://192.168.1.100:3000`
   - IP komputer di LAN (sama seperti Opsi 1, tapi lewat VPN)

---

## **Opsi 3: Akses Langsung via URL (Modern!) ⭐ RECOMMENDED**

Kalau mau dashboard bisa diakses dari luar tanpa VPN/tunnel, deploy ke cloud:

### Cara Singkat:
1. **Upload proxy-server.js & dashboard ke cloud** (Heroku, Railway, Render, dll)
2. **Setup URL:** `https://dashboard.yourdomain.com`
3. **Akses dari mana saja**

Saya buat file untuk step ini di bawah.

---

## **Opsi 4: Mobile App Standalone ⭐**

Saya buat simple **Node.js server** yang bisa di-package jadi desktop app + web server.

```bash
# Install global:
npm install -g @neutralino/neutralino-cli

# Atau gunakan Electron/Tauri untuk native mobile
```

Kalau mau saya buatkan template ini?

---

## 📊 Perbandingan Opsi:

| Opsi | Setup | Akses | Mobile | Remote | Recommended |
|------|-------|-------|--------|--------|------------|
| **1. Lokal Network** | ✅ Mudah | Lokal saja | ✅ Ya | ❌ Tidak | Untuk testing |
| **2. VPN** | ✅ Mudah | Via VPN | ✅ Ya | ✅ Ya* | Sudah ada setup |
| **3. Cloud** | 🟡 Medium | Public | ✅ Ya | ✅ Ya | Professional |
| **4. Native App** | 🔴 Sulit | All | ✅ Ya | ✅ Ya | Future |

---

## 🚀 Quick Mobile Access (30 detik)

**Desktop:**
```bash
node proxy-server.js
```

**Mobile - buka browser:**
```
http://[IP-DESKTOP]:3000
```

**Contoh:**
- Cari IP desktop di jaringan: `192.168.1.100`
- Buka di mobile: `http://192.168.1.100:3000`
- Done! ✅

---

## 🔧 Cara Cari IP Komputer:

### Windows:
```bash
ipconfig
# Cari "IPv4 Address" di bawah WiFi adapter
```

### Mac/Linux:
```bash
ifconfig
# Cari "inet" address
```

---

## ⚡ Troubleshooting Mobile

**Error: "Tidak bisa terhubung"**
- ✓ Pastikan mobile & desktop di WiFi yang sama
- ✓ Cek IP komputer dengan perintah di atas
- ✓ Proxy server masih berjalan di desktop
- ✓ Firewall desktop tidak block port 3000

**Test koneksi di mobile:**
```
Buka: http://[IP]:3000/
Seharusnya muncul form login
```

---

## 📦 Deployment ke Cloud (Advanced)

Untuk akses public tanpa VPN:

### Option A: Heroku (Free tier ended, tapi bisa pakai alternative)
```bash
npm install -g heroku
heroku login
heroku create
git push heroku main
```

### Option B: Railway.app (Recommended, Free)
1. Push code ke GitHub
2. Signup di railway.app
3. Connect repository
4. Deploy (automatic)
5. Get public URL

### Option C: Render (Free, reliable)
Mirip Railway, bisa deploy Node.js app dalam menit.

---

**Mulai dari Opsi 1 dulu, baru extend ke Opsi 2/3!** 🎉
