# 🎯 Setup Repository di GitHub - Step by Step

Panduan lengkap untuk upload semua file ke GitHub repository.

---

## 📋 Checklist Sebelum Start

- [ ] GitHub account sudah ada
- [ ] Git sudah terinstall di komputer
- [ ] SSH key sudah setup (optional tapi recommended)
- [ ] Semua file sudah siap di folder `mikrotik-dashboard-repo/`

---

## 🚀 Step 1: Create Repository di GitHub

1. **Login ke GitHub**: https://github.com/login
2. **Klik "+" icon** (top right) → **New repository**
3. **Repository name**: `mikrotik-dashboard`
4. **Description** (optional): `MikroTik PPPoE Client Manager Dashboard`
5. **Public atau Private**: Pilih sesuai preferensi
6. **Uncheck** "Initialize with README" (karena sudah ada)
7. **Uncheck** "Add .gitignore" (sudah ada)
8. **Uncheck** "Choose a license" (sudah ada)
9. **Click**: **Create repository**

Catat URL repository: `https://github.com/YOUR_USERNAME/mikrotik-dashboard.git`

---

## 🔧 Step 2: Setup Local Repository

Buka terminal/command prompt di folder `mikrotik-dashboard-repo/`:

```bash
# Initialize git repository
git init

# Set user info
git config user.name "Nama Anda"
git config user.email "email@anda.com"

# Global (opsional, tapi recommended):
git config --global user.name "Nama Anda"
git config --global user.email "email@anda.com"
```

---

## 📦 Step 3: Add Files & Commit

```bash
# Check status
git status

# Add semua file
git add .

# Commit
git commit -m "Initial commit: MikroTik Dashboard v1.0"
```

---

## 🔗 Step 4: Connect ke GitHub Remote

```bash
# Add remote (ganti URL dengan milik Anda!)
git remote add origin https://github.com/YOUR_USERNAME/mikrotik-dashboard.git

# Verify
git remote -v
```

---

## 🚀 Step 5: Push ke GitHub

```bash
# Rename branch ke "main" (jika perlu)
git branch -M main

# Push ke GitHub
git push -u origin main
```

**Output seharusnya:**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Compressing objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), done.
Total XX (delta X), reused 0 (delta 0)
To https://github.com/YOUR_USERNAME/mikrotik-dashboard.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ **Selesai!** Repository Anda sekarang di GitHub!

---

## 📱 Step 6: Verify di GitHub

1. **Refresh halaman** https://github.com/YOUR_USERNAME/mikrotik-dashboard
2. Seharusnya melihat semua file sudah terupload:
   - README.md
   - proxy-server.js
   - mikrotik-dashboard-v2.html
   - package.json
   - Dockerfile
   - railway.json
   - Docs (.md files)
   - LICENSE
   - .gitignore

---

## 🔄 Update Repository (Kedepannya)

Setiap kali ada perubahan:

```bash
# Check status
git status

# Add perubahan
git add .

# Commit
git commit -m "Describe your changes"

# Push
git push origin main
```

---

## ☁️ Step 7: Deploy ke Railway (Optional)

Setelah repo di GitHub:

1. **Buka https://railway.app**
2. **Login dengan GitHub**
3. **New Project** → **Deploy from GitHub repo**
4. **Select repository**: `mikrotik-dashboard`
5. **Wait for deployment** (~2-3 menit)
6. **Get public URL** dari Railway dashboard
7. **Share URL** untuk akses public!

Lihat file `RAILWAY_DEPLOY.md` untuk detail lengkap.

---

## 🔑 SSH Setup (Recommended untuk kemudian)

Jika mau pakai SSH (lebih aman dari HTTP):

```bash
# Generate SSH key (jika belum ada)
ssh-keygen -t ed25519 -C "email@anda.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub  # Mac/Linux
# atau buka file: C:\Users\YourUsername\.ssh\id_ed25519.pub  # Windows

# Add SSH key ke GitHub:
# GitHub Settings → SSH and GPG keys → New SSH key
# Paste public key & save
```

Kemudian ubah remote URL:
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/mikrotik-dashboard.git
```

---

## 🆘 Troubleshooting

### Error: "fatal: not a git repository"
```bash
cd mikrotik-dashboard-repo/
git init
```

### Error: "Permission denied (publickey)"
- Cek SSH key sudah benar di GitHub settings
- Atau gunakan HTTPS URL instead

### Error: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://...
```

### Mau change repository name?
- GitHub settings → rename
- Update local: `git remote set-url origin https://...`

---

## 📊 GitHub Features

Setelah repository aktif, bisa gunakan:

### Issues
- `Issues` tab → buat issue untuk bug/feature request
- Colaborators bisa comment & discuss

### Discussions
- Enable di Settings → General → Features → Discussions
- Untuk Q&A & general discussion

### Actions (CI/CD)
- Automatisasi testing, deployment, dll
- Advanced feature

### Pages
- Host static website
- Bisa host documentation

---

## 📝 File Checklist

Repository harus punya:
- ✅ README.md (dokumentasi utama)
- ✅ LICENSE (MIT License)
- ✅ .gitignore (ignore files)
- ✅ CONTRIBUTING.md (contributing guide)
- ✅ proxy-server.js (core file)
- ✅ mikrotik-dashboard-v2.html (UI)
- ✅ package.json (dependencies)
- ✅ Dockerfile (docker config)
- ✅ railway.json (railway config)
- ✅ Dokumentasi (.md files)

---

## 🎉 Selesai!

Repository Anda sekarang:
- ✅ Di GitHub (version control)
- ✅ Siap untuk collaboration
- ✅ Siap untuk deploy ke Railway
- ✅ Professional & production-ready

**Next step**: Deploy ke Railway (lihat RAILWAY_DEPLOY.md)

---

**Happy pushing! 🚀**
