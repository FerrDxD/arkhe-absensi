<script lang="ts">
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import { mockWeeklyData } from '$lib/mock';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	let chartCanvas: HTMLCanvasElement;

	const today = new Intl.DateTimeFormat('id-ID', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(new Date());

	onMount(() => {
		const chartInstance = new Chart(chartCanvas, {
			type: 'bar',
			data: {
				labels: mockWeeklyData.map((d) => d.hari),
				datasets: [
					{
						label: 'Hadir',
						data: mockWeeklyData.map((d) => d.hadir),
						backgroundColor: '#22C55E',
						stack: 'Stack 0',
						borderRadius: 4
					},
					{
						label: 'Sakit',
						data: mockWeeklyData.map((d) => d.sakit),
						backgroundColor: '#3B82F6',
						stack: 'Stack 0',
						borderRadius: 4
					},
					{
						label: 'Izin',
						data: mockWeeklyData.map((d) => d.izin),
						backgroundColor: '#F59E0B',
						stack: 'Stack 0',
						borderRadius: 4
					},
					{
						label: 'Alpa',
						data: mockWeeklyData.map((d) => d.alpa),
						backgroundColor: '#EF4444',
						stack: 'Stack 0',
						borderRadius: 4
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: 'top',
						align: 'end',
						labels: { usePointStyle: true, boxWidth: 6, font: { family: 'DM Sans', weight: 'bold' } }
					}
				},
				scales: {
					x: { stacked: true, grid: { display: false } },
					y: { stacked: true, border: { display: false } }
				}
			}
		});

		return () => {
			chartInstance.destroy();
		};
	});

	const kelasStats = [
		{ nama: 'XI IPA 1', total: 32, hadir: 30, alpa: 0, pct: 93.7 },
		{ nama: 'XI IPA 2', total: 30, hadir: 28, alpa: 1, pct: 93.3 },
		{ nama: 'XI IPS 1', total: 34, hadir: 31, alpa: 2, pct: 91.1 }
	];

	const insiden = [
		{ nama: 'Budi Santoso', waktu: '06:45', alasan: 'Deteksi Lokasi Palsu (Mock GPS)' },
		{ nama: 'Caca Marica', waktu: '07:02', alasan: 'Bypass API Presensi' }
	];
</script>

<svelte:head>
	<title>Dashboard Admin · ARKHE</title>
</svelte:head>

<div class="p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
	
	<!-- Premium Hero Header -->
	<div class="relative overflow-hidden rounded-[32px] bg-arkhe-white shadow-xl shadow-black/5 p-8 md:p-10 border border-arkhe-line/50">
		<div class="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-arkhe-accent/20 to-arkhe-accent/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px]"></div>
		<div class="absolute -bottom-32 -left-10 w-80 h-80 bg-gradient-to-tr from-[#38BDF8]/20 to-arkhe-accent/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px]"></div>
		
		<div class="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
			<div class="flex flex-col gap-1">
				<span class="text-arkhe-slate text-xs font-bold uppercase tracking-widest">{today}</span>
				<h1 class="font-display text-4xl md:text-5xl font-bold text-arkhe-ink leading-tight mt-1">
					Halo, Admin.
				</h1>
				<p class="text-arkhe-slate font-medium mt-2 max-w-md">Pantau seluruh aktivitas presensi dan keamanan sekolah secara real-time.</p>
			</div>
			<button class="px-6 py-3.5 bg-arkhe-ink border border-transparent rounded-2xl text-sm font-bold text-white hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 shadow-lg group">
				<svg class="w-5 h-5 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
				</svg>
				Ekspor Rekap Master
			</button>
		</div>
	</div>

	<!-- Metrics Row -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
		<div class="bg-arkhe-white border border-arkhe-line/50 rounded-[24px] p-5 md:p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-arkhe-accent/50 transition-colors shadow-sm">
			<div class="absolute top-0 right-0 w-24 h-24 bg-arkhe-accent/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
			<span class="text-[10px] md:text-xs font-bold text-arkhe-slate uppercase tracking-widest z-10">Total Siswa Aktif</span>
			<div class="font-display text-4xl md:text-5xl font-bold text-arkhe-ink z-10">1,050</div>
		</div>

		<div class="bg-arkhe-white border border-arkhe-line/50 rounded-[24px] p-5 md:p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-arkhe-hadir/50 transition-colors shadow-sm">
			<div class="absolute top-0 right-0 w-24 h-24 bg-arkhe-hadir/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
			<span class="text-[10px] md:text-xs font-bold text-arkhe-slate uppercase tracking-widest z-10">Hadir Hari Ini</span>
			<div class="font-display text-4xl md:text-5xl font-bold text-arkhe-hadir z-10">980</div>
		</div>

		<div class="bg-arkhe-white border border-arkhe-line/50 rounded-[24px] p-5 md:p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-arkhe-alpa/50 transition-colors shadow-sm">
			<div class="absolute top-0 right-0 w-24 h-24 bg-arkhe-alpa/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
			<span class="text-[10px] md:text-xs font-bold text-arkhe-slate uppercase tracking-widest z-10">Alpa Hari Ini</span>
			<div class="font-display text-4xl md:text-5xl font-bold text-arkhe-alpa z-10">12</div>
		</div>

		<div class="bg-arkhe-block/5 border border-arkhe-block/20 rounded-[24px] p-5 md:p-6 flex flex-col gap-4 relative overflow-hidden group hover:bg-arkhe-block/10 transition-colors shadow-sm">
			<div class="absolute top-0 right-0 w-24 h-24 bg-arkhe-block/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
			<span class="text-[10px] md:text-xs font-bold text-arkhe-block uppercase tracking-widest z-10 flex items-center gap-1.5">
				<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
				Insiden Blokir
			</span>
			<div class="font-display text-4xl md:text-5xl font-bold text-arkhe-block z-10">3</div>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Chart -->
		<div class="lg:col-span-2 bg-arkhe-white border border-arkhe-line/50 rounded-[32px] p-6 shadow-sm flex flex-col min-h-[400px]">
			<SectionHeader eyebrow="Grafik" title="Tren Kehadiran Mingguan" class="mb-8 px-2" />
			<div class="flex-1 relative w-full h-[300px]">
				<canvas bind:this={chartCanvas}></canvas>
			</div>
		</div>

		<!-- Insiden Terkini -->
		<div class="bg-[#0F0F0F] rounded-[32px] p-6 shadow-xl shadow-black/10 flex flex-col border border-white/10 relative overflow-hidden">
			<!-- Subtle glow inside the dark card -->
			<div class="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-[40px] pointer-events-none"></div>
			
			<div class="relative z-10 flex flex-col gap-6">
				<div class="flex flex-col gap-1">
					<span class="text-[10px] font-bold text-arkhe-block uppercase tracking-widest flex items-center gap-1.5">
						<span class="relative flex h-2 w-2">
							<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
							<span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
						</span>
						Security
					</span>
					<h2 class="font-display text-2xl font-bold text-white">Log Insiden</h2>
				</div>
				
				<div class="flex flex-col gap-3">
					{#each insiden as item}
						<div class="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 hover:bg-white/10 transition-colors">
							<div class="flex justify-between items-start">
								<span class="font-bold text-white text-sm">{item.nama}</span>
								<span class="px-2 py-0.5 bg-arkhe-block/20 text-arkhe-block border border-arkhe-block/20 text-[10px] font-bold uppercase tracking-wider rounded">Blokir</span>
							</div>
							<div class="flex justify-between items-center mt-1">
								<span class="text-xs text-white/60 font-medium">{item.alasan}</span>
								<span class="font-mono text-xs font-bold text-white/40">{item.waktu}</span>
							</div>
						</div>
					{/each}
					{#if insiden.length === 0}
						<div class="py-12 text-center flex flex-col items-center justify-center">
							<div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/30 mb-3">
								<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
							</div>
							<span class="text-white/50 text-sm font-bold">Aman. Tidak ada insiden hari ini.</span>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Table -->
	<div class="bg-arkhe-white border border-arkhe-line/50 rounded-[32px] shadow-sm overflow-hidden flex flex-col">
		<div class="p-6 md:p-8 border-b border-arkhe-line/50">
			<SectionHeader eyebrow="Real-time" title="Rekapitulasi per Kelas" />
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-left text-sm">
				<thead class="bg-arkhe-mist/50 text-arkhe-slate text-[10px] font-bold uppercase tracking-widest border-b border-arkhe-line/50">
					<tr>
						<th class="px-6 md:px-8 py-5">Kelas</th>
						<th class="px-6 md:px-8 py-5 text-right">Total</th>
						<th class="px-6 md:px-8 py-5 text-right text-arkhe-hadir">Hadir</th>
						<th class="px-6 md:px-8 py-5 text-right text-arkhe-alpa">Alpa</th>
						<th class="px-6 md:px-8 py-5 text-right">% Kehadiran</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-arkhe-line/50">
					{#each kelasStats as row}
						<tr class="hover:bg-arkhe-mist/40 transition-colors group">
							<td class="px-6 md:px-8 py-4 font-bold text-arkhe-ink">
								<a href="/admin/kelas" class="group-hover:text-arkhe-accent transition-colors flex items-center gap-2">
									{row.nama}
									<svg class="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
								</a>
							</td>
							<td class="px-6 md:px-8 py-4 font-medium text-arkhe-slate text-right">{row.total}</td>
							<td class="px-6 md:px-8 py-4 font-bold text-arkhe-hadir text-right">{row.hadir}</td>
							<td class="px-6 md:px-8 py-4 font-bold text-arkhe-alpa text-right">{row.alpa}</td>
							<td class="px-6 md:px-8 py-4 font-bold text-arkhe-ink text-right">
								<div class="flex items-center justify-end gap-3">
									<span>{row.pct}%</span>
									<div class="w-16 h-1.5 bg-arkhe-mist rounded-full overflow-hidden">
										<div class="h-full bg-arkhe-accent rounded-full" style="width: {row.pct}%"></div>
									</div>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
