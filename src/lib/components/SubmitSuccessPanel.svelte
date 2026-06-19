<script lang="ts">
	import ArkheCard from '$lib/components/ArkheCard.svelte';

	let { sessionType, timestamp, distance, isLate = false, onBackToDashboard } = $props<{
		sessionType: 'Datang' | 'Pulang';
		timestamp: string;
		distance: number;
		isLate?: boolean;
		onBackToDashboard: () => void;
	}>();
</script>

<div class="flex flex-col items-center justify-center py-10 px-4 text-center w-full max-w-md mx-auto fade-in">
	{#if isLate}
		<div class="w-20 h-20 bg-arkhe-alpa/10 text-arkhe-alpa rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(220,38,38,0.2)]">
			<svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		</div>
		<h2 class="font-display font-bold text-2xl text-arkhe-alpa mb-1">Presensi Berhasil</h2>
		<p class="text-arkhe-alpa font-medium text-sm mb-1">Status: Terlambat</p>
	{:else}
		<div class="w-20 h-20 bg-arkhe-hadir/10 text-arkhe-hadir rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
			<svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
			</svg>
		</div>
		<h2 class="font-display font-bold text-2xl text-arkhe-hadir mb-1">Presensi Berhasil</h2>
		<p class="text-arkhe-hadir font-medium text-sm mb-1">Status: Tepat Waktu</p>
	{/if}
	
	<p class="text-arkhe-slate text-sm mb-8">{timestamp}</p>

	<ArkheCard class="w-full !p-0 border-arkhe-line/50 shadow-sm overflow-hidden mb-8">
		<div class="p-4 border-b border-arkhe-line bg-arkhe-mist flex justify-between items-center">
			<span class="text-sm font-medium text-arkhe-ink">Sesi</span>
			<span class="text-sm font-bold text-arkhe-accent">{sessionType}</span>
		</div>
		<div class="p-4 bg-arkhe-white flex justify-between items-center border-b border-arkhe-line">
			<span class="text-sm font-medium text-arkhe-ink">Jarak dari sekolah</span>
			<span class="text-sm font-bold text-arkhe-ink">{Math.round(distance)} m</span>
		</div>
		<div class="p-4 bg-arkhe-white flex justify-between items-center">
			<div class="flex items-center gap-2 text-arkhe-hadir">
				<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<span class="text-sm font-medium">Dalam radius sekolah</span>
			</div>
		</div>
	</ArkheCard>

	<p class="text-xs text-arkhe-slate font-medium mb-6">Presensi Anda telah tersimpan. Terima kasih!</p>

	<button
		type="button"
		class="w-full bg-arkhe-mist text-arkhe-ink font-semibold py-3.5 rounded-xl hover:bg-arkhe-line transition-colors shadow-sm"
		onclick={onBackToDashboard}
	>
		Kembali ke Dashboard
	</button>
</div>

<style>
	.fade-in {
		animation: fadeIn 0.4s ease-out forwards;
	}
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
