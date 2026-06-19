<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import StatusInfoBar from '$lib/components/StatusInfoBar.svelte';
	import StudentCombobox from '$lib/components/StudentCombobox.svelte';
	import SelfieCapture from '$lib/components/SelfieCapture.svelte';
	import SubmitSuccessPanel from '$lib/components/SubmitSuccessPanel.svelte';
	import ArkheCard from '$lib/components/ArkheCard.svelte';
	import { mockStudentList, type Student } from '$lib/mock/students';
	import { mockSesiConfig } from '$lib/mock/sesi-config';

	let gpsLocked = $state(false);
	let gpsAccuracy = $state(0);
	let distance = $state(0);
	let inRadius = $state(false);
	let locationError = $state<string | null>(null);

	let activeSession = $state<'datang' | 'pulang' | null>(null);
	let isLateSession = $state(false);
	
	let selectedStudent = $state<Student | null>(null);
	let capturedImage = $state<Blob | null>(null);
	let isSubmitting = $state(false);

	let viewState = $state<'form' | 'success' | 'already_done' | 'holiday'>('form');

	let submitTimestamp = $state('');

	function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
		const R = 6371e3;
		const φ1 = lat1 * Math.PI/180;
		const φ2 = lat2 * Math.PI/180;
		const Δφ = (lat2-lat1) * Math.PI/180;
		const Δλ = (lon2-lon1) * Math.PI/180;

		const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
				Math.cos(φ1) * Math.cos(φ2) *
				Math.sin(Δλ/2) * Math.sin(Δλ/2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		return R * c;
	}

	function checkSession() {
		const now = new Date();
		const hour = now.getHours();
		const minute = now.getMinutes();
		const currentMinutes = hour * 60 + minute;

		const parseTime = (timeStr: string) => {
			const [h, m] = timeStr.split(':').map(Number);
			return h * 60 + m;
		};

		const datangStart = parseTime(mockSesiConfig.datang.mulai);
		const datangEnd = parseTime(mockSesiConfig.datang.selesai);
		const datangBatas = parseTime(mockSesiConfig.datang.batasHadir);
		const pulangStart = parseTime(mockSesiConfig.pulang.mulai);
		const pulangEnd = parseTime(mockSesiConfig.pulang.selesai);

		if (currentMinutes >= datangStart && currentMinutes <= datangEnd) {
			activeSession = 'datang';
			isLateSession = currentMinutes > datangBatas;
		} else if (currentMinutes >= pulangStart && currentMinutes <= pulangEnd) {
			activeSession = 'pulang';
			isLateSession = false;
		} else {
			activeSession = null;
			isLateSession = false;
		}

		if (!activeSession) {
			activeSession = 'datang';
			isLateSession = true;
		}
	}

	onMount(() => {
		checkSession();

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					gpsLocked = true;
					gpsAccuracy = position.coords.accuracy;
					
					distance = 128; // mock
					inRadius = distance <= mockSesiConfig.radiusMaksimal;
				},
				(error) => {
					locationError = "Akses lokasi ditolak atau gagal. Harap izinkan lokasi.";
				},
				{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
			);
		} else {
			locationError = "Browser Anda tidak mendukung geolokasi.";
		}
	});

	let isFormValid = $derived(
		selectedStudent !== null && 
		capturedImage !== null && 
		inRadius && 
		activeSession !== null &&
		gpsLocked
	);

	let buttonHelperText = $derived(
		!activeSession ? "Sesi presensi belum aktif" :
		!inRadius ? "Kamu di luar area sekolah" :
		!selectedStudent ? "Pilih nama terlebih dahulu" :
		!capturedImage ? "Ambil foto selfie terlebih dahulu" :
		""
	);

	async function handleSubmit() {
		if (!isFormValid) return;
		isSubmitting = true;

		await new Promise(resolve => setTimeout(resolve, 1500));

		const now = new Date();
		submitTimestamp = new Intl.DateTimeFormat('id-ID', {
			day: 'numeric', month: 'long', year: 'numeric',
			hour: '2-digit', minute: '2-digit'
		}).format(now);

		isSubmitting = false;
		viewState = 'success';
	}
</script>

<svelte:head>
	<title>Presensi · ARKHE</title>
</svelte:head>

<div class="min-h-[100dvh] bg-arkhe-mist flex flex-col relative w-full overflow-x-hidden">
	
	{#if viewState === 'success'}
		<div class="flex-1 flex items-center justify-center">
			<SubmitSuccessPanel 
				sessionType={activeSession === 'pulang' ? 'Pulang' : 'Datang'}
				timestamp={submitTimestamp}
				distance={distance}
				isLate={isLateSession}
				onBackToDashboard={() => goto('/siswa/dashboard')}
			/>
		</div>
	{:else if viewState === 'holiday' || viewState === 'already_done'}
		<div class="flex-1 flex items-center justify-center p-4">
			<ArkheCard class="flex flex-col items-center justify-center text-center p-8 border-arkhe-line/50 rounded-[32px] w-full max-w-md shadow-xl">
				<div class="w-20 h-20 bg-arkhe-slate/10 text-arkhe-slate rounded-full flex items-center justify-center mb-6">
					<svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
				</div>
				<h2 class="font-display text-2xl font-bold text-arkhe-ink mb-2">Presensi Ditutup</h2>
				<p class="text-arkhe-slate mb-8">Maaf, sesi presensi tidak tersedia.</p>
				<button class="w-full bg-arkhe-ink text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform" onclick={() => goto('/siswa/dashboard')}>
					Kembali
				</button>
			</ArkheCard>
		</div>
	{:else}
		
		<!-- THE VIEW FINDER (Camera Section) -->
		<div class="relative w-full h-[65dvh] bg-black rounded-b-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10 shrink-0">
			<SelfieCapture 
				onCapture={(blob) => capturedImage = blob}
				minBrightness={30}
				containerClass="absolute inset-0 w-full h-full bg-black border-none"
			/>

			<!-- Header overlay -->
			<div class="absolute top-0 inset-x-0 p-4 pt-6 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between pointer-events-none z-20">
				<button class="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors pointer-events-auto" onclick={() => goto('/siswa/dashboard')}>
					<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<h1 class="font-display text-lg font-bold text-white tracking-widest uppercase drop-shadow-md">Live Presensi</h1>
				<div class="w-12"></div> <!-- Spacer for centering -->
			</div>

			<!-- Status Info overlay -->
			<div class="absolute top-20 inset-x-4 z-20 pointer-events-none">
				<StatusInfoBar 
					{gpsLocked} 
					{gpsAccuracy} 
					{distance} 
					{inRadius} 
					{activeSession} 
				/>
			</div>
			

		</div>

		<!-- BOTTOM SHEET (Form Section) -->
		<div class="flex-1 w-full max-w-md mx-auto p-5 flex flex-col gap-4 relative z-20 -mt-6">
			
			{#if locationError}
				<div class="bg-red-50 text-red-600 p-4 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg">
					<svg class="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
					<p class="text-sm font-bold">{locationError}</p>
				</div>
			{:else}
				<div class="bg-arkhe-white rounded-[32px] p-6 shadow-xl shadow-black/5 flex flex-col gap-5 border border-arkhe-line/50 relative">
					<div class="flex flex-col gap-1.5 relative z-30">
						<label class="text-[11px] font-bold text-arkhe-slate uppercase tracking-widest pl-1">Identitas Siswa</label>
						<StudentCombobox 
							students={mockStudentList} 
							onSelect={(s) => selectedStudent = s} 
							{selectedStudent}
						/>
					</div>

					<button 
						type="button"
						disabled={!isFormValid || isSubmitting}
						class="w-full py-5 rounded-[20px] text-white flex flex-col items-center justify-center gap-1 transition-all duration-300 relative overflow-hidden group {isFormValid ? 'bg-arkhe-ink shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-95' : 'bg-arkhe-slate/30 text-arkhe-slate cursor-not-allowed shadow-none'}"
						onclick={handleSubmit}
					>
						{#if isFormValid}
							<!-- Shine effect -->
							<div class="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
						{/if}

						{#if isSubmitting}
							<div class="flex items-center gap-3">
								<svg class="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								<span class="font-bold text-xl">Memproses...</span>
							</div>
						{:else}
							<div class="flex items-center gap-3">
								<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span class="font-display font-bold text-xl">Kirim Presensi</span>
							</div>
						{/if}
					</button>

					{#if buttonHelperText && !isSubmitting}
						<p class="text-center text-xs font-bold text-arkhe-alpa animate-pulse">{buttonHelperText}</p>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>
