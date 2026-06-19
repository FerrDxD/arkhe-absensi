<script lang="ts">
	import { page } from '$app/stores';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	let { children } = $props();

	const navItems = [
		{
			label: 'Dashboard',
			href: '/admin',
			icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
		},
		{
			label: 'Siswa',
			href: '/admin/siswa',
			icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
		},
		{
			label: 'Kalender',
			href: '/admin/kalender',
			icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
		},
		{
			label: 'Guru',
			href: '/admin/guru',
			icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		}
	];
</script>

<div class="min-h-screen bg-arkhe-mist flex flex-col md:flex-row">
	<!-- Sidebar Desktop -->
	<aside
		class="hidden md:flex flex-col w-60 bg-arkhe-white border-r border-arkhe-line sticky top-0 h-screen p-4"
	>
		<div class="mb-8 px-2">
			<h1
				class="font-display font-bold text-2xl text-arkhe-ink tracking-tight"
			>
				ARKHE<span class="text-arkhe-accent">.</span>
			</h1>
		</div>

		<nav class="flex-1 flex flex-col gap-1">
			{#each navItems as item}
				<a
					href={item.href}
					class="flex items-center gap-3 px-3 py-2.5 rounded-md font-medium text-sm transition-colors {$page
						.url.pathname === item.href
						? 'bg-arkhe-accent text-white'
						: 'text-arkhe-slate hover:bg-arkhe-mist hover:text-arkhe-ink'}"
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
							d={item.icon}
						/>
					</svg>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="mt-auto pt-4 border-t border-arkhe-line flex flex-col gap-2">
			<ThemeToggle class="rounded-md !px-3 !py-2.5" />
			<a
				href="/login"
				class="flex items-center gap-3 px-3 py-2.5 rounded-md font-medium text-sm text-arkhe-alpa hover:bg-arkhe-alpa/10 transition-colors"
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
						d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
					/>
				</svg>
				Logout
			</a>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="flex-1 w-full pb-20 md:pb-0 min-w-0">
		{@render children()}
	</main>

	<!-- Bottom Nav Mobile -->
	<nav
		class="md:hidden fixed bottom-0 left-0 right-0 bg-arkhe-white border-t border-arkhe-line flex justify-around p-2 z-50"
	>
		{#each navItems as item}
			<a
				href={item.href}
				class="flex flex-col items-center gap-1 p-2 min-w-[64px] rounded-lg {$page
					.url.pathname === item.href
					? 'text-arkhe-accent'
					: 'text-arkhe-slate'}"
			>
				<svg
					class="w-6 h-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d={item.icon}
					/>
				</svg>
				<span class="text-[10px] font-medium">{item.label}</span>
			</a>
		{/each}
	</nav>
</div>
