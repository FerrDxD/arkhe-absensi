<script lang="ts">
	let {
		title,
		description,
		class: className = ''
	}: {
		title: string;
		description: string;
		class?: string;
	} = $props();
</script>

<div
	class="flex flex-col items-center justify-center text-center p-8 bg-arkhe-mist rounded-[10px] border border-arkhe-line border-dashed {className}"
>
	<div
		class="w-16 h-16 bg-arkhe-slate/10 rounded-full flex items-center justify-center mb-4"
	>
		<svg
			class="w-8 h-8 text-arkhe-slate"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
			/>
		</svg>
	</div>
	<h3 class="text-arkhe-ink font-semibold text-lg">{title}</h3>
	<p class="text-arkhe-slate text-sm mt-1 max-w-xs">{description}</p>
</div>
