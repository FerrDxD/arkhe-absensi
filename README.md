# ARKHE

<div align="center">
  <img src="https://img.shields.io/badge/svelte-ff3e00?style=for-the-badge&logo=svelte&logoColor=white" alt="Svelte 5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
</div>

<br />

<div align="center">
  <strong>Sumber kebenaran kehadiran sekolahmu.</strong>
  <br />
  Sistem absensi mandiri (*Self-Service*) cerdas, anti-kecurangan, dan presisi tinggi berbasis Single Page Application (SPA).
</div>

<br />

## 🚀 Gambaran Umum

**ARKHE** adalah platform manajemen kehadiran modern yang dirancang untuk menggantikan sistem absensi konvensional dengan solusi *Self-Service* berbasis Geofencing dan validasi wajah. Dibangun dengan fokus pada kecepatan, keamanan tingkat tinggi, dan estetika memukau layaknya perangkat lunak *Premium Enterprise SaaS*.

Platform ini mengusung pendekatan *Mobile-First* bergaya **Neo-Pop** dan **OLED Premium** untuk antarmuka siswa dan guru, serta dasbor layar penuh yang analitis untuk administrator sekolah.

## ✨ Fitur Unggulan

- **Face & Location Validation (A2F):** Absensi mandiri (*self-service*) mengandalkan validasi jepretan foto *selfie* waktu-nyata dan pencocokan radius GPS (*Geofencing*) secara presisi.
- **Advanced Anti-Cheat System:** Mekanisme keamanan agresif yang akan memblokir akun siswa secara otomatis apabila terdeteksi memalsukan lokasi (*Fake GPS* / *Mock Location*) atau memanipulasi *API endpoint*.
- **Smart Calendar & Auto-Lock:** Kalender pintar yang secara otomatis mengunci sesi presensi pada akhir pekan, serta hari libur nasional & keagamaan (6 Agama resmi) yang ditarik langsung melalui *Public Holidays API*.
- **Premium OLED Dark Mode:** Pengalaman antarmuka mendalam (*immersive*) dengan *Dark Mode* bernuansa OLED (Hitam Pekat `#0A0A0A` dan `#0F0F0F`), efek kaca (*glassmorphism*), dan mikro-animasi dinamis.
- **Role-Based Access Control (RBAC):** Antarmuka yang diisolasi secara ketat antara Siswa (Presensi), Guru (Validasi & Rekap), dan Administrator (Konfigurasi Keamanan & Master Data).

## 🛠 Instalasi & Pengembangan

ARKHE dikembangkan di atas ekosistem Svelte 5 dan Vite. Pastikan Anda memiliki **Node.js (v18+)** terinstal di sistem Anda.

```bash
# 1. Kloning repositori
git clone https://github.com/your-org/arkhe.git
cd arkhe

# 2. Instal dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev
```

Server pengembangan akan berjalan secara lokal di `http://localhost:5173`.

## 🏗 Struktur Proyek

```text
src/
├── lib/           # Komponen UI modular (ArkheCard, dll), state globals, & mocks
├── routes/        # Struktur sistem routing SvelteKit (Admin, Guru, Siswa, Login)
├── app.css        # Konfigurasi Tailwind CSS v4 & Theme Variables
└── app.html       # Entry point dokumen HTML
```

## 🤝 Berkontribusi

Kami sangat menghargai kontribusi dalam bentuk apa pun. Harap baca [Pedoman Kontribusi](CONTRIBUTING.md) sebelum mengirimkan *Pull Request*. Jangan lupa untuk meninjau [Kode Etik](CODE_OF_CONDUCT.md) kami untuk memastikan lingkungan kerja kolaboratif yang inklusif.

## 🔐 Keamanan

Keamanan data institusi dan siswa adalah prioritas utama kami. Sistem keamanan kami dirancang tanpa celah untuk mencegah titip absen dan eksploitasi radius. Untuk melaporkan kerentanan sistem, harap hubungi tim *Security* kami atau baca [Kebijakan Keamanan](SECURITY.md).

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**. Lihat file [LICENSE](LICENSE) untuk informasi lebih lanjut.

---
<div align="center">
  Dibuat dengan ❤️ oleh Tim Pengembang ARKHE
</div>
