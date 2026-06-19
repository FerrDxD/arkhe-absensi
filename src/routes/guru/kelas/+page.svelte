<script lang="ts">
	import { mockSiswaList } from '$lib/mock';
	import ArkheAvatar from '$lib/components/ArkheAvatar.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import BottomSheet from '$lib/components/BottomSheet.svelte';
	import { showToast } from '$lib/stores/toast.svelte.js';

	let filter = $state('semua');
	let selectedClass = $state('XI IPA 2');
	let selectedStudent = $state<any>(null);
	let isBottomSheetOpen = $state(false);

	let editStatus = $state<string>('');
	let editNote = $state('');

	const today = new Intl.DateTimeFormat('id-ID', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(new Date());

	let students = $state(mockSiswaList.map((s) => ({ ...s }))); // clone

	const filters = ['Semua', 'Hadir', 'Belum', 'Sakit', 'Izin', 'Alpa'];

	const filteredStudents = $derived(
		filter === 'semua'
			? students
			: filter === 'belum'
				? students.filter((s) => !s.status)
				: students.filter((s) => s.status === filter.toLowerCase())
	);

	const stats = $derived({
		hadir: students.filter((s) => s.status === 'hadir').length,
		total: students.length
	});

	function openEdit(student: any) {
		selectedStudent = student;
		editStatus = student.status || 'hadir';
		editNote = '';
		isBottomSheetOpen = true;
	}

	function saveStatus() {
		if (selectedStudent) {
			const idx = students.findIndex((s) => s.id === selectedStudent.id);
			if (idx !== -1) {
				students[idx].status = editStatus;
				students[idx].jam = editStatus === 'hadir' ? '07:30' : null; // mock time
			}
		}
		isBottomSheetOpen = false;
		showToast('Status berhasil diubah', 'success');
	}
</script>

<svelte:head>
	<title>Kelas · ARKHE</title>
</svelte:head>

<div class="min-h-screen bg-arkhe-mist pb-24 relative">
	<!-- Abstract Background -->
	<div class="fixed top-0 inset-x-0 h-64 bg-gradient-to-b from-arkhe-line/50 to-transparent pointer-events-none z-0"></div>

	<header class="sticky top-0 bg-arkhe-white/80 backdrop-blur-xl border-b border-arkhe-line z-30 shadow-sm pt-4">
		<div class="px-4 pb-3 flex justify-between items-center relative z-10">
			<div class="flex items-center gap-3">
				<div class="flex flex-col gap-0.5">
					<span class="text-[10px] text-arkhe-slate font-bold uppercase tracking-widest">Wali Kelas</span>
					<div class="font-display text-lg font-bold text-arkhe-ink leading-none">
						Kelas {selectedClass}
					</div>
				</div>
			</div>
			<div class="text-right flex flex-col items-end">
				<span class="text-xs font-bold text-arkhe-slate uppercase tracking-wider mb-0.5">Hadir</span>
				<span class="text-sm font-bold text-arkhe-ink bg-arkhe-hadir/10 text-arkhe-hadir px-2.5 py-1 rounded-lg">
					{stats.hadir}/{stats.total}
				</span>
			</div>
		</div>

		<div class="px-4 pb-4 flex gap-2 overflow-x-auto no-scrollbar relative z-10">
			{#each filters as f}
				<button
					onclick={() => (filter = f.toLowerCase())}
					class="whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm border {filter === f.toLowerCase()
						? 'bg-arkhe-ink text-white border-transparent scale-105'
						: 'bg-arkhe-white text-arkhe-slate border-arkhe-line hover:bg-arkhe-mist'}"
				>
					{f}
				</button>
			{/each}
		</div>
	</header>

	<div class="p-4 flex flex-col gap-3 relative z-10 max-w-md mx-auto">
		{#each filteredStudents as student (student.id)}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				onclick={() => openEdit(student)}
				class="bg-arkhe-white rounded-[20px] p-4 flex items-center gap-4 border border-arkhe-line/50 shadow-sm cursor-pointer hover:border-arkhe-accent/50 hover:shadow-lg hover:scale-[1.01] transition-all group relative overflow-hidden"
			>
				<ArkheAvatar name={student.nama} class="w-12 h-12 text-sm shadow-inner group-hover:scale-110 transition-transform" />
				<div class="flex flex-col flex-1">
					<span class="font-bold text-arkhe-ink text-sm group-hover:text-arkhe-accent transition-colors">{student.nama}</span>
					<span class="font-mono text-[11px] font-medium text-arkhe-slate mt-0.5 tracking-wider">{student.nisn}</span>
				</div>
				<div class="flex flex-col items-end gap-1.5">
					{#if student.status}
						<StatusBadge status={student.status as any} />
						{#if student.jam}
							<span class="font-mono text-[10px] font-bold text-arkhe-slate">{student.jam}</span>
						{/if}
					{:else}
						<span class="text-[10px] font-bold text-arkhe-slate uppercase tracking-wider bg-arkhe-mist px-2.5 py-1 rounded-md border border-arkhe-line/50">Belum</span>
					{/if}
				</div>
			</div>
		{/each}
		
		{#if filteredStudents.length === 0}
			<div class="py-12 flex flex-col items-center justify-center text-center">
				<div class="w-16 h-16 bg-arkhe-mist rounded-full flex items-center justify-center text-arkhe-slate mb-4">
					<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
					</svg>
				</div>
				<span class="font-display font-bold text-arkhe-ink text-lg mb-1">Data Kosong</span>
				<span class="text-sm text-arkhe-slate">Tidak ada siswa dengan filter ini.</span>
			</div>
		{/if}
	</div>
</div>

<BottomSheet bind:open={isBottomSheetOpen} title="Validasi & Status">
	{#if selectedStudent}
		<div class="flex flex-col gap-6 pb-4">
			
			<!-- Student Identity Card -->
			<div class="flex items-center gap-4 p-4 bg-arkhe-white border border-arkhe-line/50 shadow-sm rounded-[20px]">
				<ArkheAvatar name={selectedStudent.nama} class="w-14 h-14 text-lg shadow-inner" />
				<div class="flex flex-col flex-1">
					<span class="font-display font-bold text-arkhe-ink text-lg leading-tight">{selectedStudent.nama}</span>
					<span class="font-mono text-xs font-medium text-arkhe-slate tracking-wider mt-0.5">{selectedStudent.nisn}</span>
				</div>
			</div>

			<!-- Bukti Self Service -->
			{#if selectedStudent.status === 'hadir'}
				<div class="bg-arkhe-mist/50 border border-arkhe-line/50 rounded-[20px] p-4 flex flex-col gap-4">
					<div class="flex items-center justify-between">
						<span class="text-xs font-bold text-arkhe-slate uppercase tracking-widest">Bukti Self-Service</span>
						<span class="px-2 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">Terverifikasi</span>
					</div>
					
					<div class="flex gap-4">
						<div class="w-24 h-32 bg-[#0F0F0F] rounded-2xl overflow-hidden flex-shrink-0 shadow-inner relative border border-arkhe-line/50">
							<!-- Mock selfie -->
							<img src="https://i.pravatar.cc/200?u={selectedStudent.id}" alt="Selfie" class="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" />
							<div class="absolute bottom-2 left-2 right-2 flex justify-center">
								<div class="px-2 py-1 bg-black/60 backdrop-blur text-white text-[9px] font-mono rounded-md">
									{selectedStudent.jam || '07:12:45'}
								</div>
							</div>
						</div>
						<div class="flex flex-col justify-center gap-4 flex-1">
							<div class="flex flex-col gap-1">
								<span class="flex items-center gap-1.5 text-[10px] font-bold text-arkhe-slate uppercase tracking-wider">
									<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
									Validasi Lokasi
								</span>
								<div class="flex items-baseline gap-1.5">
									<span class="text-lg font-bold text-arkhe-ink">128</span>
									<span class="text-sm font-bold text-arkhe-slate">meter</span>
								</div>
								<span class="text-[10px] font-medium text-arkhe-hadir">Sesuai Radius GPS</span>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Override Status -->
			<div class="flex flex-col gap-3">
				<span class="text-xs font-bold text-arkhe-slate uppercase tracking-widest px-1">Timpa Status Kehadiran</span>
				<div class="grid grid-cols-2 gap-3">
					{#each ['hadir', 'sakit', 'izin', 'alpa'] as status}
						<button
							onclick={() => (editStatus = status)}
							class="py-4 rounded-xl border-2 flex items-center justify-center font-bold text-sm uppercase tracking-wider transition-all {editStatus === status
								? (status === 'hadir' ? 'border-arkhe-hadir bg-arkhe-hadir/10 text-arkhe-hadir' :
								   status === 'sakit' ? 'border-arkhe-sakit bg-arkhe-sakit/10 text-arkhe-sakit' :
								   status === 'izin' ? 'border-arkhe-izin bg-arkhe-izin/10 text-arkhe-izin' :
								   'border-arkhe-alpa bg-arkhe-alpa/10 text-arkhe-alpa')
								: 'border-transparent bg-arkhe-mist text-arkhe-slate hover:bg-arkhe-line/50'}"
						>
							{status}
						</button>
					{/each}
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<label for="note" class="text-xs font-bold text-arkhe-slate uppercase tracking-widest px-1">
					Catatan Tambahan
				</label>
				<textarea
					id="note"
					bind:value={editNote}
					rows="2"
					class="w-full bg-arkhe-mist border border-transparent focus:border-arkhe-accent focus:bg-arkhe-white rounded-xl p-4 text-sm focus:outline-none focus:ring-4 focus:ring-arkhe-accent/10 text-arkhe-ink placeholder:text-arkhe-slate font-medium transition-all"
					placeholder="Tulis alasan jika menimpa status..."
				></textarea>
			</div>

			<button
				onclick={saveStatus}
				class="w-full bg-arkhe-ink text-white font-bold text-lg py-4 rounded-[20px] shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-2"
			>
				Simpan Perubahan
			</button>
		</div>
	{/if}
</BottomSheet>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
