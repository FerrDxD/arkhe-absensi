<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className = ''
	}: {
		children: Snippet;
		class?: string;
	} = $props();
</script>

<div
	class="bg-arkhe-white border border-arkhe-line rounded-[10px] p-4 md:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] {className}"
>
	{@render children()}
</div>
