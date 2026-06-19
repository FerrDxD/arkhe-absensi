<script lang="ts">
	import '@fontsource/dm-sans/500.css';
	import '@fontsource/dm-sans/600.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/jetbrains-mono/400.css';
	import './layout.css';
	import ToastManager from '$lib/components/ToastManager.svelte';
	import { theme } from '$lib/stores/theme.svelte.js';
	import { onMount } from 'svelte';
	
	let { children } = $props();

	onMount(() => {
		theme.init();
	});
</script>

{@render children()}
<ToastManager />
