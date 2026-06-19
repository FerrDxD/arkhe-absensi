<script lang="ts">
	import ArkheCard from '$lib/components/ArkheCard.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import ArkheAvatar from '$lib/components/ArkheAvatar.svelte';
	import { mockSiswaList } from '$lib/mock';

	let selectedMonth = $state('2026-06');
	
	const months = [
		{ value: '2026-06', label: 'Juni 2026' },
		{ value: '2026-05', label: 'Mei 2026' },
		{ value: '2026-04', label: 'April 2026' }
	];

	// Generate mock recap data for the class
	const rekapData = mockSiswaList.map(s => ({
		id: s.id,
		nama: s.nama,
		nisn: s.nisn,
		hadir: Math.floor(Math.random() * 5) + 18,
		sakit: Math.floor(Math.random() * 3),
		izin: Math.floor(Math.random() * 2),
		alpa: Math.floor(Math.random() * 2)
	}));

	const totalKehadiran = rekapData.reduce((acc, curr) => acc + curr.hadir, 0);
	const totalSiswa = rekapData.length;
	const persenHadir = Math.round((totalKehadiran / (totalSiswa * 22)) * 100); // assume 22 active days
</script>

<svelte:head>
	<title>Rekap Kehadiran · ARKHE</title>
</svelte:head>

<div class="min-h-screen bg-arkhe-mist pb-24 relative overflow-hidden flex flex-col items-center">
	
	<!-- Premium Header Background -->
	<div class="absolute top-0 inset-x-0 h-[280px] bg-[#0F0F0F] rounded-b-[40px] shadow-lg overflow-hidden z-0">
		<div class="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#818CF8] to-[#C084FC] rounded-full mix-blend-screen filter blur-[40px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
		<div class="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#38BDF8] to-[#818CF8] rounded-full mix-blend-screen filter blur-[40px] opacity-20 translate-x-1/2 translate-y-1/2"></div>
	</div>

	<div class="w-full max-w-md mx-auto p-4 flex flex-col gap-6 relative z-10 pt-8">
		
		<header class="flex justify-between items-start mb-2">
			<div class="flex flex-col gap-1">
				<h1 class="font-display text-2xl font-bold text-white leading-tight">Rekap Bulanan</h1>
				<p class="text-white/60 text-xs font-bold uppercase tracking-widest mt-0.5">Kelas XI.5</p>
			</div>
			
			<div class="relative mt-12">
				<select
					bind:value={selectedMonth}
					class="pl-4 pr-10 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none shadow-lg cursor-pointer"
				>
					{#each months as m}
						<option value={m.value} class="text-arkhe-ink">{m.label}</option>
					{/each}
				</select>
				<svg class="w-4 h-4 text-white absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
				</svg>
			</div>
		</header>

		<!-- Overview Stats -->
		<div class="grid grid-cols-2 gap-3">
			<div class="bg-arkhe-white border border-arkhe-line/50 rounded-[24px] p-5 shadow-xl shadow-black/5 flex flex-col items-center text-center justify-center relative overflow-hidden group">
				<div class="absolute inset-0 bg-gradient-to-br from-arkhe-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
				<div class="relative z-10 flex flex-col items-center">
					<span class="text-[10px] font-bold text-arkhe-slate uppercase tracking-widest mb-1">Total Kehadiran</span>
					<div class="flex items-baseline gap-1">
						<span class="font-display text-4xl font-bold text-arkhe-accent">{persenHadir}</span>
						<span class="text-lg font-bold text-arkhe-accent/60">%</span>
					</div>
				</div>
			</div>
			
			<div class="bg-arkhe-white border border-arkhe-line/50 rounded-[24px] p-5 shadow-xl shadow-black/5 flex flex-col items-center text-center justify-center relative overflow-hidden group">
				<div class="relative z-10 flex flex-col items-center">
					<span class="text-[10px] font-bold text-arkhe-slate uppercase tracking-widest mb-1">Total Siswa</span>
					<div class="flex items-baseline gap-1">
						<span class="font-display text-4xl font-bold text-arkhe-ink">{totalSiswa}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Detail Table -->
		<section class="mt-4">
			<SectionHeader eyebrow="Detail" title="Rekapitulasi per Siswa" class="mb-4" />
			
			<div class="bg-arkhe-white border border-arkhe-line/50 rounded-[24px] shadow-xl shadow-black/5 overflow-hidden">
				<div class="overflow-x-auto">
					<table class="w-full text-left text-sm">
						<thead class="bg-arkhe-mist/50 border-b border-arkhe-line/50">
							<tr>
								<th class="px-4 py-4 text-[10px] font-bold text-arkhe-slate uppercase tracking-widest">Siswa</th>
								<th class="px-2 py-4 text-[10px] font-bold text-arkhe-hadir uppercase tracking-widest text-center" title="Hadir">H</th>
								<th class="px-2 py-4 text-[10px] font-bold text-arkhe-sakit uppercase tracking-widest text-center" title="Sakit">S</th>
								<th class="px-2 py-4 text-[10px] font-bold text-arkhe-izin uppercase tracking-widest text-center" title="Izin">I</th>
								<th class="px-2 py-4 text-[10px] font-bold text-arkhe-alpa uppercase tracking-widest text-center" title="Alpa">A</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-arkhe-line/50">
							{#each rekapData as row}
								<tr class="hover:bg-arkhe-mist/30 transition-colors group">
									<td class="px-4 py-3">
										<div class="flex items-center gap-3">
											<ArkheAvatar name={row.nama} class="w-8 h-8 text-[10px] shadow-inner group-hover:scale-110 transition-transform" />
											<span class="font-bold text-arkhe-ink text-xs truncate max-w-[100px]">{row.nama}</span>
										</div>
									</td>
									<td class="px-2 py-3 text-center">
										<span class="inline-flex w-7 h-7 items-center justify-center rounded bg-arkhe-hadir/10 text-arkhe-hadir font-bold text-xs">{row.hadir}</span>
									</td>
									<td class="px-2 py-3 text-center text-arkhe-slate font-bold text-xs">{row.sakit}</td>
									<td class="px-2 py-3 text-center text-arkhe-slate font-bold text-xs">{row.izin}</td>
									<td class="px-2 py-3 text-center">
										<span class="inline-flex w-7 h-7 items-center justify-center rounded font-bold text-xs {row.alpa > 0 ? 'bg-arkhe-alpa/10 text-arkhe-alpa' : 'text-arkhe-slate'}">{row.alpa}</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</section>
		
		<button class="mt-4 w-full py-4 bg-[#0F0F0F] text-white rounded-[20px] font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group relative overflow-hidden">
			<div class="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
			<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
			</svg>
			Unduh Laporan PDF
		</button>
	</div>
</div>
