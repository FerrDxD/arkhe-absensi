<script lang="ts">
	import ArkheCard from '$lib/components/ArkheCard.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';

	let selectedMonth = $state('2026-06');
	
	const months = [
		{ value: '2026-06', label: 'Juni 2026' },
		{ value: '2026-05', label: 'Mei 2026' },
		{ value: '2026-04', label: 'April 2026' }
	];

	const riwayat = [
		{ tanggal: '18 Juni', hari: 'Kamis', masuk: '06:55', pulang: '15:10', status: 'hadir' },
		{ tanggal: '17 Juni', hari: 'Rabu', masuk: null, pulang: null, status: 'sakit' },
		{ tanggal: '16 Juni', hari: 'Selasa', masuk: '07:02', pulang: '15:15', status: 'hadir' },
		{ tanggal: '15 Juni', hari: 'Senin', masuk: '06:45', pulang: '15:00', status: 'hadir' },
		{ tanggal: '12 Juni', hari: 'Jumat', masuk: '06:58', pulang: '11:40', status: 'hadir' },
	];
</script>

<svelte:head>
	<title>Riwayat Absensi · ARKHE</title>
</svelte:head>

<div class="min-h-screen bg-arkhe-mist pb-24 relative overflow-hidden flex flex-col items-center">
	<!-- Catchy Header Background -->
	<div class="absolute top-0 inset-x-0 h-[280px] bg-[#0F0F0F] rounded-b-[40px] shadow-lg overflow-hidden z-0">
		<div class="absolute top-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[#ff9a9e] to-[#fecfef] rounded-full mix-blend-screen filter blur-[30px] opacity-30"></div>
		<div class="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-bl from-[#a18cd1] to-[#fbc2eb] rounded-full mix-blend-screen filter blur-[40px] opacity-30"></div>
	</div>

	<div class="w-full max-w-md mx-auto p-4 flex flex-col gap-6 relative z-10 pt-8">
		<header class="flex flex-col gap-4">
			<div class="flex justify-between items-center text-white">
				<h1 class="font-display text-3xl font-bold tracking-tight">Riwayat</h1>
				<div class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
					<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
				</div>
			</div>
			
			<div class="relative w-full">
				<select
					bind:value={selectedMonth}
					class="w-full pl-5 pr-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-base font-bold text-white focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none shadow-inner cursor-pointer"
				>
					{#each months as m}
						<option value={m.value} class="text-arkhe-ink font-medium">{m.label}</option>
					{/each}
				</select>
				<svg class="w-5 h-5 text-white absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
				</svg>
			</div>
		</header>

		<!-- Detail Timeline (Connected Cards) -->
		<section class="mt-4">
			<div class="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-arkhe-line/80 before:to-transparent">
				{#each riwayat as r}
					<div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-6">
						<!-- Timeline Dot -->
						<div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-arkhe-mist shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 {
								r.status === 'hadir' ? 'bg-arkhe-hadir text-white' : 
								r.status === 'sakit' ? 'bg-arkhe-sakit text-white' : 
								r.status === 'izin' ? 'bg-arkhe-izin text-white' : 'bg-arkhe-alpa text-white'
							}">
							{#if r.status === 'hadir'}
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
							{:else if r.status === 'sakit'}
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
							{:else if r.status === 'izin'}
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
							{:else}
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" /></svg>
							{/if}
						</div>
						
						<!-- Card -->
						<div class="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] pl-3 md:pl-0">
							<ArkheCard class="!p-4 shadow-sm border border-arkhe-line/60 rounded-[20px] hover:border-arkhe-line hover:shadow-md transition-all">
								<div class="flex justify-between items-start mb-2">
									<div class="flex flex-col">
										<span class="font-display font-bold text-arkhe-ink">{r.hari}</span>
										<span class="text-[11px] font-bold text-arkhe-slate uppercase tracking-widest">{r.tanggal}</span>
									</div>
									<StatusBadge status={r.status as any} />
								</div>
								
								{#if r.status === 'hadir'}
									<div class="flex items-center gap-4 text-xs font-mono mt-3 p-2 bg-arkhe-mist/50 rounded-lg border border-arkhe-line/50">
										<div class="flex flex-col flex-1">
											<span class="text-[9px] text-arkhe-slate font-sans uppercase tracking-widest mb-0.5">Datang</span>
											<span class="font-bold text-arkhe-ink">{r.masuk}</span>
										</div>
										<div class="w-px h-6 bg-arkhe-line"></div>
										<div class="flex flex-col flex-1">
											<span class="text-[9px] text-arkhe-slate font-sans uppercase tracking-widest mb-0.5">Pulang</span>
											<span class="font-bold text-arkhe-ink">{r.pulang || '--:--'}</span>
										</div>
									</div>
								{:else}
									<div class="mt-2 text-xs text-arkhe-slate font-medium italic">
										Tidak ada rekam waktu
									</div>
								{/if}
							</ArkheCard>
						</div>
					</div>
				{/each}
			</div>
		</section>
	</div>
</div>
