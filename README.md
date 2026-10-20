# 🃏 UNO Pop Deck Simulator

Aplikasi web interaktif untuk mensimulasikan tumpukan kartu (deck) **UNO Pop**. Proyek ini dibangun menggunakan arsitektur **Progressive Web App (PWA)** dengan prinsip *Separation of Concerns*, memisahkan logika, tampilan, dan struktur secara rapi tanpa menggunakan *framework* atau *library* eksternal.

🌐 **[Mainkan Versi Live (GitHub Pages)](https://sulthon-arrasyid.github.io/uno-pop/)**  
*(Catatan: Sesuaikan URL di atas jika nama repositori Anda berbeda)*

---

## ✨ Fitur Utama

- **100% Vanilla:** Dibangun menggunakan HTML5 semantik, CSS3 murni, dan Vanilla JavaScript.
- **PWA Support:** Mendukung instalasi langsung ke smartphone (Add to Home Screen/Add to Phone).
- **Offline Mode:** Dilengkapi dengan *Service Worker* untuk proses *caching*, sehingga aplikasi dapat dijalankan tanpa koneksi internet setelah muatan pertama.
- **Responsif:** Antarmuka yang optimal untuk dimainkan di perangkat seluler (HP) maupun desktop.
- **State Management Murni:** Menghindari manipulasi DOM berlebihan dengan menggunakan satu *source of truth* untuk *game state*.

---

## 📂 Struktur Proyek

Proyek ini menerapkan *best practice* dalam pengembangan web modern:

```text
uno-pop/
├── index.html       # Struktur utama dan pemuatan aset
├── manifest.json    # Konfigurasi PWA (Nama, icon, warna tema)
├── sw.js            # Service Worker untuk dukungan Offline & Caching
├── css/
│   └── style.css    # Variabel tema, layout, dan styling UI
├── js/
│   └── app.js       # Logika permainan, state management, dan PWA registration
└── assets/
    └── icon.svg     # Icon aplikasi berbasis vektor (HD, scalable)
