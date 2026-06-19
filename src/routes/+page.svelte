<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import LoadingSkeleton from '$lib/components/LoadingSkeleton.svelte';

	onMount(() => {
		goto('/login');
	});
</script>

<svelte:head>
	<title>Memuat · ARKHE</title>
</svelte:head>

<div
	class="min-h-screen bg-arkhe-mist flex flex-col items-center justify-center p-4 relative overflow-hidden"
>
	<!-- Decorative background -->
	<div
		class="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-arkhe-accent/5 to-transparent pointer-events-none"
	></div>

	<div
		class="w-full max-w-[400px] bg-arkhe-white rounded-[16px] p-8 shadow-xl border border-arkhe-line/50 flex flex-col items-center gap-4 relative z-10"
	>
		<div class="flex items-center gap-3 mb-4">
			<LoadingSkeleton class="w-10 h-10 rounded-full" />
			<LoadingSkeleton class="w-24 h-6" />
		</div>
		<LoadingSkeleton class="w-full h-10 mt-2 rounded-lg" />
		<LoadingSkeleton class="w-full h-10 rounded-lg" />
		<LoadingSkeleton class="w-full h-10 mt-4 rounded-lg" />
	</div>
</div>
