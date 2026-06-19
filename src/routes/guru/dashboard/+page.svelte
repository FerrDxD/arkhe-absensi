<script lang="ts">
	import ArkheCard from '$lib/components/ArkheCard.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import { mockSiswaList } from '$lib/mock';

	const today = new Intl.DateTimeFormat('id-ID', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(new Date());

	const mockRiwayatScan = [
		{ nama: 'Ahmad Fauzi', kelas: 'XI IPA 2', jam: '06:55', status: 'hadir' },
		{ nama: 'Budi Santoso', kelas: 'XI IPA 2', jam: '07:02', status: 'hadir' },
		{ nama: 'Citra Kirana', kelas: 'XI IPA 2', jam: '07:10', status: 'izin' },
		{ nama: 'Deni Setiawan', kelas: 'XI IPA 3', jam: '07:15', status: 'alpa' }
	];

	const hadirCount = mockSiswaList.filter((s) => s.status === 'hadir').length;
	const totalSiswa = mockSiswaList.length;
</script>

<svelte:head>
	<title>Dashboard Guru · ARKHE</title>
</svelte:head>

<div class="max-w-md mx-auto p-4 flex flex-col gap-7 relative z-10">
	
	<!-- Hero / Greeting Banner (Premium OLED) -->
	<div class="relative overflow-hidden rounded-[28px] bg-[#0F0F0F] shadow-2xl shadow-black/20">
		<div class="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#818CF8] to-[#C084FC] rounded-full mix-blend-screen filter blur-[50px] opacity-30"></div>
		<div class="absolute -bottom-24 -left-10 w-56 h-56 bg-gradient-to-tr from-[#38BDF8] to-[#818CF8] rounded-full mix-blend-screen filter blur-[40px] opacity-20"></div>
		
		<div class="relative p-7 flex flex-col gap-6">
			<div class="flex justify-between items-start">
				<div class="flex flex-col">
					<span class="text-white/70 text-sm font-medium mb-1 tracking-wide uppercase">{today}</span>
					<h1 class="font-display text-3xl font-bold text-white leading-tight">
						Selamat Pagi,<br/>Pak Budi! 👋
					</h1>
				</div>
				<div class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold text-lg shadow-inner">
					B
				</div>
			</div>

			<!-- Quick Actions inside Hero -->
			<div class="grid grid-cols-2 gap-3 mt-2">
				<a href="/guru/kelas" class="group relative w-full bg-white text-[#0F0F0F] rounded-2xl p-4 flex flex-col items-start gap-3 shadow-[0_4px_14px_0_rgba(255,255,255,0.39)] hover:scale-[1.02] active:scale-95 transition-all duration-300">
					<div class="w-10 h-10 rounded-full bg-arkhe-accent/10 flex items-center justify-center text-arkhe-accent group-hover:rotate-12 transition-transform duration-300">
						<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</div>
					<div class="flex flex-col">
						<span class="font-display font-bold text-sm">Data Siswa</span>
						<span class="text-arkhe-slate text-[10px] font-bold uppercase tracking-widest mt-0.5">Validasi Foto</span>
					</div>
				</a>
				<a href="/guru/rekap" class="group relative w-full bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl p-4 flex flex-col items-start gap-3 hover:bg-white/20 hover:scale-[1.02] active:scale-95 transition-all duration-300">
					<div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:-rotate-12 transition-transform duration-300">
						<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
					</div>
					<div class="flex flex-col">
						<span class="font-display font-bold text-sm">Rekap Kelas</span>
						<span class="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-0.5">Unduh Laporan</span>
					</div>
				</a>
			</div>
		</div>
	</div>

	<!-- Ringkasan Wali Kelas (Catchy Blocks) -->
	<section class="flex flex-col gap-3">
		<SectionHeader eyebrow="Wali Kelas" title="Ringkasan XI IPA 2" />
		<div class="grid grid-cols-2 gap-3">
			<div class="bg-arkhe-white border-2 border-arkhe-line/50 rounded-[20px] p-4 flex flex-col gap-3 relative overflow-hidden group hover:border-arkhe-hadir/30 transition-colors shadow-sm">
				<div class="absolute top-0 right-0 w-16 h-16 bg-arkhe-hadir/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
				<div class="flex justify-between items-center z-10">
					<span class="text-xs font-bold text-arkhe-slate uppercase tracking-wider">Hadir</span>
					<div class="w-2 h-2 rounded-full bg-arkhe-hadir shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
				</div>
				<div class="flex flex-col z-10">
					<div class="flex items-baseline gap-1">
						<span class="font-display text-3xl font-bold text-arkhe-ink">{hadirCount}</span>
						<span class="text-xs font-bold text-arkhe-slate">/ {totalSiswa}</span>
					</div>
					<span class="text-xs font-medium text-arkhe-hadir mt-1">Siswa telah presensi</span>
				</div>
			</div>

			<div class="bg-arkhe-white border-2 border-arkhe-line/50 rounded-[20px] p-4 flex flex-col gap-3 relative overflow-hidden group hover:border-arkhe-alpa/30 transition-colors shadow-sm">
				<div class="absolute top-0 right-0 w-16 h-16 bg-arkhe-alpa/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
				<div class="flex justify-between items-center z-10">
					<span class="text-xs font-bold text-arkhe-slate uppercase tracking-wider">Absen</span>
					<div class="w-2 h-2 rounded-full bg-arkhe-alpa shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
				</div>
				<div class="flex flex-col z-10">
					<span class="font-display text-3xl font-bold text-arkhe-ink">{totalSiswa - hadirCount}</span>
					<span class="text-xs font-medium text-arkhe-alpa mt-1">Belum ada keterangan</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Aktivitas Presensi Terkini -->
	<section class="flex flex-col gap-3 mt-2">
		<SectionHeader eyebrow="Live Feed" title="Presensi Terkini" />
		<div class="flex flex-col gap-2">
			{#each mockRiwayatScan as r}
				<div class="bg-arkhe-white border border-arkhe-line/60 rounded-xl p-3.5 flex items-center justify-between hover:border-arkhe-line hover:shadow-sm transition-all group">
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[11px] uppercase tracking-wider {
							r.status === 'hadir' ? 'bg-arkhe-hadir/10 text-arkhe-hadir group-hover:bg-arkhe-hadir/20' : 
							r.status === 'sakit' ? 'bg-arkhe-sakit/10 text-arkhe-sakit group-hover:bg-arkhe-sakit/20' : 
							r.status === 'izin' ? 'bg-arkhe-izin/10 text-arkhe-izin group-hover:bg-arkhe-izin/20' : 'bg-arkhe-alpa/10 text-arkhe-alpa group-hover:bg-arkhe-alpa/20'
						} transition-colors">
							{r.nama.substring(0, 2)}
						</div>
						<div class="flex flex-col">
							<span class="text-sm font-bold text-arkhe-ink">{r.nama}</span>
							<span class="text-[11px] font-medium text-arkhe-slate tracking-wide">{r.kelas}</span>
						</div>
					</div>
					<div class="flex flex-col items-end gap-1">
						<StatusBadge status={r.status as any} />
						{#if r.jam}
							<span class="font-mono text-[10px] font-bold text-arkhe-slate">{r.jam}</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>
