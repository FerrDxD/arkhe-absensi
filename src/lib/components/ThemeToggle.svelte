<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte.js';
	let { class: className = '' } = $props();
</script>

<button
	onclick={() => theme.toggle()}
	class="flex items-center justify-between w-full p-4 hover:bg-arkhe-mist transition-colors group {className}"
>
	<div class="flex items-center gap-3">
		<div class="w-8 h-8 rounded-full bg-arkhe-mist group-hover:bg-arkhe-line/50 flex items-center justify-center text-arkhe-slate transition-colors">
			{#if theme.isDark}
				<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
				</svg>
			{:else}
				<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
				</svg>
			{/if}
		</div>
		<span class="text-sm font-medium text-arkhe-ink">Dark Mode</span>
	</div>
	
	<!-- Toggle Switch UI -->
	<div class="w-10 h-6 rounded-full p-1 transition-colors {theme.isDark ? 'bg-arkhe-accent' : 'bg-arkhe-line'} relative">
		<div class="w-4 h-4 rounded-full bg-white absolute top-1 transition-all {theme.isDark ? 'left-5' : 'left-1'}"></div>
	</div>
</button>
