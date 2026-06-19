# ARKHE — Smart Prompt: Revisi Modul Absensi
> Update dari client. Skema absensi berubah dari **QR scan oleh guru** menjadi **self-service form** oleh siswa (nama + kelas + selfie + GPS lock). Dashboard admin, halaman guru monitoring, dan struktur lain **tetap dipertahankan**. Prompt ini hanya merombak modul absensi siswa dan dampaknya ke halaman terkait.

---

## Ringkasan Perubahan

| Aspek | Skema Lama | Skema Baru (client) |
|---|---|---|
| Cara absen | Guru scan QR siswa | Siswa isi form sendiri |
| Validasi identitas | QR token + device fingerprint | Pilih nama dari daftar terdaftar + foto selfie |
| Validasi lokasi | Geofence (sudah ada, dipertahankan) | Geofence — **dipertahankan, tampil sebagai info di form** |
| Validasi waktu | QR expiry (rotasi token harian) | Sesi waktu (Datang / Pulang) dengan jendela jam |
| Peran guru | Scan QR aktif | **Drop total** — guru hanya monitoring & edit manual di `/guru/kelas` |
| `/siswa/kartu` (QR card) | Halaman utama siswa | **Diganti** oleh `/siswa/presensi` (form) |
| `/guru/scan` | Scanner kamera | **Dihapus dari navigasi**, hapus route |
| Login & dashboard siswa | Ada | **Tetap ada, tidak berubah** |
| Dashboard admin & grafik | Ada | **Tetap ada, tidak berubah** |

---

## Halaman yang DIHAPUS

```
/guru/scan        → hapus total, hapus dari nav guru
/siswa/kartu       → hapus, digantikan /siswa/presensi
```

Hapus juga dependency yang sudah tidak terpakai: `html5-qrcode` (scanner), generator QR di sisi siswa jika tidak dipakai untuk fungsi lain. **Cek dulu apakah `qrcode` masih dipakai di tempat lain sebelum uninstall.**

---

## Halaman BARU: `/siswa/presensi`

Ini pengganti `/siswa/kartu`. Halaman ini jadi **halaman aksi utama siswa**, diakses dari dashboard via tombol jelas ("Presensi Sekarang" atau serupa).

### Layout

Mobile-first, single column, scroll natural (tidak fullscreen-locked seperti kartu QR lama). Struktur top-to-bottom:

1. **Status bar info** (3 kolom sejajar dalam satu card)
2. **Form input**
3. **Capture selfie**
4. **Tombol submit**
5. **Disclaimer footer**

### 1. Status Bar Info (Card Atas)

Tiga kolom dalam satu `ArkheCard`, dipisah garis vertikal tipis atau gap cukup lega:

**Kolom 1 — GPS**
- Label kecil uppercase: "GPS"
- Status dengan ikon: bulat hijau + "Terkunci" (saat berhasil dapat lokasi)
- Sub-teks kecil: akurasi, format "±3 m"

**Kolom 2 — Jarak**
- Label: "JARAK"
- Nilai besar, warna hijau jika dalam radius: "128 m"
- Sub-teks: "maks 150 m" (radius config dari admin)

**Kolom 3 — Sesi**
- Label: "SESI"
- Nilai: "Datang" atau "Pulang" (auto-detect dari jam sekarang, warna indigo)
- Sub-teks: jendela jam aktif, contoh "03.00–08.00"

**State kolom GPS/Jarak saat di luar radius:**
- Ikon jadi merah, teks "Di luar radius"
- Kolom Jarak: angka jadi merah, contoh "210 m" dengan label "maks 150 m"
- Form di bawahnya tetap bisa diisi, **tapi tombol submit disabled** dengan helper text: "Kamu di luar area sekolah."

**State saat di luar jendela sesi (contoh: jam 10 siang, bukan jam datang/pulang):**
- Kolom Sesi menampilkan: "Tidak ada sesi aktif" (warna slate, bukan indigo)
- Seluruh form di-disable, tampilkan banner di atas form: "Belum ada sesi presensi yang aktif. Sesi Datang: 03.00–08.00, Sesi Pulang: 14.00–17.00." (jam ini contoh, sesuaikan dari config admin)

### 2. Form Input

**Field "Nama Lengkap"** — UBAH dari free-text jadi **autocomplete/combobox**:
- Searchable dropdown, bukan native `<select>` biasa (karena daftar siswa bisa ratusan)
- Saat user mengetik, filter dari daftar siswa terdaftar (mock dulu, nanti API search dari Juan)
- Setelah pilih, field terkunci menampilkan nama + NISN kecil di bawahnya untuk konfirmasi visual: "Juansyah Akbar · NISN 0012345678"
- Tombol kecil "Ganti" di samping untuk reset pilihan
- Validasi: tidak bisa submit form tanpa memilih dari list (mencegah typo/nama tidak terdaftar)

**Field "Kelas"** — tetap dropdown/select, tapi:
- **Auto-fill otomatis** begitu nama dipilih (karena kelas siswa sudah terikat ke data NISN-nya)
- Tetap tampilkan sebagai dropdown read-only/disabled setelah auto-fill, bukan dihapus — supaya siswa bisa cross-check kelasnya benar
- Jika data siswa tidak punya kelas (edge case), baru field ini aktif untuk diisi manual

**Field "Foto Selfie"** — pertahankan UX dari video, ini sudah bagus:
- Area preview kamera, tombol "Ambil Foto" melayang di tengah-bawah area foto
- Setelah berhasil ambil: border berubah hijau, badge kiri-bawah "✓ Foto diambil", tombol kanan-bawah "↻ Ulangi"
- Gunakan `getUserMedia` API langsung (front camera, `facingMode: 'user'`), capture ke canvas, convert ke blob/base64
- **Tambahan dari skema lama yang perlu masuk:** validasi sederhana di sisi client — pastikan foto tidak terlalu gelap (cek average brightness dari canvas pixel data) sebelum submit, kalau terlalu gelap tampilkan hint: "Foto terlalu gelap, coba di tempat lebih terang." (soft warning, tetap bisa lanjut submit)

### 3. Tombol Submit "Kirim Presensi"

State button mengikuti pola di video:
- **Disabled** (ungu pucat, `opacity-50` atau warna `--arkhe-accent` dengan lightness lebih tinggi): saat ada field kosong atau di luar radius/sesi
- **Enabled** (indigo solid, `--arkhe-accent` penuh): saat semua valid
- **Loading**: spinner di dalam button, teks jadi "Mengirim..."
- Helper text di bawah button berubah dinamis sesuai apa yang masih kurang:
  - "Pilih nama terlebih dahulu"
  - "Ambil foto selfie terlebih dahulu"
  - "Kamu di luar area sekolah"
  - (kosongkan helper text kalau semua valid, tombol siap diklik)

### 4. Disclaimer Footer

Teks statis, warna slate, center-align, di luar card utama:
```
Presensi hanya dapat dilakukan dari lingkungan sekolah dan
dalam jam yang ditentukan.
```

### 5. Success State (Setelah Submit)

Ganti seluruh isi halaman (bukan modal) dengan tampilan sukses, sesuai video:

- Icon besar: lingkaran hijau muda (`bg-green-100` atau setara) dengan checkmark hijau di tengah, ukuran ~64px
- Judul: "Presensi Berhasil!" (DM Sans, bold, 20px)
- Sub-teks tanggal + jam: "19 Juni 2026 pukul 04.17"
- Card kecil di bawahnya: baris "Jarak dari sekolah" dengan nilai kanan "128 m", baris kedua dengan ikon check hijau "Dalam radius sekolah"
- Teks penutup kecil, slate: "Presensi Anda telah tersimpan. Terima kasih!"
- **Tambahan yang perlu ada (tidak di video, tapi penting):** tombol "Kembali ke Dashboard" di bawah, supaya siswa tidak stuck di halaman sukses

### Error States Baru yang Harus Ditambahkan

Video hanya menunjukkan happy path. Tambahkan state berikut (ganti isi card form dengan pesan error, bukan toast saja — karena ini blocking action):

**Sudah presensi untuk sesi ini:**
```
[Ikon centang abu-abu]
Kamu sudah presensi sesi Datang
hari ini, pukul 07.12.
[Tombol: Kembali ke Dashboard]
```

**Izin kamera ditolak:**
```
[Ikon kamera dengan X]
Izin kamera diperlukan
Aktifkan akses kamera di pengaturan
browser untuk mengambil foto selfie.
[Tombol: Coba lagi]
```

**Izin lokasi ditolak:**
```
[Ikon lokasi dengan X]
Izin lokasi diperlukan
Aktifkan akses lokasi untuk
melanjutkan presensi.
[Tombol: Coba lagi]
```

**Hari libur (admin lock):**
```
[Ikon kalender]
Presensi ditutup hari ini
Hari Kemerdekaan RI ke-81
Selamat berlibur!
```

---

## Dampak ke Halaman Lain

### `/siswa/dashboard`
- Tambahkan/ubah tombol aksi utama jadi mengarah ke `/siswa/presensi` (bukan `/siswa/kartu` lagi)
- Status card hari ini sekarang perlu menampung **dua status terpisah**: Sesi Datang dan Sesi Pulang (bukan satu status gabungan seperti sebelumnya)
  - Layout: dua baris kecil dalam status card, masing-masing dengan badge dan jam: "Datang · Hadir · 07.12" dan "Pulang · Belum presensi"

### `/guru/kelas`
- Tidak ada perubahan struktural besar, tapi data yang masuk sekarang punya **field foto selfie** yang bisa dilihat guru
- Tambahkan kemampuan guru untuk tap nama siswa → lihat foto selfie yang di-submit hari itu sebagai bukti visual (bottom sheet atau modal kecil menampilkan foto + jarak GPS saat submit)
- Ini penting untuk verifikasi manual kalau ada kecurigaan kecurangan

### `/guru/scan`
- **Hapus route ini sepenuhnya.** Hapus juga dari sidebar/bottom-nav navigasi guru.

### `/admin/kalender`
- Tidak berubah secara visual, tapi sekarang perlu menambahkan **konfigurasi jendela sesi** (jam Datang dan jam Pulang), bukan cuma toggle hari libur
- Tambahkan section baru di halaman ini atau buat sub-halaman `/admin/sesi`:
  - Form: "Jam Sesi Datang" (time range picker, default 03.00–08.00)
  - Form: "Jam Sesi Pulang" (time range picker, default 14.00–17.00)
  - Form: "Radius maksimal (meter)" (number input, default 150)
  - Form: "Koordinat sekolah" (lat/lng, atau tombol "Gunakan lokasi saat ini" untuk admin set sambil berdiri di sekolah)

### `/admin` (dashboard overview)
- Tidak berubah strukturnya, tapi metric "Insiden terblokir" sekarang sumber datanya dari kombinasi: di luar radius + di luar sesi + foto gagal/kosong (bukan dari device fingerprint mismatch lagi, karena fitur itu di-drop bersamaan dengan QR)

---

## Komponen Baru yang Harus Dibuat

```
StatusInfoBar.svelte       — card 3 kolom (GPS, Jarak, Sesi) di /siswa/presensi
StudentCombobox.svelte     — autocomplete pilih nama siswa dari list terdaftar
SelfieCapture.svelte       — komponen kamera + capture + preview + retake
SessionBadge.svelte        — badge kecil "Datang"/"Pulang" dengan warna sesuai status
SubmitSuccessPanel.svelte  — full panel sukses presensi (reusable jika ada sesi pulang nanti)
```

### `StudentCombobox.svelte` — spek detail

Props:
```typescript
interface Props {
  students: { id: string; nama: string; nisn: string; kelas: string }[]
  onSelect: (student: Student) => void
}
```

Behavior:
- Input text dengan dropdown list muncul saat fokus/mengetik
- Filter case-insensitive, match dari awal nama atau NISN
- Keyboard navigable (arrow up/down, enter untuk pilih) — penting untuk aksesibilitas
- Setelah pilih, tampilkan sebagai "chip terkunci": nama + NISN kecil + tombol "Ganti"
- Mock data dulu, nanti Juan sediakan endpoint search `/api/siswa/search?q=...`

### `SelfieCapture.svelte` — spek detail

Props:
```typescript
interface Props {
  onCapture: (imageBlob: Blob) => void
  minBrightness?: number // default 40, skala 0-255
}
```

Behavior:
- Mount: minta akses `getUserMedia({ video: { facingMode: 'user' } })`
- Render `<video>` live preview dalam container dengan aspect ratio tetap (4:3 atau sesuai video referensi)
- Tombol capture: ambil frame ke `<canvas>`, hitung average brightness, convert ke blob
- Jika brightness < `minBrightness`: tampilkan warning inline, tapi tidak block
- State retake: render ulang video stream, hapus captured image

---

## Mock Data Tambahan

```typescript
// src/lib/mock/students.ts
export const mockStudentList = [
  { id: '1', nama: 'Ahmad Fauzi', nisn: '0012345678', kelas: 'XI IPA 2' },
  { id: '2', nama: 'Juansyah Akbar', nisn: '0012345690', kelas: 'XI.2' },
  { id: '3', nama: 'Reza Fahrezi', nisn: '0012345691', kelas: 'X.5' },
  { id: '4', nama: 'Bima Septian', nisn: '0012345692', kelas: 'XII.1' },
  // tambahkan 10-15 dummy lagi untuk testing search/filter
]

// src/lib/mock/sesi-config.ts
export const mockSesiConfig = {
  datang: { mulai: '03:00', selesai: '08:00' },
  pulang: { mulai: '14:00', selesai: '17:00' },
  radiusMaksimal: 150, // meter
  koordinatSekolah: { lat: -6.482, lng: 107.014 }, // contoh, ganti sesuai lokasi asli
}
```

---

## Catatan Migrasi Teknis

1. **Jangan hapus logic geofence yang sudah ada** (Haversine calculation) — itu dipakai ulang di sini, cuma tampilannya pindah dari halaman kartu QR ke status bar form ini.
2. **QR expiry logic boleh di-deprecate sepenuhnya** — sudah tidak relevan karena tidak ada QR lagi. Ganti dengan konsep "jendela sesi" yang lebih simpel (cuma cek jam sekarang masuk range atau tidak, tidak perlu hash/token).
3. **Device fingerprint untuk anti-titip** — diskusikan ulang dengan Juan apakah masih relevan. Karena sekarang ada foto selfie sebagai bukti visual, fingerprint mungkin redundan. Tapi kalau Juan tetap mau pertahankan di backend sebagai layer tambahan, frontend tetap kirim fingerprint hash secara silent (tanpa UI tambahan) bersama payload submit.
4. **State management:** form ini punya banyak dependent state (GPS, kamera, validasi). Pertimbangkan satu store Svelte (`presensiStore`) yang menggabungkan semua state ini agar tidak prop-drilling antar komponen.

---

## Checklist Revisi

- [ ] Hapus `/guru/scan` dan semua referensinya di navigasi
- [ ] Hapus `/siswa/kartu`, ganti semua link menuju ke `/siswa/presensi`
- [ ] Buat `/siswa/presensi` lengkap dengan semua state (idle, di luar radius, di luar sesi, sukses, error kamera, error lokasi, sudah absen, hari libur)
- [ ] `StudentCombobox` berfungsi dengan mock data, keyboard accessible
- [ ] `SelfieCapture` berhasil ambil foto dari kamera depan, ada brightness check
- [ ] Dashboard siswa update untuk menampilkan status Datang + Pulang terpisah
- [ ] `/guru/kelas` bisa menampilkan foto selfie siswa saat di-tap
- [ ] `/admin/kalender` atau `/admin/sesi` punya form konfigurasi jendela waktu + radius
- [ ] Semua mock data baru (students, sesi-config) tersedia dan realistis
- [ ] Tidak ada sisa import/dependency QR scanner yang tidak terpakai

---

*Revisi untuk ARKHE — SMAN 2 Jonggol · Nawasena Digital Ecosystem*
*Perubahan berdasarkan skema final dari client. Frontend scope only. Backend & API: Juan.*
