# Panduan Berkontribusi (Contributing to ARKHE)

Terima kasih telah meluangkan waktu untuk berkontribusi pada proyek **ARKHE**! Kami menyambut baik *Pull Request* (PR), laporan *bug*, serta saran fitur baru.

Dengan berpartisipasi dalam proyek ini, Anda setuju untuk mematuhi [Kode Etik (Code of Conduct)](CODE_OF_CONDUCT.md) kami.

## Memulai Kontribusi

1. **Fork Repositori:** Buat *fork* dari repositori ini ke akun GitHub Anda.
2. **Kloning Proyek:** Kloning repositori yang telah di-*fork* ke mesin lokal Anda.
   ```bash
   git clone https://github.com/FerrDxD/arkhe-absensi.git
   cd arkhe
   ```
3. **Penyelarasan Branch:** Selalu mulai dengan memastikan Anda berada di cabang `main` terbaru.

## Strategi Branching (Branching Model)

Gunakan pola penamaan *branch* yang deskriptif:

- `feat/nama-fitur` (untuk fitur baru)
- `fix/nama-bug` (untuk perbaikan bug)
- `docs/nama-dokumen` (untuk perubahan dokumentasi)
- `refactor/nama-komponen` (untuk restrukturisasi kode)

**Contoh:**
```bash
git checkout -b feat/dark-mode-toggle
```

## Standar Kode (Code Standards)

ARKHE ditulis menggunakan **Svelte 5** (Runes Mode) dan **TypeScript**. Kami menjaga agar basis kode ini rapi dan bebas dari kerentanan a11y.

- **Svelte Runes:** Harap manfaatkan paradigma *Runes* (`$state`, `$derived`, `$effect`, `$props()`) dari Svelte 5 alih-alih pola reaktif versi lama.
- **TypeScript:** Selalu berikan deklarasi *type* pada variabel, prop komponen, dan parameter fungsi untuk menghindari peringatan kompiler.
- **A11y (Aksesibilitas):** Pastikan semua form memiliki label, gambar memiliki atribut `alt`, dan setiap tombol interaktif memiliki keterangan yang dapat dibaca *screen reader*.
- Format kode Anda dengan alat *formatter* bawaan sebelum di- *commit*.

## Panduan Commit (Conventional Commits)

Kami menggunakan spesifikasi [Conventional Commits](https://www.conventionalcommits.org/). Harap ikuti format ini saat membuat pesan komit:

- `feat:` (fitur baru bagi pengguna, bukan di *build script*)
- `fix:` (perbaikan *bug* untuk pengguna)
- `docs:` (perubahan terhadap dokumentasi)
- `style:` (pemformatan kode; tanpa perubahan logika: *spacing, semicolons, dll*)
- `refactor:` (restrukturisasi kode yang tidak memperbaiki bug atau menambah fitur)
- `chore:` (pembaruan *tooling*, skrip, atau *package*)

**Contoh pesan commit:**
`feat: menambahkan dashboard rekapitulasi guru`
`fix: memperbaiki render kalender saat melintasi tahun`

## Alur Pull Request (PR)

1. Lakukan *push* ke *branch fork* Anda.
2. Buka *Pull Request* (PR) di repositori utama.
3. Beri penjelasan detail mengenai masalah yang Anda selesaikan, cantumkan nomor *Issue* yang terhubung (mis. `Fixes #42`).
4. Pastikan semua *checks* dari CI (seperti `svelte-check` dan *linting*) lulus sebelum meminta *review*.
5. Tim inti akan mengulas ( *review* ) kode Anda secepatnya.

Terima kasih atas bantuan Anda mengembangkan ARKHE menjadi lebih baik!
