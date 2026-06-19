<script lang="ts">
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	const gurus = [
		{
			id: 1,
			nama: 'Budi Santoso, S.Pd',
			nip: '198001012005011001',
			role: 'Wali Kelas',
			kelas: 'XI.5',
			mapel: 'Fisika'
		},
		{
			id: 2,
			nama: 'Siti Aminah, M.Pd',
			nip: '197502022002012002',
			role: 'Wali Kelas',
			kelas: 'X.2',
			mapel: 'Sosiologi'
		},
		{
			id: 3,
			nama: 'Agus Setiawan, S.Kom',
			nip: '198503032010011003',
			role: 'Wali Kelas',
			kelas: 'XI.2',
			mapel: 'Informatika'
		},
		{
			id: 4,
			nama: 'Dewi Lestari, S.S',
			nip: '198204042008012004',
			role: 'Wali Kelas',
			kelas: 'XI.6',
			mapel: 'B. Inggris'
		},
		{
			id: 7,
			nama: 'Tono Hermawan, S.Pd',
			nip: '198307072009011007',
			role: 'Guru Mapel',
			kelas: '-',
			mapel: 'Matematika'
		}
	];

	let filterTingkat = $state('semua');
	let searchQuery = $state('');

	let filtered = $derived(
		gurus.filter(
			(g) =>
				(filterTingkat === 'semua' || g.kelas.startsWith(filterTingkat)) &&
				(g.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
					g.nip.includes(searchQuery))
		)
	);
</script>

<svelte:head>
	<title>Data Guru · Admin ARKHE</title>
</svelte:head>

<div class="p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
	<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-arkhe-white rounded-[32px] p-6 shadow-sm border border-arkhe-line/50">
		<div class="flex flex-col gap-1 px-2">
			<SectionHeader eyebrow="Database" title="Data Master Guru" />
		</div>
		<div class="flex gap-3 w-full md:w-auto">
			<button class="flex-1 md:flex-none px-6 py-3 bg-[#0F0F0F] text-white rounded-2xl text-sm font-bold shadow-lg shadow-black/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
				<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" /></svg>
				Tambah Tenaga Pendidik
			</button>
		</div>
	</div>

	<div class="bg-arkhe-white rounded-[32px] shadow-sm border border-arkhe-line/50 overflow-hidden flex flex-col">
		<div class="p-6 md:p-8 border-b border-arkhe-line/50 flex flex-col sm:flex-row gap-4 bg-arkhe-mist/20">
			<div class="relative flex-1 max-w-md">
				<svg class="w-5 h-5 text-arkhe-slate absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
				<input type="text" bind:value={searchQuery} placeholder="Cari nama atau NIP guru..." class="w-full pl-12 pr-4 py-3.5 bg-arkhe-white border border-arkhe-line/50 rounded-2xl text-sm font-bold focus:outline-none focus:border-arkhe-accent focus:ring-4 focus:ring-arkhe-accent/10 transition-all text-arkhe-ink placeholder:text-arkhe-slate placeholder:font-medium shadow-sm" />
			</div>
			<div class="relative">
				<select bind:value={filterTingkat} class="w-full sm:w-auto px-6 py-3.5 pr-10 bg-arkhe-white border border-arkhe-line/50 rounded-2xl text-sm font-bold text-arkhe-ink focus:outline-none focus:border-arkhe-accent focus:ring-4 focus:ring-arkhe-accent/10 transition-all cursor-pointer appearance-none shadow-sm">
					<option value="semua">Semua Tingkat</option>
					<option value="X.">Kelas X</option>
					<option value="XI.">Kelas XI</option>
					<option value="XII.">Kelas XII</option>
				</select>
				<svg class="w-5 h-5 text-arkhe-slate absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" /></svg>
			</div>
		</div>

		<div class="hidden md:block overflow-x-auto">
			<table class="w-full text-left text-sm">
				<thead class="bg-arkhe-mist/50 text-arkhe-slate text-[10px] font-bold uppercase tracking-widest border-b border-arkhe-line/50">
					<tr>
						<th class="px-8 py-5">Nama Guru & NIP</th>
						<th class="px-8 py-5">Peran</th>
						<th class="px-8 py-5">Bidang Studi</th>
						<th class="px-8 py-5 text-right">Tindakan</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-arkhe-line/50">
					{#each filtered as row}
						<tr class="hover:bg-arkhe-mist/40 transition-colors group">
							<td class="px-8 py-4">
								<div class="flex items-center gap-4">
									<div class="w-12 h-12 rounded-full bg-arkhe-mist flex items-center justify-center text-arkhe-slate font-bold uppercase group-hover:bg-arkhe-accent group-hover:text-white shadow-inner transition-colors">{row.nama.substring(0,2)}</div>
									<div class="flex flex-col">
										<span class="font-bold text-arkhe-ink text-sm">{row.nama}</span>
										<span class="font-mono text-[11px] font-bold text-arkhe-slate tracking-widest mt-0.5">{row.nip}</span>
									</div>
								</div>
							</td>
							<td class="px-8 py-4">
								<div class="flex flex-col gap-1 items-start">
									<span class="inline-flex px-3 py-1 bg-arkhe-accent/10 text-arkhe-accent rounded-md font-bold text-[10px] uppercase tracking-wider">{row.role}</span>
									{#if row.role === 'Wali Kelas'}
										<span class="text-xs font-bold text-arkhe-ink ml-1">Ampu: {row.kelas}</span>
									{/if}
								</div>
							</td>
							<td class="px-8 py-4 font-bold text-arkhe-slate">{row.mapel}</td>
							<td class="px-8 py-4 text-right">
								<button class="px-4 py-2 bg-arkhe-mist text-arkhe-ink rounded-lg font-bold text-xs hover:bg-arkhe-line transition-colors opacity-0 group-hover:opacity-100">Ubah Data</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			{#if filtered.length === 0}
				<div class="py-20 flex flex-col items-center justify-center text-center">
					<span class="font-display font-bold text-arkhe-ink text-xl mb-1">Data Tidak Ditemukan</span>
					<span class="text-sm text-arkhe-slate font-medium">Pastikan kata kunci pencarian Anda benar.</span>
				</div>
			{/if}
		</div>
	</div>
</div>
