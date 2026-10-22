# 🃏 UNO Pop Deck Simulator

Simulasi kartu **UNO Pop** berbasis web — tarik kartu satu per satu, kumpulkan poin aman, dan bertahan hingga kartu POP! atau UNO! muncul. Dibangun 100% dengan HTML5, CSS3, dan Vanilla JavaScript — tanpa framework, tanpa build step, berjalan penuh secara offline.

🌐 **[Mainkan Versi Live (GitHub Pages)](https://sulthon-arrasyid.github.io/uno-pop/)**

---

## ✨ Fitur Utama

- **Animasi Flip 3D** — setiap penarikan kartu menampilkan animasi balik kartu tiga dimensi yang mulus
- **Efek Besar (Big Moments)** — konfeti kanvas saat menarik UNO!, guncangan layar saat menarik POP!
- **Efek Suara (SFX)** — suara khusus untuk setiap jenis kartu: tarik biasa, POP!, dan UNO!
- **Haptic Feedback** — getaran singkat melalui `navigator.vibrate` pada perangkat yang mendukung
- **Deck Builder Kustom** — atur jumlah kartu +1/+2/+3 (aman), POP! +1/+2, dan UNO! sesuai keinginan
- **Riwayat Penarikan** — chip berwarna mencatat semua kartu yang telah ditarik dalam sesi ini
- **Penyimpanan Otomatis** — status permainan tersimpan di `localStorage`; permainan berlanjut setelah halaman di-refresh
- **PWA + Offline** — dapat diinstal ke layar utama smartphone dan berjalan tanpa koneksi internet setelah muat pertama
- **Responsif** — dioptimalkan untuk dimainkan di ponsel (target sentuh ≥44px) maupun desktop
- **Aksesibilitas Gerak** — semua animasi dekoratif mematuhi `prefers-reduced-motion`; animasi flip tetap aktif sebagai umpan balik esensial
- **Desain Soft Neo-Brutalist** — latar krim dengan pola titik, font Fredoka/Nunito, garis luar tipis hitam, aksen warna fungsional (hijau/merah/emas)

---

## 🎮 Cara Bermain

1. Klik **Ambil Kartu** untuk menarik kartu dari tumpukan
2. Kartu **aman** (+1/+2/+3) menambah poin akumulasi — lanjutkan atau berhenti kapan saja
3. Kartu **POP!** mengakhiri ronde — semua poin akumulasi hangus
4. Kartu **UNO!** mengakhiri ronde dengan konfeti — poin akumulasi terkunci sebagai skor
5. Klik **Reset Tumpukan** untuk memulai ronde baru
6. Klik **⚙️ Atur Deck Custom** untuk menyesuaikan komposisi kartu, lalu klik **Simpan & Reset**

---

## 🏗️ Teknologi

- **100% Vanilla** — HTML5 semantik, CSS3 murni (custom properties, `@keyframes`, Grid, Flexbox), Vanilla JavaScript (ES6+)
- **PWA** — Service Worker cache-first (`unopop-cache-v5`), `manifest.json` dengan `display: standalone`
- **Tanpa Dependensi Runtime** — semua aset (font, audio, ikon) di-host lokal dan di-precache; tidak ada CDN
- **State Management** — satu objek `state` sebagai sumber kebenaran tunggal, di-persist ke `localStorage`

---

## 📂 Struktur Proyek

```text
uno-pop/
├── index.html              # Struktur utama dan pemuatan aset
├── manifest.json           # Konfigurasi PWA (nama, ikon, warna tema)
├── sw.js                   # Service Worker — cache-first, precache semua aset
├── css/
│   └── style.css           # Token tema (:root), layout, animasi, responsif
├── js/
│   └── app.js              # Logika permainan, state, render, audio, konfeti
└── assets/
    ├── icon.svg            # Ikon aplikasi vektor (512×512)
    ├── audio/
    │   ├── draw.mpeg       # SFX penarikan kartu aman
    │   ├── pop.mpeg        # SFX kartu POP!
    │   └── uno.mpeg        # SFX kartu UNO!
    └── fonts/
        ├── fredoka-600.woff2   # Font display (judul, label kartu)
        ├── fredoka-700.woff2
        ├── nunito-400.woff2    # Font teks (body, status)
        └── nunito-700.woff2
```

---

## 🚀 Jalankan Secara Lokal

PWA memerlukan protokol `http://` (bukan `file://`) agar Service Worker dapat didaftarkan.

```bash
# Python 3
python -m http.server 8000
# lalu buka http://localhost:8000
```

Untuk menguji mode offline: buka DevTools → tab **Application** → **Service Workers** → centang **Offline**, lalu muat ulang halaman.

---

## ♿ Aksesibilitas

Animasi dekoratif (konfeti, guncangan layar, kemunculan chip riwayat) dinonaktifkan otomatis jika pengguna mengaktifkan **Kurangi Gerak** di pengaturan sistem (`prefers-reduced-motion: reduce`). Animasi flip kartu tetap berjalan karena merupakan umpan balik visual esensial.
