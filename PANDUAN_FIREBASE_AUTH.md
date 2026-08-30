# Panduan Mengaktifkan Login dengan Firebase — RAB Cerdas

Aplikasi RAB Cerdas sudah dilengkapi sistem login (email/No HP/WA + sandi).
Secara default, akun tersimpan **lokal di HP** (localStorage) — jalan tanpa
setup apa pun, tapi akun tidak bisa dipakai login di HP/device lain.

Ikuti langkah di bawah ini untuk mengaktifkan **Firebase Authentication**,
supaya akun pengguna tersimpan terpusat dan bisa dipakai login dari HP mana
saja (juga siap untuk banyak pengguna sekaligus, misalnya kalau Anda menjual
aplikasi ini ke klien lain).

---

## 1. Buat Project Firebase

1. Buka https://console.firebase.google.com
2. Klik **Add project** (Tambah project) → beri nama, misal `rab-cerdas`.
3. Google Analytics boleh diaktifkan atau dilewati — tidak wajib.
4. Tunggu sampai project selesai dibuat.

## 2. Daftarkan Web App & Salin Konfigurasi

1. Di halaman utama project, klik ikon **`</>`** (Web) untuk menambah app.
2. Beri nickname, misal `RAB Cerdas Web`. Centang "Also set up Firebase
   Hosting" **boleh dilewati** (tidak wajib untuk fitur login ini).
3. Firebase akan menampilkan blok kode berisi objek `firebaseConfig` —
   salin isinya.
4. Buka file **`firebase-config.js`** (satu folder dengan `index.html`),
   ganti isi objek `firebaseConfig` di sana dengan yang baru Anda salin.
   Contoh setelah diisi:
   ```js
   const firebaseConfig = {
     apiKey: "AIzaSyABCDEF...",
     authDomain: "rab-cerdas.firebaseapp.com",
     projectId: "rab-cerdas",
     storageBucket: "rab-cerdas.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456",
     measurementId: "G-XXXXXXX"
   };
   ```
5. Simpan file. Selesai — **jangan ubah bagian lain di file tersebut.**

## 3. Aktifkan Metode Login Email/Password

1. Di sidebar kiri Firebase Console: **Build → Authentication**.
2. Klik **Get started**.
3. Pada tab **Sign-in method**, pilih **Email/Password** → aktifkan toggle
   pertama ("Email/Password") → **Save**.

## 4. Buat Database Firestore

1. Sidebar kiri: **Build → Firestore Database**.
2. Klik **Create database**.
3. Pilih lokasi server terdekat (misal `asia-southeast2 (Jakarta)`).
4. Mode: pilih **Start in production mode** (aturan keamanan akan kita isi
   di langkah berikutnya, jadi aman memilih mode ini).

## 5. Terapkan Aturan Keamanan (Firestore Rules)

1. Masih di halaman **Firestore Database**, buka tab **Rules**.
2. Buka file **`firestore.rules`** (satu folder dengan `index.html`),
   salin seluruh isinya.
3. Tempel ke kotak aturan di Firebase Console, menggantikan isi lama.
4. Klik **Publish**.

> Aturan ini membatasi setiap pengguna hanya bisa membaca/mengubah data
> profilnya sendiri, dan mengizinkan pencarian No HP→email (diperlukan
> supaya orang bisa login pakai No HP/WA, bukan cuma email).

## 6. Selesai — Coba Aplikasinya

1. Upload ulang / deploy folder aplikasi (index.html, firebase-config.js,
   firestore.rules, manifest.json, sw.js, folder icons) ke hosting Anda,
   atau buka langsung `index.html` di browser/APK.
2. Buka aplikasi → layar **Daftar** → buat akun baru.
3. Cek di Firebase Console:
   - **Authentication → Users**: akun baru harus muncul di sana.
   - **Firestore Database → Data**: koleksi `users` dan `phoneIndex`
     harus terisi.
4. Coba **logout**, lalu **login** lagi pakai email — dan pakai No HP/WA.
5. Coba **Lupa sandi** — email reset sandi akan dikirim otomatis oleh
   Firebase ke alamat email akun tersebut.

---

## Catatan Penting

- **Selama `firebase-config.js` belum diisi** (masih `GANTI_DENGAN_API_KEY`),
  aplikasi otomatis memakai mode lokal (localStorage) — tetap berfungsi,
  hanya saja akun tidak tersinkron antar-HP. Tidak ada risiko error.
- **Login dengan No HP/WA** di sini BUKAN memakai OTP/SMS Firebase Phone
  Auth (itu perlu kuota SMS berbayar). Sebagai gantinya, No HP dipetakan
  ke email lewat koleksi `phoneIndex` di Firestore, lalu proses login
  sesungguhnya tetap pakai email + sandi di balik layar. Ini pendekatan
  umum dan gratis untuk kasus "login pakai HP atau email".
- **Kuota gratis (Spark Plan)** Firebase Authentication & Firestore cukup
  besar untuk aplikasi skala UMKM/personal (puluhan ribu pengguna aktif
  bulanan) — biasanya tidak perlu upgrade ke paket berbayar (Blaze) kecuali
  aplikasi sudah dipakai sangat banyak orang.
- Jika aplikasi dikemas jadi **APK** (mis. lewat Capacitor/Cordova/WebView),
  pastikan APK punya izin akses internet (`INTERNET` permission) — Firebase
  butuh koneksi internet untuk login/daftar.
- Field email pengguna WAJIB unik (diatur otomatis oleh Firebase
  Authentication). Field No HP/WA dijaga unik lewat aturan Firestore di
  atas (`phoneIndex/{phone}` hanya bisa dibuat sekali).

## Kalau Ingin Kembali ke Mode Lokal

Cukup kosongkan/rusak salah satu nilai di `firebaseConfig` (misalnya
kembalikan `apiKey` ke `"GANTI_DENGAN_API_KEY"`) — aplikasi otomatis
kembali memakai penyimpanan lokal tanpa perlu ubah kode lain.

---

## Sistem Kode Lisensi PRO (Versi Trial)

Versi Trial punya fitur "Masukkan Kode Lisensi" di tab ★ Upgrade, supaya
user yang sudah bayar bisa membuka fitur PRO **selamanya** di akun mereka
(tersinkron ke semua HP mereka lewat Firestore). Cara menyiapkannya:

1. **Wajib aktifkan Firebase dulu** (lihat langkah di atas) — sistem kode
   lisensi tidak berfungsi di mode lokal.
2. Email admin **sudah diisi otomatis** di `firestore.rules` sebagai
   `ragi.kayu19@gmail.com`. Anda tinggal:
   - Tempel isi `firestore.rules` ke Firebase Console > Firestore
     Database > Rules > **Publish**.
   - Pastikan akun `ragi.kayu19@gmail.com` benar-benar terdaftar sebagai
     user di aplikasi ini — daftar lewat menu Daftar di `index.html`
     (atau tambahkan manual: Firebase Console > Authentication > Add
     User) memakai email yang sama persis.
   - Kalau nanti ingin ganti ke email lain, cari baris berisi
     `ragi.kayu19@gmail.com` di dalam fungsi `isAdmin()` pada
     `firestore.rules`, ganti, lalu Publish ulang.
3. Buka file `admin-generator.html` (letaknya sejajar dengan `index.html`)
   langsung dari browser — bisa dari HP/laptop mana saja selama file ini
   dan `firebase-config.js` ikut ter-upload ke hosting Anda, atau dibuka
   lokal. **Jangan link-kan halaman ini dari menu aplikasi** — ini khusus
   Anda sebagai admin.
4. Login pakai `ragi.kayu19@gmail.com` (akun yang sudah didaftarkan di
   langkah 2), lalu isi jumlah kode & nama paket, tekan "Buat & Simpan
   Kode ke Firestore". Kode otomatis tersimpan ke koleksi `licenseCodes`
   dan ditampilkan di
   kotak teks untuk Anda salin.
5. Kirim satu kode (mis. `RABPRO-4F2K-91QZ`) ke user setelah mereka
   membayar (lewat WhatsApp seperti biasa). Mereka masukkan kode itu di
   tab ★ Upgrade versi Trial → status PRO aktif permanen di akun mereka.
6. Satu kode hanya bisa dipakai sekali — begitu dipakai, otomatis
   berstatus "used" di Firestore dan ditolak kalau dicoba lagi.

**Batasan yang perlu disadari:** ini murni aplikasi web/HTML tanpa server
sendiri, jadi tidak ada proteksi anti-bajak yang 100% kebal. Sistem ini
sudah cukup aman untuk mencegah kode dipakai berkali-kali atau ditebak
sembarangan (lewat aturan Firestore), tapi seseorang yang sangat paham
teknis tetap berpotensi mengubah kode aplikasi di perangkatnya sendiri.
Untuk skala UMKM/personal, ini adalah tingkat proteksi yang wajar dan umum
dipakai.
