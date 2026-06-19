<script lang="ts">
	import ArkheCard from '$lib/components/ArkheCard.svelte';
	import { mockSesiConfig } from '$lib/mock/sesi-config';

	let { 
		gpsLocked = false, 
		gpsAccuracy = 0, 
		distance = 0, 
		inRadius = false,
		activeSession = null, // 'datang' | 'pulang' | null
	} = $props<{
		gpsLocked?: boolean;
		gpsAccuracy?: number;
		distance?: number;
		inRadius?: boolean;
		activeSession?: 'datang' | 'pulang' | null;
	}>();

	let sessionText = $derived(
		activeSession === 'datang' ? 'Datang' : 
		activeSession === 'pulang' ? 'Pulang' : 'Tdk Aktif'
	);

	let sessionTime = $derived(
		activeSession === 'datang' ? `${mockSesiConfig.datang.mulai}-${mockSesiConfig.datang.selesai}` : 
		activeSession === 'pulang' ? `${mockSesiConfig.pulang.mulai}-${mockSesiConfig.pulang.selesai}` : '—'
	);

</script>

<div class="bg-[#0F0F0F] rounded-3xl p-4 shadow-xl shadow-black/20 flex divide-x divide-white/10 relative overflow-hidden">
	<!-- Decorative background glows -->
	<div class="absolute -top-10 -right-10 w-24 h-24 bg-white/5 rounded-full blur-xl mix-blend-screen pointer-events-none"></div>

	<!-- Kolom 1 - GPS -->
	<div class="flex-1 px-2 flex flex-col items-center text-center justify-center">
		<span class="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">GPS</span>
		<div class="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
			{#if gpsLocked}
				<div class="w-1.5 h-1.5 rounded-full bg-arkhe-hadir shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
				<span class="text-[11px] font-bold text-white">Terkunci</span>
			{:else}
				<div class="w-1.5 h-1.5 rounded-full bg-arkhe-alpa animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
				<span class="text-[11px] font-bold text-white/80">Mencari</span>
			{/if}
		</div>
		<span class="text-[9px] text-white/40 mt-1.5 font-mono">
			{gpsLocked ? `±${Math.round(gpsAccuracy)}m akurasi` : 'Menunggu...'}
		</span>
	</div>

	<!-- Kolom 2 - Jarak -->
	<div class="flex-1 px-2 flex flex-col items-center text-center justify-center">
		<span class="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Jarak</span>
		<span class="font-display text-lg font-bold {inRadius ? 'text-arkhe-hadir' : 'text-arkhe-alpa'} drop-shadow-md">
			{distance ? `${Math.round(distance)}` : '—'}<span class="text-[10px] text-white/50 ml-0.5">m</span>
		</span>
		<span class="text-[9px] text-white/40 mt-0.5 font-mono">maks {mockSesiConfig.radiusMaksimal}m</span>
	</div>

	<!-- Kolom 3 - Sesi -->
	<div class="flex-1 px-2 flex flex-col items-center text-center justify-center">
		<span class="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Sesi</span>
		<span class="font-display text-lg font-bold {activeSession ? 'text-[#a18cd1]' : 'text-white/30'} drop-shadow-md">
			{sessionText}
		</span>
		<span class="text-[9px] text-white/40 mt-0.5 font-mono">{sessionTime}</span>
	</div>
</div>
