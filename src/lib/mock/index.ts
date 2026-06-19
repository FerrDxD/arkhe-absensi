export const MOCK_MODE = true;

export const mockSiswa = {
	nama: 'Ahmad Fauzi',
	kelas: 'XI IPA 2',
	statusHariIni: 'hadir',
	jamMasuk: '07:23',
	jamPulang: null,
	rekapBulan: { hadir: 18, sakit: 1, izin: 0, alpa: 1 }
};

export const mockSiswaList = [
	{ id: 1, nama: 'Ahmad Fauzi', nisn: '0012345678', status: 'hadir', jam: '07:23' },
	{ id: 2, nama: 'Bunga Citra', nisn: '0012345679', status: 'alpa', jam: null },
	{ id: 3, nama: 'Dito Prabowo', nisn: '0012345680', status: 'izin', jam: null },
	{ id: 4, nama: 'Eka Saputra', nisn: '0012345681', status: 'sakit', jam: null },
	{ id: 5, nama: 'Fajar Nugraha', nisn: '0012345682', status: 'hadir', jam: '06:55' }
];

export const mockWeeklyData = [
	{ hari: 'Sen', hadir: 280, sakit: 8, izin: 5, alpa: 7 },
	{ hari: 'Sel', hadir: 275, sakit: 10, izin: 3, alpa: 12 },
	{ hari: 'Rab', hadir: 290, sakit: 5, izin: 4, alpa: 1 },
	{ hari: 'Kam', hadir: 278, sakit: 7, izin: 6, alpa: 9 },
	{ hari: 'Jum', hadir: 285, sakit: 6, izin: 2, alpa: 7 }
];
