# ✅ Checklist Setup Firebase & Admin Lisensi — RAB Cerdas

Ikuti dari atas ke bawah, centang tiap selesai. Total waktu: ±20–30 menit.

---

## BAGIAN 1 — Buat Project Firebase

- [ ] Buka **console.firebase.google.com**, login pakai akun Google Anda
- [ ] Klik **Add project** → beri nama, misal `rab-cerdas`
- [ ] Google Analytics: boleh dilewati (tidak wajib) → klik **Create project**
- [ ] Tunggu sampai muncul "Your new project is ready" → klik **Continue**

## BAGIAN 2 — Daftarkan Web App & Isi Config

- [ ] Di halaman utama project, klik ikon **`</>`** (Web)
- [ ] Isi nickname app, misal `RAB Cerdas Web` → klik **Register app**
- [ ] Firebase Hosting: boleh **tidak usah dicentang**
- [ ] Muncul kode `firebaseConfig` — **salin semuanya**
- [ ] Buka file **`firebase-config.js`** (satu folder dengan `index.html`)
- [ ] Tempel/ganti isi `firebaseConfig` dengan yang baru disalin (jangan ubah bagian lain)
- [ ] Simpan file

## BAGIAN 3 — Aktifkan Login Email/Password

- [ ] Sidebar kiri Firebase Console → **Build → Authentication**
- [ ] Klik **Get started**
- [ ] Tab **Sign-in method** → klik **Email/Password**
- [ ] Aktifkan toggle pertama → **Save**

## BAGIAN 4 — Aktifkan Firestore Database

- [ ] Sidebar kiri → **Build → Firestore Database**
- [ ] Klik **Create database**
- [ ] Pilih lokasi terdekat, misal `asia-southeast2 (Jakarta)` → **Next**
- [ ] Pilih **Start in production mode** → **Enable**

## BAGIAN 5 — Pasang Aturan Keamanan (Rules)

- [ ] Di halaman Firestore Database, klik tab **Rules**
- [ ] Hapus semua isi kotak kode yang ada
- [ ] Buka file **`firestore.rules`** dari ZIP, salin **seluruh isinya**, tempel ke kotak Rules
- [x] ✅ Email admin **sudah otomatis diisi**: `ragi.kayu19@gmail.com` (tidak perlu diganti lagi, kecuali Anda mau pakai email lain)
- [ ] Klik **Publish**

## BAGIAN 6 — Buat Akun Admin

Pilih **salah satu** cara — pastikan pakai email **`ragi.kayu19@gmail.com`**:

**Cara A — lewat aplikasi (lebih gampang)**
- [ ] Buka `index.html` (versi Trial) di browser
- [ ] Daftar akun baru, pakai email **`ragi.kayu19@gmail.com`**
- [ ] Selesai daftar

**Cara B — langsung dari Firebase Console**
- [ ] Sidebar → **Build → Authentication → tab Users**
- [ ] Klik **Add user**
- [ ] Isi email **`ragi.kayu19@gmail.com`** + buat password → **Add user**

## BAGIAN 7 — Buka Halaman Admin & Generate Kode

- [ ] Buka file **`admin-generator.html`** di browser (dobel-klik dari laptop, atau upload ke hosting satu folder dengan file lain)
- [ ] Login pakai email + password admin dari Bagian 6
- [ ] Jika berhasil login → muncul form "Buat & Simpan Kode"
- [ ] Isi **jumlah kode** yang mau dibuat
- [ ] Isi **nama paket** (bebas, untuk catatan Anda, misal "PRO Selamanya")
- [ ] Klik **Buat & Simpan Kode ke Firestore**
- [ ] Tunggu proses selesai → kode-kode muncul di kotak teks bawah
- [ ] **Salin & simpan** kode-kode itu di catatan pribadi (spreadsheet/notes)

---

## 🔧 Kalau Ada yang Gagal

| Masalah | Kemungkinan Penyebab |
|---|---|
| Login admin gagal / "permission denied" | Akun admin di Bagian 6 tidak didaftarkan pakai `ragi.kayu19@gmail.com` persis (cek spasi/huruf besar-kecil), atau Rules belum di-Publish |
| Kode gagal tersimpan setelah generate | Rules belum di-**Publish** ulang setelah diganti emailnya (ulangi Bagian 5 langkah terakhir) |
| App masih pakai mode lokal, bukan cloud | `firebase-config.js` belum terisi benar — cek lagi Bagian 2 |
| User bilang kode "tidak ditemukan" | Kode salah ketik — kode pakai huruf besar semua, tanpa spasi |

---

## 📲 Alur Setelah Semua Siap

1. User bayar via WhatsApp seperti biasa
2. Anda buka catatan kode → ambil **satu** kode yang belum dipakai
3. Kirim kode itu ke user (mis. `RABPRO-4F2K-91QZ`)
4. User buka tab **★ Upgrade** di app → kolom "Sudah punya kode lisensi?" → masukkan kode → **Aktifkan**
5. Status PRO aktif permanen di akun mereka
