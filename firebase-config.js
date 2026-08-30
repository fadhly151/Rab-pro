// ============================================================
// KONFIGURASI FIREBASE — RAB Cerdas
// ============================================================
// Cara mengisi (lihat juga PANDUAN_FIREBASE_AUTH.md):
//   1. Buka https://console.firebase.google.com → buat/pilih project.
//   2. Project Settings (ikon gerigi) > General > scroll ke "Your apps"
//      > tambahkan Web App (</>) jika belum ada.
//   3. Salin objek "firebaseConfig" yang muncul, tempel/ganti bagian
//      di bawah ini (JANGAN ubah nama variabelnya).
//   4. Di menu Firebase Console: Build > Authentication > Get Started
//      > aktifkan sign-in method "Email/Password".
//   5. Di menu Firebase Console: Build > Firestore Database > Create
//      database. Lalu terapkan aturan dari file "firestore.rules".
//
// Selama apiKey masih bertuliskan "GANTI_DENGAN_API_KEY", Firebase
// TIDAK akan aktif dan aplikasi otomatis memakai akun lokal (di HP
// ini saja) — jadi aman, tidak akan error walau belum diisi.
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyBlacl_c8-rM1LiGzlr11s736DCydkV1Nk",
  authDomain: "rab-cerdas.firebaseapp.com",
  projectId: "rab-cerdas",
  storageBucket: "rab-cerdas.firebasestorage.app",
  messagingSenderId: "554898068278",
  appId: "1:554898068278:web:c6355bc5f603a5a6231997",
  measurementId: "G-BXP759BZF1"
};

// Flag global yang dibaca oleh index.html untuk tahu apakah Firebase
// sudah dikonfigurasi dengan benar.
window.FIREBASE_READY = false;

try {
  if (!firebaseConfig.apiKey.startsWith('GANTI')) {
    firebase.initializeApp(firebaseConfig);

    // Auth & Firestore — dipakai oleh sistem login/daftar.
    window.firebase.auth();
    window.firebase.firestore();

    // Analytics — opsional, dibungkus try/catch sendiri karena bisa
    // gagal di beberapa WebView/APK yang memblokir tracker.
    try { firebase.analytics(); } catch (e) { /* analytics tidak wajib */ }

    window.FIREBASE_READY = true;
    console.log('[Firebase] Terhubung ke project:', firebaseConfig.projectId);
  } else {
    console.log('[Firebase] Belum dikonfigurasi — memakai akun lokal (localStorage) di HP ini.');
  }
} catch (e) {
  console.warn('[Firebase] Gagal inisialisasi, fallback ke akun lokal:', e);
  window.FIREBASE_READY = false;
}
