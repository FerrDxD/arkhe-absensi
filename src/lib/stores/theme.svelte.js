import { browser } from '$app/environment';

let isDark = $state(false);

export const theme = {
	get isDark() {
		return isDark;
	},
	init() {
		if (browser) {
			const saved = localStorage.getItem('theme');
			if (saved === 'dark') {
				isDark = true;
				document.documentElement.classList.add('dark');
			} else {
				isDark = false;
				document.documentElement.classList.remove('dark');
			}
		}
	},
	toggle() {
		isDark = !isDark;
		if (browser) {
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
			if (isDark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}
};
