# 🚀 Setup Guide: MikroTik PPPoE Dashboard

## 📋 Requirements
- Node.js sudah terinstal di komputer lokal
- Berada di jaringan yang sama dengan MikroTik
- REST API MikroTik sudah aktif (http service enabled)

---

## ⚙️ Step 1: Siapkan Proxy Server

### 1.1 Buka terminal/command prompt di folder tempat file `proxy-server.js` disimpan

### 1.2 Install dependency (jika belum)
```bash
npm init -y
npm install  # (proxy server tidak perlu dependency eksternal, berjalan dengan Node.js bawaan)
```

### 1.3 Jalankan proxy server
```bash
node proxy-server.js
```

Seharusnya muncul:
```
╔══════════════════════════════════════════════════════════╗
║       🚀 MikroTik CORS Proxy & Dashboard Server         ║
╚══════════════════════════════════════════════════════════╝

📱 Akses dari device dalam jaringan:
   • Desktop:  http://localhost:3000
   • Mobile:   http://192.168.1.100:3000  (contoh IP)
```

**Biarkan terminal ini tetap buka!** Jangan tutup selama menggunakan dashboard.

---

## 🌐 Step 2: Buka Dashboard di Browser

Ada 3 cara akses sesuai device Anda:

### ✅ OPSI A: Desktop (Lokal)
1. Buka browser → `http://localhost:3000`
2. Dashboard akan load otomatis
3. Isi form login:
   - **Router IP**: `http://192.168.1.2`
   - **Username**: dashboard (atau user MikroTik Anda)
   - **Password**: sesuai MikroTik
   - **Proxy Server**: `http://localhost:3000`
4. Klik **Connect**

### ✅ OPSI B: Mobile/Tablet (Lokal Network)
1. **Cari IP komputer di mana proxy server berjalan:**
   ```bash
   # Windows (di command prompt):
   ipconfig
   # Cari "IPv4 Address" di bagian WiFi adapter
   # Contoh: 192.168.1.100
   
   # Mac/Linux (di terminal):
   ifconfig
   # Cari "inet" address
   ```

2. **Buka di mobile browser:**
   ```
   http://192.168.1.100:3000
   ```
   (Ganti 192.168.1.100 dengan IP komputer Anda)

3. **Login:**
   - **Router IP**: `http://192.168.1.2`
   - **Username**: dashboard
   - **Password**: sesuai MikroTik
   - **Proxy Server**: `http://192.168.1.100:3000` (PENTING: ganti localhost!)

### ✅ OPSI C: Cloud/Public Internet (Advanced)
- Lihat file `RAILWAY_DEPLOY.md`
- Deploy ke cloud (Railway/Render/dll)
- Akses dari mana saja tanpa VPN
- Rekomendasi untuk akses profesional

---

## ✅ Troubleshooting

### Error: "Tidak bisa terhubung ke proxy server"
**Solusi:**
- Pastikan proxy server sudah berjalan (`node proxy-server.js`)
- Cek terminal proxy server, lihat apakah ada error message
- Pastikan port 3000 tidak sedang digunakan aplikasi lain

Untuk cek port 3000:
```bash
# Windows:
netstat -ano | findstr :3000

# Mac/Linux:
lsof -i :3000
```

### Error: "Login gagal. Periksa username/password"
**Solusi:**
- Verifikasi username & password yang benar di MikroTik
- Pastikan user tersebut memiliki permission untuk akses REST API (group: admin/write)

### Dashboard tidak bisa isolir/aktifkan client
**Solusi:**
1. Periksa apakah profile client yang digunakan ada di MikroTik:
   - Buka Winbox → PPP → Profiles
   - Pastikan ada: `Profil Isolir`, `Speed 7MB`, `Speed 10MB`, `Profil 50mb`

2. Pastikan firewall rules sudah setup sesuai konfigurasi awal

---

## 🔧 Advanced: Akses dari Luar Jaringan

Setelah berhasil di lokal, untuk akses dari luar jaringan (public):

### Option A: Gunakan VPN (Recommended)
- Sudah ada di konfigurasi Anda: `http://remote.nathaya.my.id:14271/`
- Dari remote, sambung VPN, lalu akses dashboard via IP lokal `192.168.1.2`

### Option B: Port Forward + HTTPS
1. Setup HTTPS di MikroTik (generate certificate)
2. Port forward 443 ke MikroTik di router ISP
3. Update dashboard ke `https://your-domain.com`
4. Deploy proxy server di server public atau cloud

### Option C: Cloud Deployment
- Deploy proxy server ke Heroku, Railway, atau VPS
- Update proxy URL di dashboard ke server cloud
- MikroTik harus bisa reach server cloud (biasanya lewat firewall)

---

## 📝 Catatan Fitur

### Status Colors:
- 🟢 **Online** = Client terhubung & akses normal
- 🔴 **Diisolir** = Client terhubung tapi internet diblokir
- ⚫ **Offline** = Client tidak terhubung

### Isolir = Blokir Internet Tapi:
- ✓ DNS tetap aktif (bisa ping)
- ✓ WhatsApp tetap bisa (sesuai firewall rules)
- ✗ Website, Download, App lain = BLOKIR

### Profil Paket:
- Speed 2MB, 5MB, 7MB, 10MB, 50MB sesuai konfigurasi

---

## 🔐 Security Notes

1. **Jangan expose proxy server ke public tanpa authentication**
   - Tambahkan auth check di proxy-server.js jika akan online
   
2. **Gunakan HTTPS untuk koneksi ke MikroTik** dari internet
   - Saat ini menggunakan HTTP (aman untuk lokal network)

3. **Username/Password dashboard = akses admin MikroTik**
   - Gunakan user dengan permission terbatas jika memungkinkan
   - Di MikroTik: `/user add name=dashboard password=kuat group=write`

---

## 📞 Support

Jika ada masalah:
1. Check browser console (F12 → Console tab)
2. Check terminal proxy server untuk error message
3. Verify MikroTik connectivity: ping 192.168.1.2
4. Test REST API manual:
   ```bash
   curl -u dashboard:password http://192.168.1.2/rest/ppp/secret
   ```

---

**Happy managing! 🎉**
