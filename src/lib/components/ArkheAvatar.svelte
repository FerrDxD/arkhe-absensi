<script lang="ts">
	let {
		name,
		class: className = ''
	}: {
		name: string;
		class?: string;
	} = $props();

	const initials = $derived(
		name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.substring(0, 2)
			.toUpperCase()
	);
</script>

<div
	class="flex items-center justify-center w-10 h-10 rounded-full bg-arkhe-accent text-arkhe-white font-medium text-sm {className}"
>
	{initials}
</div>
