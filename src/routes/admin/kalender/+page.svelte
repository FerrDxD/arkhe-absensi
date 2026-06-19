<script lang="ts">
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import { showToast } from '$lib/stores/toast.svelte.js';
	import { onMount } from 'svelte';

	let currentDate = $state(new Date()); // Auto current date
	let monthName = $derived(
		currentDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' })
	);

	type CalendarDay = {
		date: number;
		fullDate: string;
		isToday: boolean;
		isWeekend: boolean;
		isNationalHoliday: boolean;
		isHoliday: boolean;
		holidayName: string;
		isPadding?: boolean;
	};

	let nationalHolidays = $state<any[]>([]);
	let manualHolidays = $state<Record<string, string>>({});

	async function fetchHolidays(year: number) {
		try {
			const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/ID`);
			if (res.ok) {
				nationalHolidays = await res.json();
			}
		} catch (error) {
			console.error("Gagal mengambil hari libur:", error);
		}
	}

	onMount(() => {
		fetchHolidays(currentDate.getFullYear());
	});

	let currentYearTracker = $state(currentDate.getFullYear());
	$effect(() => {
		if (currentDate.getFullYear() !== currentYearTracker) {
			currentYearTracker = currentDate.getFullYear();
			fetchHolidays(currentYearTracker);
		}
	});

	let days = $derived.by(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		
		const numDays = lastDay.getDate();
		const startPadding = (firstDay.getDay() + 6) % 7;
		
		const todayStr = new Date().toISOString().split('T')[0];
		
		let result: CalendarDay[] = [];
		
		for (let i = 0; i < startPadding; i++) {
			result.push({ date: 0, fullDate: '', isToday: false, isWeekend: false, isNationalHoliday: false, isHoliday: false, holidayName: '', isPadding: true });
		}
		
		for (let i = 1; i <= numDays; i++) {
			const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
			const d = new Date(year, month, i);
			const dayOfWeek = d.getDay();
			const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
			
			const natHoliday = nationalHolidays.find(h => h.date === dStr);
			const isNationalHoliday = !!natHoliday;
			const manualHolidayName = manualHolidays[dStr];
			const isHoliday = isWeekend || isNationalHoliday || !!manualHolidayName;
			
			let holidayName = '';
			if (manualHolidayName) holidayName = manualHolidayName;
			else if (isNationalHoliday) holidayName = natHoliday.localName;
			else if (isWeekend) holidayName = 'Akhir Pekan';
			
			result.push({
				date: i,
				fullDate: dStr,
				isToday: dStr === todayStr,
				isWeekend,
				isNationalHoliday,
				isHoliday,
				holidayName,
				isPadding: false
			});
		}
		return result;
	});

	let selectedDateStr = $state<string | null>(new Date().toISOString().split('T')[0]);

	let selectedDay = $derived(
		(selectedDateStr ? days.find(d => d.fullDate === selectedDateStr) : null) 
		|| days.find(d => !d.isPadding && d.isToday) 
		|| days.find(d => !d.isPadding) 
		|| null
	);

	function nextMonth() {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
		selectedDateStr = null;
	}
	
	function prevMonth() {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
		selectedDateStr = null;
	}

	let newHolidayName = $state('');

	function saveHoliday() {
		if (selectedDay && !selectedDay.isPadding) {
			manualHolidays[selectedDay.fullDate] = newHolidayName || 'Libur Sekolah';
			newHolidayName = '';
			showToast('Hari libur berhasil disimpan', 'success');
		}
	}

	function removeHoliday() {
		if (selectedDay && !selectedDay.isPadding) {
			delete manualHolidays[selectedDay.fullDate];
			showToast('Hari libur dibatalkan', 'info');
		}
	}
</script>

<svelte:head>
	<title>Sistem & Kalender · Admin ARKHE</title>
</svelte:head>

<div class="p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
	<div class="bg-[#0F0F0F] rounded-[32px] p-8 shadow-2xl shadow-black/10 relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
		<div class="absolute -top-32 -left-32 w-80 h-80 bg-gradient-to-br from-arkhe-accent to-purple-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30"></div>
		<div class="flex flex-col gap-1 relative z-10">
			<span class="text-white/60 text-xs font-bold uppercase tracking-widest">Sistem Global</span>
			<h1 class="font-display text-3xl font-bold text-white">Kalender & Konfigurasi API</h1>
			<p class="text-white/80 font-medium text-sm mt-1 max-w-lg">Atur parameter keamanan radius GPS, jendela waktu presensi, dan sinkronisasi libur nasional & keagamaan (6 Agama).</p>
		</div>
	</div>

	<div class="flex flex-col lg:flex-row gap-8 items-start">
		<!-- Kalender Akademik -->
		<div class="flex-1 w-full flex flex-col gap-6">
			<div class="bg-arkhe-white border border-arkhe-line/50 rounded-[32px] overflow-hidden shadow-sm flex flex-col">
				<div class="p-6 md:p-8 bg-arkhe-white border-b border-arkhe-line/50 flex justify-between items-center">
					<h2 class="font-display font-bold text-2xl text-arkhe-ink capitalize">
						{monthName}
					</h2>
					<div class="flex gap-2">
						<button onclick={prevMonth} class="w-10 h-10 border border-arkhe-line/50 rounded-xl flex items-center justify-center hover:bg-arkhe-mist hover:border-arkhe-line transition-all text-arkhe-ink">
							<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" /></svg>
						</button>
						<button onclick={nextMonth} class="w-10 h-10 border border-arkhe-line/50 rounded-xl flex items-center justify-center hover:bg-arkhe-mist hover:border-arkhe-line transition-all text-arkhe-ink">
							<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
						</button>
					</div>
				</div>

				<div class="grid grid-cols-7 bg-arkhe-mist/30 border-b border-arkhe-line/50">
					{#each ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'] as dayName}
						<div class="text-center text-[10px] tracking-widest font-bold text-arkhe-slate uppercase py-4 border-r border-arkhe-line/50 last:border-0">
							{dayName}
						</div>
					{/each}
				</div>

				<div class="grid grid-cols-7 bg-arkhe-white">
					{#each days as day, index}
						{#if day.isPadding}
							<div class="min-h-[100px] border-b border-r border-arkhe-line/50 {index % 7 === 6 ? 'border-r-0' : ''} bg-arkhe-mist/10"></div>
						{:else}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div
								onclick={() => (selectedDateStr = day.fullDate)}
								class="group min-h-[100px] relative p-3 flex flex-col items-center border-b border-r border-arkhe-line/50 cursor-pointer transition-all duration-300 
								{index % 7 === 6 ? 'border-r-0' : ''}
								{selectedDay?.fullDate === day.fullDate ? 'bg-arkhe-accent/5 shadow-[inset_0_0_0_2px_#6366F1] z-10' : 'hover:bg-arkhe-mist/50'}
								{day.isHoliday && selectedDay?.fullDate !== day.fullDate ? 'bg-arkhe-alpa/5' : ''}"
							>
								<div class="w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all {day.isToday ? 'bg-arkhe-accent text-white shadow-lg shadow-arkhe-accent/40' : (day.isHoliday ? 'text-arkhe-alpa' : 'text-arkhe-ink')} {!day.isToday && selectedDay?.fullDate !== day.fullDate ? 'group-hover:bg-arkhe-line/50' : ''}">
									{day.date}
								</div>
								
								{#if day.isHoliday}
									<div class="mt-auto w-full pt-2">
										<div class="hidden sm:block text-[9px] font-bold px-2 py-1 rounded bg-arkhe-alpa/10 text-arkhe-alpa truncate text-center uppercase tracking-wider">
											{day.holidayName}
										</div>
										<div class="block sm:hidden flex justify-center w-full">
											<div class="w-1.5 h-1.5 rounded-full bg-arkhe-alpa mb-1"></div>
										</div>
									</div>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<!-- Panel Konfigurasi -->
		<div class="w-full lg:w-[400px] flex flex-col gap-6">
			
			<!-- Editor Status Hari -->
			<div class="bg-arkhe-white border border-arkhe-line/50 rounded-[32px] p-6 shadow-sm flex flex-col">
				{#if selectedDay && !selectedDay.isPadding}
					<div class="flex items-center gap-3 border-b border-arkhe-line/50 pb-4 mb-4">
						<div class="w-12 h-12 rounded-xl bg-arkhe-mist flex items-center justify-center font-display font-bold text-xl text-arkhe-ink">{selectedDay.date}</div>
						<div class="flex flex-col">
							<span class="text-xs font-bold text-arkhe-slate uppercase tracking-widest">{monthName.split(' ')[0]} {currentDate.getFullYear()}</span>
							<span class="font-bold text-arkhe-ink">Manajemen Absensi</span>
						</div>
					</div>

					{#if selectedDay.isHoliday}
						<div class="bg-arkhe-alpa/5 border border-arkhe-alpa/20 p-4 rounded-2xl mb-4 flex flex-col">
							<span class="text-[10px] font-bold text-arkhe-alpa uppercase tracking-widest mb-1 flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-arkhe-alpa animate-pulse"></div> Sesi Dikunci</span>
							<span class="font-bold text-arkhe-ink text-sm">{selectedDay.holidayName}</span>
							<span class="text-xs text-arkhe-slate font-medium mt-1">Siswa tidak dapat melakukan presensi mandiri pada hari ini.</span>
						</div>
						
						{#if !selectedDay.isWeekend && !selectedDay.isNationalHoliday}
							<button onclick={removeHoliday} class="w-full py-3.5 border-2 border-arkhe-line/50 text-arkhe-ink rounded-xl text-sm font-bold hover:border-arkhe-ink transition-colors">
								Batalkan Libur Manual
							</button>
						{:else}
							<p class="text-xs text-arkhe-slate italic mt-2">
								Catatan: Libur akhir pekan dan libur resmi (Nasional/Keagamaan) terkunci oleh API dan tidak dapat dibatalkan manual.
							</p>
						{/if}
					{:else}
						<div class="bg-arkhe-hadir/5 border border-arkhe-hadir/20 p-4 rounded-2xl mb-4 flex flex-col">
							<span class="text-[10px] font-bold text-arkhe-hadir uppercase tracking-widest mb-1 flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-arkhe-hadir"></div> Sesi Aktif</span>
							<span class="text-xs text-arkhe-slate font-medium mt-1">Siswa dapat melakukan presensi mandiri.</span>
						</div>

						<div class="flex flex-col gap-2">
							<label for="holidayName" class="text-xs font-bold text-arkhe-slate uppercase tracking-widest">Tandai Libur Sekolah</label>
							<input id="holidayName" type="text" bind:value={newHolidayName} placeholder="Tulis alasan libur..." class="w-full px-4 py-3.5 bg-arkhe-mist/50 border border-transparent rounded-xl text-sm font-bold focus:bg-white focus:outline-none focus:border-arkhe-accent focus:ring-4 focus:ring-arkhe-accent/10 transition-all text-arkhe-ink" />
							<button onclick={saveHoliday} class="w-full mt-2 py-3.5 bg-arkhe-ink text-white rounded-xl text-sm font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all">Simpan Libur</button>
						</div>
					{/if}
				{:else}
					<div class="py-8 text-center text-arkhe-slate font-medium text-sm">Pilih salah satu tanggal untuk mengatur status operasional.</div>
				{/if}
			</div>

			<!-- Konfigurasi Security & API -->
			<div class="bg-arkhe-white border border-arkhe-line/50 rounded-[32px] p-6 shadow-sm flex flex-col">
				<div class="flex items-center gap-2 mb-6">
					<svg class="w-5 h-5 text-arkhe-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
					<h3 class="font-display font-bold text-lg text-arkhe-ink">Parameter Keamanan</h3>
				</div>
				
				<div class="flex flex-col gap-5">
					<div class="flex flex-col gap-1.5">
						<label class="text-[10px] font-bold text-arkhe-slate uppercase tracking-widest">Sesi Kedatangan</label>
						<div class="flex items-center gap-2">
							<input type="time" class="flex-1 px-4 py-3 bg-arkhe-mist/50 rounded-xl text-sm font-bold text-arkhe-ink focus:outline-none focus:ring-2 focus:ring-arkhe-accent/20" value="06:00" />
							<span class="text-arkhe-slate font-bold">-</span>
							<input type="time" class="flex-1 px-4 py-3 bg-arkhe-mist/50 rounded-xl text-sm font-bold text-arkhe-ink focus:outline-none focus:ring-2 focus:ring-arkhe-accent/20" value="07:30" />
						</div>
					</div>

					<div class="flex flex-col gap-1.5">
						<label class="text-[10px] font-bold text-arkhe-slate uppercase tracking-widest">Sesi Kepulangan</label>
						<div class="flex items-center gap-2">
							<input type="time" class="flex-1 px-4 py-3 bg-arkhe-mist/50 rounded-xl text-sm font-bold text-arkhe-ink focus:outline-none focus:ring-2 focus:ring-arkhe-accent/20" value="14:00" />
							<span class="text-arkhe-slate font-bold">-</span>
							<input type="time" class="flex-1 px-4 py-3 bg-arkhe-mist/50 rounded-xl text-sm font-bold text-arkhe-ink focus:outline-none focus:ring-2 focus:ring-arkhe-accent/20" value="16:00" />
						</div>
					</div>

					<div class="flex flex-col gap-1.5">
						<label class="text-[10px] font-bold text-arkhe-slate uppercase tracking-widest">Radius Geofencing (Meter)</label>
						<input type="number" class="w-full px-4 py-3 bg-arkhe-mist/50 rounded-xl text-sm font-bold text-arkhe-ink focus:outline-none focus:ring-2 focus:ring-arkhe-accent/20" value="150" />
					</div>

					<div class="flex flex-col gap-1.5">
						<label class="text-[10px] font-bold text-arkhe-slate uppercase tracking-widest">Koordinat Inti (Lat, Lng)</label>
						<div class="flex gap-2">
							<input type="text" class="flex-1 px-4 py-3 bg-arkhe-mist/50 rounded-xl text-sm font-mono font-bold text-arkhe-ink focus:outline-none focus:ring-2 focus:ring-arkhe-accent/20" value="-6.4829, 107.0142" />
							<button class="px-4 py-3 bg-[#0F0F0F] text-white rounded-xl hover:bg-black transition-colors shadow-md" title="Gunakan Lokasi Saat Ini">
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
							</button>
						</div>
					</div>

					<button onclick={() => showToast('Parameter keamanan berhasil diperbarui', 'success')} class="w-full mt-2 py-3.5 bg-arkhe-accent text-white rounded-xl text-sm font-bold shadow-lg shadow-arkhe-accent/20 hover:scale-[1.02] active:scale-95 transition-all">
						Terapkan Konfigurasi
					</button>
				</div>
			</div>
			
		</div>
	</div>
</div>
