<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		open = $bindable(false),
		title,
		children,
		class: className = ''
	}: {
		open: boolean;
		title?: string;
		children: Snippet;
		class?: string;
	} = $props();

	function close() {
		open = false;
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center sm:p-4"
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 bg-arkhe-ink/40 transition-opacity duration-250 ease-out"
			onclick={close}
		></div>

		<div
			class="relative w-full max-w-md bg-arkhe-white rounded-t-[16px] sm:rounded-[10px] p-5 shadow-xl transition-transform duration-250 ease-out transform translate-y-0 animate-slide-up sm:animate-fade-in {className}"
		>
			<div class="flex justify-between items-center mb-4">
				{#if title}
					<h3 class="font-display text-lg font-semibold text-arkhe-ink">
						{title}
					</h3>
				{/if}
				<button
					onclick={close}
					class="p-1 text-arkhe-slate hover:bg-arkhe-mist rounded-full transition-colors ml-auto"
					aria-label="Close"
				>
					<svg
						class="w-5 h-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			{@render children()}
		</div>
	</div>
{/if}

<style>
	@keyframes slide-up {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	.animate-slide-up {
		animation: slide-up 250ms ease-out;
	}
	@media (min-width: 640px) {
		.sm\:animate-fade-in {
			animation: fade-in 150ms ease-out;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.animate-slide-up,
		.sm\:animate-fade-in {
			animation: none;
		}
	}
</style>
