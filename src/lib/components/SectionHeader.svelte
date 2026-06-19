<script lang="ts">
	let {
		eyebrow,
		title,
		class: className = ''
	}: {
		eyebrow: string;
		title: string;
		class?: string;
	} = $props();
</script>

<div class="flex flex-col gap-1 {className}">
	<span
		class="text-[11px] font-semibold uppercase tracking-[0.08em] text-arkhe-slate"
		>{eyebrow}</span
	>
	<h2 class="font-display text-2xl font-semibold text-arkhe-ink">{title}</h2>
</div>
