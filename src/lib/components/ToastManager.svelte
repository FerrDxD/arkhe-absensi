<script lang="ts">
	import { toastState } from '$lib/stores/toast.svelte.js';
	import { slide, fade } from 'svelte/transition';
</script>

<div
	class="fixed bottom-4 left-0 right-0 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4"
>
	{#each toastState.toasts as toast (toast.id)}
		{@const colors = {
			success: 'bg-arkhe-hadir text-white',
			error: 'bg-arkhe-alpa text-white',
			info: 'bg-arkhe-accent text-white'
		}[toast.type]}

		<div
			in:slide={{ duration: 250 }}
			out:fade={{ duration: 150 }}
			class="pointer-events-auto px-4 py-3 rounded-full shadow-lg font-medium text-sm flex items-center max-w-sm w-full sm:w-auto {colors}"
		>
			{toast.message}
		</div>
	{/each}
</div>
