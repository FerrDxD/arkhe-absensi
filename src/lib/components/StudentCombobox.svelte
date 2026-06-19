<script lang="ts">
	import type { Student } from '$lib/mock/students';

	let { students, onSelect, selectedStudent = null } = $props<{
		students: Student[];
		onSelect: (student: Student | null) => void;
		selectedStudent?: Student | null;
	}>();

	let searchQuery = $state('');
	let isOpen = $state(false);
	let activeIndex = $state(-1);

	let filteredStudents = $derived(
		searchQuery.trim() === ''
			? students.slice(0, 5) // Show top 5 if empty
			: students.filter(s => 
				s.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
				s.nisn.includes(searchQuery)
			).slice(0, 5)
	);

	function handleSelect(student: Student) {
		onSelect(student);
		isOpen = false;
		searchQuery = '';
		activeIndex = -1;
	}

	function handleReset() {
		onSelect(null);
		isOpen = true;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!isOpen) return;

		switch(e.key) {
			case 'ArrowDown':
				e.preventDefault();
				activeIndex = activeIndex < filteredStudents.length - 1 ? activeIndex + 1 : activeIndex;
				break;
			case 'ArrowUp':
				e.preventDefault();
				activeIndex = activeIndex > 0 ? activeIndex - 1 : 0;
				break;
			case 'Enter':
				e.preventDefault();
				if (activeIndex >= 0 && activeIndex < filteredStudents.length) {
					handleSelect(filteredStudents[activeIndex]);
				}
				break;
			case 'Escape':
				isOpen = false;
				break;
		}
	}
</script>

<div class="relative w-full">
	{#if selectedStudent}
		<div class="flex items-center justify-between p-3 bg-arkhe-hadir/5 border border-arkhe-hadir/30 rounded-lg">
			<div class="flex flex-col">
				<span class="text-sm font-semibold text-arkhe-ink">{selectedStudent.nama}</span>
				<span class="text-[10px] text-arkhe-slate font-mono mt-0.5">NISN: {selectedStudent.nisn} · {selectedStudent.kelas}</span>
			</div>
			<button 
				type="button" 
				class="text-xs font-medium text-arkhe-accent px-3 py-1.5 rounded-md hover:bg-arkhe-accent/10 transition-colors"
				onclick={handleReset}
			>
				Ganti
			</button>
		</div>
	{:else}
		<!-- Using focus/blur events to manage dropdown, but with a timeout to allow clicks on list items -->
		<input
			type="text"
			placeholder="Cari nama atau NISN..."
			bind:value={searchQuery}
			onfocus={() => { isOpen = true; activeIndex = -1; }}
			onblur={() => setTimeout(() => isOpen = false, 200)}
			onkeydown={handleKeydown}
			class="w-full px-3 py-2.5 bg-arkhe-white border border-arkhe-line rounded-md text-arkhe-ink text-sm focus:outline-none focus:ring-2 focus:ring-arkhe-accent focus:border-transparent transition-shadow"
		/>

		{#if isOpen}
			<div class="absolute z-10 w-full mt-1 bg-arkhe-white border border-arkhe-line rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto">
				{#if filteredStudents.length > 0}
					<ul class="py-1">
						{#each filteredStudents as student, i}
							<li>
								<button
									type="button"
									class="w-full text-left px-3 py-2 hover:bg-arkhe-mist transition-colors {i === activeIndex ? 'bg-arkhe-mist' : ''}"
									onclick={() => handleSelect(student)}
									onmouseover={() => activeIndex = i}
									onfocus={() => activeIndex = i}
								>
									<div class="text-sm font-medium text-arkhe-ink">{student.nama}</div>
									<div class="text-[10px] text-arkhe-slate mt-0.5">{student.nisn} · {student.kelas}</div>
								</button>
							</li>
						{/each}
					</ul>
				{:else}
					<div class="p-3 text-center text-sm text-arkhe-slate">
						Siswa tidak ditemukan.
					</div>
				{/if}
			</div>
		{/if}
	{/if}
</div>
