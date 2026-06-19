<script lang="ts">
	import { mockSiswa } from '$lib/mock';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import ArkheCard from '$lib/components/ArkheCard.svelte';
	import { getStatusHariIni } from '$lib/api/attendance';
	import { onMount } from 'svelte';
	import LoadingSkeleton from '$lib/components/LoadingSkeleton.svelte';

	let data = $state(mockSiswa);
	let loading = $state(true);

	onMount(async () => {
		loading = true;
		try {
			data = await getStatusHariIni('mock-id');
		} finally {
			loading = false;
		}
	});

	const today = new Intl.DateTimeFormat('id-ID', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(new Date());

	const mockRiwayat = [
		{ tanggal: '17 Juni 2026', status: 'hadir', jam: '06:55' },
		{ tanggal: '16 Juni 2026', status: 'hadir', jam: '07:10' },
		{ tanggal: '15 Juni 2026', status: 'hadir', jam: '07:05' },
		{ tanggal: '12 Juni 2026', status: 'alpa', jam: null },
		{ tanggal: '11 Juni 2026', status: 'sakit', jam: null }
	];
</script>

<svelte:head>
	<title>Dashboard Siswa · ARKHE</title>
</svelte:head>

<div class="max-w-md mx-auto p-4 flex flex-col gap-7 relative z-10">
	{#if loading}
		<div class="flex flex-col gap-6">
			<LoadingSkeleton class="h-40 w-full rounded-3xl" />
			<LoadingSkeleton class="h-32 w-full rounded-3xl" />
			<div class="grid grid-cols-2 gap-4">
				<LoadingSkeleton class="h-28 w-full rounded-2xl" />
				<LoadingSkeleton class="h-28 w-full rounded-2xl" />
			</div>
		</div>
	{:else}
		
		<!-- Hero / Greeting Banner (Cheerful & Powerful) -->
		<div class="relative overflow-hidden rounded-[28px] bg-[#0F0F0F] shadow-2xl shadow-black/20">
			<!-- Abstract colorful meshes in the background -->
			<div class="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF] rounded-full mix-blend-screen filter blur-[50px] opacity-40"></div>
			<div class="absolute -bottom-24 -left-10 w-56 h-56 bg-gradient-to-tr from-[#a18cd1] to-[#fbc2eb] rounded-full mix-blend-screen filter blur-[40px] opacity-40"></div>
			
			<div class="relative p-7 flex flex-col gap-6">
				<div class="flex justify-between items-start">
					<div class="flex flex-col">
						<span class="text-white/70 text-sm font-medium mb-1 tracking-wide uppercase">{today}</span>
						<h1 class="font-display text-3xl font-bold text-white leading-tight">
							Halo,<br/>{data.nama.split(' ')[0]}! 👋
						</h1>
					</div>
					<div class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold text-lg shadow-inner">
						{data.nama.substring(0, 1)}
					</div>
				</div>

				<!-- Aksi Utama di dalam Hero -->
				<a href="/siswa/presensi" class="group relative w-full bg-white text-[#0F0F0F] rounded-2xl p-4 flex items-center justify-between shadow-[0_4px_14px_0_rgba(255,255,255,0.39)] hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(255,255,255,0.23)] active:scale-95 transition-all duration-300">
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-full bg-arkhe-accent/10 flex items-center justify-center text-arkhe-accent group-hover:rotate-12 transition-transform duration-300">
							<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
							</svg>
						</div>
						<div class="flex flex-col">
							<span class="font-display font-bold text-base">Isi Presensi</span>
							<span class="text-arkhe-slate text-[11px] font-medium uppercase tracking-wider">Sesi Datang Aktif</span>
						</div>
					</div>
					<div class="w-8 h-8 rounded-full bg-arkhe-mist flex items-center justify-center text-arkhe-slate group-hover:bg-arkhe-accent group-hover:text-white transition-colors">
						<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</a>
			</div>
		</div>

		<!-- Status Sesi Hari Ini -->
		<section class="flex flex-col gap-3">
			<SectionHeader eyebrow="Live" title="Status Hari Ini" />
			<div class="grid grid-cols-2 gap-3">
				<!-- Sesi Datang Card -->
				<div class="bg-arkhe-white border-2 border-arkhe-line/50 rounded-[20px] p-4 flex flex-col gap-3 relative overflow-hidden group hover:border-arkhe-hadir/30 transition-colors">
					<div class="absolute top-0 right-0 w-16 h-16 bg-arkhe-hadir/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
					<div class="flex justify-between items-center z-10">
						<span class="text-xs font-bold text-arkhe-slate uppercase tracking-wider">Datang</span>
						{#if data.jamMasuk}
							<div class="w-2 h-2 rounded-full bg-arkhe-hadir shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
						{:else}
							<div class="w-2 h-2 rounded-full bg-arkhe-slate"></div>
						{/if}
					</div>
					<div class="flex flex-col z-10">
						<span class="font-display text-2xl font-bold text-arkhe-ink">{data.jamMasuk || '--:--'}</span>
						<span class="text-xs font-medium {data.jamMasuk ? 'text-arkhe-hadir' : 'text-arkhe-slate'} mt-1">
							{data.jamMasuk ? 'Hadir Tepat Waktu' : 'Belum Presensi'}
						</span>
					</div>
				</div>

				<!-- Sesi Pulang Card -->
				<div class="bg-arkhe-white border-2 border-arkhe-line/50 rounded-[20px] p-4 flex flex-col gap-3 relative overflow-hidden group hover:border-arkhe-accent/30 transition-colors">
					<div class="absolute top-0 right-0 w-16 h-16 bg-arkhe-accent/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
					<div class="flex justify-between items-center z-10">
						<span class="text-xs font-bold text-arkhe-slate uppercase tracking-wider">Pulang</span>
						{#if data.jamPulang}
							<div class="w-2 h-2 rounded-full bg-arkhe-accent shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
						{:else}
							<div class="w-2 h-2 rounded-full bg-arkhe-slate"></div>
						{/if}
					</div>
					<div class="flex flex-col z-10">
						<span class="font-display text-2xl font-bold text-arkhe-ink">{data.jamPulang || '--:--'}</span>
						<span class="text-xs font-medium {data.jamPulang ? 'text-arkhe-accent' : 'text-arkhe-slate'} mt-1">
							{data.jamPulang ? 'Selesai' : 'Belum Waktunya'}
						</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Rekap Kehadiran (Catchy Colors) -->
		<section class="flex flex-col gap-3 mt-2">
			<SectionHeader eyebrow="Bulan Ini" title="Rekap Kehadiran" />
			<div class="grid grid-cols-4 gap-2">
				<div class="bg-arkhe-hadir/10 border border-arkhe-hadir/20 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1 hover:bg-arkhe-hadir/20 transition-colors">
					<span class="font-display text-xl font-bold text-arkhe-hadir">{data.rekapBulan.hadir}</span>
					<span class="text-[10px] font-bold uppercase tracking-wider text-arkhe-hadir/80">Hadir</span>
				</div>
				<div class="bg-arkhe-sakit/10 border border-arkhe-sakit/20 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1 hover:bg-arkhe-sakit/20 transition-colors">
					<span class="font-display text-xl font-bold text-arkhe-sakit">{data.rekapBulan.sakit}</span>
					<span class="text-[10px] font-bold uppercase tracking-wider text-arkhe-sakit/80">Sakit</span>
				</div>
				<div class="bg-arkhe-izin/10 border border-arkhe-izin/20 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1 hover:bg-arkhe-izin/20 transition-colors">
					<span class="font-display text-xl font-bold text-arkhe-izin">{data.rekapBulan.izin}</span>
					<span class="text-[10px] font-bold uppercase tracking-wider text-arkhe-izin/80">Izin</span>
				</div>
				<div class="bg-arkhe-alpa/10 border border-arkhe-alpa/20 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1 hover:bg-arkhe-alpa/20 transition-colors">
					<span class="font-display text-xl font-bold text-arkhe-alpa">{data.rekapBulan.alpa}</span>
					<span class="text-[10px] font-bold uppercase tracking-wider text-arkhe-alpa/80">Alpa</span>
				</div>
			</div>
		</section>

		<!-- Riwayat Terkini (Clean List) -->
		<section class="flex flex-col gap-3 mt-2">
			<div class="flex justify-between items-end">
				<SectionHeader eyebrow="Riwayat" title="5 Hari Terakhir" />
				<a href="/siswa/riwayat" class="text-xs font-bold text-arkhe-accent hover:underline mb-1">Lihat Semua</a>
			</div>
			
			<div class="flex flex-col gap-2">
				{#each mockRiwayat as row}
					<div class="bg-arkhe-white border border-arkhe-line/60 rounded-xl p-3.5 flex items-center justify-between hover:border-arkhe-line hover:shadow-sm transition-all">
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 rounded-full flex items-center justify-center {
								row.status === 'hadir' ? 'bg-arkhe-hadir/10 text-arkhe-hadir' : 
								row.status === 'sakit' ? 'bg-arkhe-sakit/10 text-arkhe-sakit' : 
								row.status === 'izin' ? 'bg-arkhe-izin/10 text-arkhe-izin' : 'bg-arkhe-alpa/10 text-arkhe-alpa'
							}">
								{#if row.status === 'hadir'}
									<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
								{:else if row.status === 'sakit'}
									<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
								{:else if row.status === 'izin'}
									<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
								{:else}
									<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
								{/if}
							</div>
							<div class="flex flex-col">
								<span class="text-sm font-semibold text-arkhe-ink">{row.tanggal}</span>
								<span class="text-[11px] font-medium text-arkhe-slate uppercase tracking-wider">{row.status}</span>
							</div>
						</div>
						<div class="text-right">
							{#if row.jam}
								<span class="font-mono text-sm font-bold text-arkhe-ink bg-arkhe-mist px-2.5 py-1 rounded-md">{row.jam}</span>
							{:else}
								<span class="text-xs font-bold text-arkhe-slate">-</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}
</div>
