<script lang="ts">
	let {
		open = $bindable(false),
		title,
		message,
		confirmText = 'Konfirmasi',
		cancelText = 'Batal',
		onConfirm,
		isDestructive = false
	}: {
		open: boolean;
		title: string;
		message: string;
		confirmText?: string;
		cancelText?: string;
		onConfirm: () => void;
		isDestructive?: boolean;
	} = $props();

	function close() {
		open = false;
	}

	function handleConfirm() {
		onConfirm();
		close();
	}
</script>

{#if open}
	<div class="fixed inset-0 z-[60] flex items-center justify-center p-4">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 bg-arkhe-ink/50 transition-opacity"
			onclick={close}
		></div>

		<div
			class="relative bg-arkhe-white rounded-[10px] p-5 w-full max-w-sm shadow-xl animate-fade-in"
		>
			<h3 class="font-display text-lg font-semibold text-arkhe-ink">{title}</h3>
			<p class="text-arkhe-slate text-sm mt-2">{message}</p>

			<div class="mt-6 flex justify-end gap-3">
				<button
					onclick={close}
					class="px-4 py-2 text-sm font-medium text-arkhe-slate hover:bg-arkhe-mist rounded-md transition-colors"
				>
					{cancelText}
				</button>
				<button
					onclick={handleConfirm}
					class="px-4 py-2 text-sm font-medium text-white rounded-md transition-colors {isDestructive
						? 'bg-arkhe-alpa hover:bg-arkhe-alpa/90'
						: 'bg-arkhe-accent hover:bg-arkhe-accent/90'}"
				>
					{confirmText}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
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
	.animate-fade-in {
		animation: fade-in 150ms ease-out;
	}
	@media (prefers-reduced-motion: reduce) {
		.animate-fade-in {
			animation: none;
		}
	}
</style>
