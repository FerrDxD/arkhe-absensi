<script lang="ts">
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
	import { showToast } from '$lib/stores/toast.svelte.js';

	let students = $state([
		{
			id: 1,
			nama: 'Ahmad Fauzi',
			nisn: '0012345678',
			kelas: 'XI IPA 2',
			status: 'Aktif'
		},
		{
			id: 2,
			nama: 'Bunga Citra',
			nisn: '0012345679',
			kelas: 'XI IPA 2',
			status: 'Aktif'
		},
		{
			id: 3,
			nama: 'Dito Prabowo',
			nisn: '0012345680',
			kelas: 'XI IPS 1',
			status: 'Nonaktif'
		}
	]);

	let search = $state('');
	let filterClass = $state('semua');

	const filtered = $derived(
		students.filter(
			(s) =>
				(filterClass === 'semua' || s.kelas === filterClass) &&
				(s.nama.toLowerCase().includes(search.toLowerCase()) ||
					s.nisn.includes(search))
		)
	);

	let showModal = $state(false);
	let newSiswa = $state({ nama: '', nisn: '', kelas: 'XI IPA 2' });

	let confirmOpen = $state(false);
	let confirmAction = $state<() => void>(() => {});
	let confirmTitle = $state('');
	let confirmMsg = $state('');

	function saveSiswa() {
		students.push({
			id: Date.now(),
			nama: newSiswa.nama,
			nisn: newSiswa.nisn,
			kelas: newSiswa.kelas,
			status: 'Aktif'
		});
		showModal = false;
		showToast('Siswa berhasil ditambahkan', 'success');
		newSiswa = { nama: '', nisn: '', kelas: 'XI IPA 2' };
	}

	function handleBlock(s: any) {
		confirmTitle = 'Blokir Akses Siswa';
		confirmMsg = `Apakah Anda yakin ingin memblokir akses absensi mandiri untuk ${s.nama}? Ini akan memicu alert keamanan.`;
		confirmAction = () => {
			const idx = students.findIndex((x) => x.id === s.id);
			if(idx !== -1) students[idx].status = 'Terblokir';
			showToast(`Akses ${s.nama} diblokir`, 'error');
		};
		confirmOpen = true;
	}
</script>

<svelte:head>
	<title>Data Siswa · Admin ARKHE</title>
</svelte:head>

<div class="p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
	<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-arkhe-white rounded-[32px] p-6 shadow-sm border border-arkhe-line/50">
		<div class="flex flex-col gap-1 px-2">
			<SectionHeader eyebrow="Database" title="Data Master Siswa" />
		</div>
		<div class="flex gap-3 w-full md:w-auto">
			<button class="flex-1 md:flex-none px-6 py-3 border-2 border-arkhe-line/50 bg-transparent rounded-2xl text-sm font-bold text-arkhe-ink hover:border-arkhe-ink transition-colors">
				Import CSV
			</button>
			<button onclick={() => (showModal = true)} class="flex-1 md:flex-none px-6 py-3 bg-arkhe-ink text-white rounded-2xl text-sm font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
				+ Tambah Baru
			</button>
		</div>
	</div>

	<div class="bg-arkhe-white rounded-[32px] shadow-sm border border-arkhe-line/50 overflow-hidden flex flex-col">
		<div class="p-6 md:p-8 border-b border-arkhe-line/50 flex flex-col sm:flex-row gap-4 bg-arkhe-mist/20">
			<div class="relative flex-1 max-w-md">
				<svg class="w-5 h-5 text-arkhe-slate absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
				<input type="text" bind:value={search} placeholder="Cari nama atau NISN siswa..." class="w-full pl-12 pr-4 py-3.5 bg-arkhe-white border border-arkhe-line/50 rounded-2xl text-sm font-bold focus:outline-none focus:border-arkhe-accent focus:ring-4 focus:ring-arkhe-accent/10 transition-all text-arkhe-ink placeholder:text-arkhe-slate placeholder:font-medium shadow-sm" />
			</div>
			<div class="relative">
				<select bind:value={filterClass} class="w-full sm:w-auto px-6 py-3.5 pr-10 bg-arkhe-white border border-arkhe-line/50 rounded-2xl text-sm font-bold text-arkhe-ink focus:outline-none focus:border-arkhe-accent focus:ring-4 focus:ring-arkhe-accent/10 transition-all cursor-pointer appearance-none shadow-sm">
					<option value="semua">Semua Kelas</option>
					<option value="XI IPA 1">XI IPA 1</option>
					<option value="XI IPA 2">XI IPA 2</option>
					<option value="XI IPS 1">XI IPS 1</option>
				</select>
				<svg class="w-5 h-5 text-arkhe-slate absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" /></svg>
			</div>
		</div>

		<div class="hidden md:block overflow-x-auto">
			<table class="w-full text-left text-sm">
				<thead class="bg-arkhe-mist/50 text-arkhe-slate text-[10px] font-bold uppercase tracking-widest border-b border-arkhe-line/50">
					<tr>
						<th class="px-8 py-5">Siswa</th>
						<th class="px-8 py-5">NISN</th>
						<th class="px-8 py-5">Kelas</th>
						<th class="px-8 py-5">Status Akses</th>
						<th class="px-8 py-5 text-right">Tindakan</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-arkhe-line/50">
					{#each filtered as row}
						<tr class="hover:bg-arkhe-mist/40 transition-colors group">
							<td class="px-8 py-4 font-bold text-arkhe-ink flex items-center gap-4">
								<div class="w-10 h-10 rounded-full bg-arkhe-mist flex items-center justify-center text-arkhe-slate font-bold uppercase group-hover:bg-arkhe-ink group-hover:text-white transition-colors">{row.nama.substring(0,2)}</div>
								{row.nama}
							</td>
							<td class="px-8 py-4 font-mono text-xs font-bold text-arkhe-slate">{row.nisn}</td>
							<td class="px-8 py-4 font-bold text-arkhe-ink">{row.kelas}</td>
							<td class="px-8 py-4">
								<span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider {row.status === 'Aktif' ? 'bg-arkhe-hadir/10 text-arkhe-hadir' : row.status === 'Terblokir' ? 'bg-arkhe-alpa/10 text-arkhe-alpa border border-arkhe-alpa/20' : 'bg-arkhe-slate/10 text-arkhe-slate'}">
									{row.status}
								</span>
							</td>
							<td class="px-8 py-4 text-right">
								<div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
									<button class="px-3 py-1.5 bg-arkhe-mist text-arkhe-ink rounded-md font-bold text-xs hover:bg-arkhe-line transition-colors">Edit</button>
									<button onclick={() => handleBlock(row)} class="px-3 py-1.5 bg-arkhe-alpa/10 text-arkhe-alpa rounded-md font-bold text-xs hover:bg-arkhe-alpa hover:text-white transition-colors">Blokir</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			{#if filtered.length === 0}
				<div class="py-20 flex flex-col items-center justify-center text-center">
					<div class="w-16 h-16 bg-arkhe-mist rounded-full flex items-center justify-center text-arkhe-slate mb-4"><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg></div>
					<span class="font-display font-bold text-arkhe-ink text-xl mb-1">Data Tidak Ditemukan</span>
					<span class="text-sm text-arkhe-slate font-medium">Coba gunakan kata kunci pencarian yang lain.</span>
				</div>
			{/if}
		</div>
	</div>
</div>

{#if showModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
		<div class="absolute inset-0 bg-[#0F0F0F]/40 backdrop-blur-sm" onclick={() => (showModal = false)}></div>
		<div class="relative bg-arkhe-white rounded-[32px] shadow-2xl w-full max-w-md p-8 border border-arkhe-line/50 scale-100 animate-in zoom-in-95 duration-200">
			<h3 class="font-display font-bold text-2xl text-arkhe-ink mb-6">Tambah Siswa Baru</h3>

			<div class="flex flex-col gap-5">
				<div class="flex flex-col gap-1.5">
					<label for="nama" class="text-xs font-bold text-arkhe-slate uppercase tracking-widest">Nama Lengkap</label>
					<input id="nama" type="text" bind:value={newSiswa.nama} class="w-full px-4 py-3.5 bg-arkhe-mist/50 border border-transparent rounded-2xl text-sm font-bold text-arkhe-ink focus:outline-none focus:bg-white focus:border-arkhe-accent focus:ring-4 focus:ring-arkhe-accent/10 transition-all" />
				</div>
				<div class="flex flex-col gap-1.5">
					<label for="nisn" class="text-xs font-bold text-arkhe-slate uppercase tracking-widest">NISN</label>
					<input id="nisn" type="text" bind:value={newSiswa.nisn} class="w-full px-4 py-3.5 bg-arkhe-mist/50 border border-transparent rounded-2xl text-sm font-bold font-mono text-arkhe-ink focus:outline-none focus:bg-white focus:border-arkhe-accent focus:ring-4 focus:ring-arkhe-accent/10 transition-all" />
				</div>
				<div class="flex flex-col gap-1.5">
					<label for="kelas" class="text-xs font-bold text-arkhe-slate uppercase tracking-widest">Kelas</label>
					<select id="kelas" bind:value={newSiswa.kelas} class="w-full px-4 py-3.5 bg-arkhe-mist/50 border border-transparent rounded-2xl text-sm font-bold text-arkhe-ink focus:outline-none focus:bg-white focus:border-arkhe-accent focus:ring-4 focus:ring-arkhe-accent/10 transition-all cursor-pointer appearance-none">
						<option value="XI IPA 1">XI IPA 1</option>
						<option value="XI IPA 2">XI IPA 2</option>
						<option value="XI IPS 1">XI IPS 1</option>
					</select>
				</div>
			</div>

			<div class="mt-8 flex gap-3">
				<button onclick={() => (showModal = false)} class="flex-1 py-3.5 bg-transparent border-2 border-arkhe-line/50 text-sm font-bold text-arkhe-ink rounded-2xl hover:border-arkhe-ink transition-colors">Batal</button>
				<button onclick={saveSiswa} class="flex-1 py-3.5 bg-arkhe-ink text-white rounded-2xl text-sm font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all">Simpan Data</button>
			</div>
		</div>
	</div>
{/if}

<ConfirmDialog bind:open={confirmOpen} title={confirmTitle} message={confirmMsg} onConfirm={confirmAction} />
