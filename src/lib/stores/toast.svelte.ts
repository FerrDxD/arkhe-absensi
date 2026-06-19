export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
	id: string;
	type: ToastType;
	message: string;
}

export const toastState = $state({
	toasts: [] as Toast[]
});

export function showToast(message: string, type: ToastType = 'info') {
	const id = Math.random().toString(36).substring(2, 9);
	toastState.toasts.push({ id, type, message });
	setTimeout(() => {
		toastState.toasts = toastState.toasts.filter((t) => t.id !== id);
	}, 3000);
}
