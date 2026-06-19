<script lang="ts">
	import { goto } from '$app/navigation';

	let role = $state<'siswa' | 'guru' | 'admin'>('siswa');
	let username = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let loading = $state(false);
	let error = $state('');

	async function handleLogin(e: Event) {
		e.preventDefault();
		loading = true;
		error = '';

		setTimeout(() => {
			loading = false;
			if (username && password) {
				if (role === 'guru') goto('/guru/dashboard');
				else if (role === 'admin') goto('/admin');
				else goto('/siswa/dashboard');
			} else {
				error = 'Silakan lengkapi nomor induk dan kata sandi Anda.';
			}
		}, 1000);
	}
</script>

<svelte:head>
	<title>Otentikasi · ARKHE</title>
</svelte:head>

<div class="min-h-[100dvh] bg-[#F8F9FA] dark:bg-[#0A0A0A] flex flex-col justify-center items-center p-4 font-sans relative transition-colors duration-500">
	
	<!-- Subtle Formal Background Texture (Dots) -->
	<div class="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none" style="background-image: radial-gradient(circle at 1px 1px, #CBD5E1 1px, transparent 0); background-size: 40px 40px;"></div>

	<!-- Premium Minimalist Card -->
	<div class="w-full max-w-[420px] bg-white dark:bg-[#121212] rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-100 dark:border-white/5 relative z-10 p-8 sm:p-10 transition-all duration-300">
		
		<!-- Elevated Branding Header -->
		<div class="flex flex-col items-center justify-center text-center mb-8">
			<!-- Formal Emblem Icon -->
			<div class="w-12 h-12 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] rounded-xl flex items-center justify-center mb-5 shadow-md">
				<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
				</svg>
			</div>
			
			<h1 class="font-display text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-1.5">
				Portal Akademik
			</h1>
			<p class="text-[13px] font-medium text-gray-500 dark:text-gray-400">
				Sistem Presensi ARKHE Terintegrasi
			</p>
		</div>

		<!-- Login Form -->
		<form onsubmit={handleLogin} class="flex flex-col gap-6">
			
			<!-- Elegant Role Switcher -->
			<div class="flex p-1 bg-[#F1F5F9] dark:bg-white/5 rounded-lg relative">
				{#each ['siswa', 'guru', 'admin'] as r}
					<button 
						type="button"
						class="flex-1 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-md transition-all duration-300 relative z-10 {role === r ? 'text-[#0F172A] dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}"
						onclick={() => { role = r as any; error = ''; }}
					>
						{#if role === r}
							<div class="absolute inset-0 bg-white dark:bg-[#1E1E1E] shadow-sm rounded-md -z-10 border border-gray-200/50 dark:border-transparent transition-all"></div>
						{/if}
						{r}
					</button>
				{/each}
			</div>

			<div class="flex flex-col gap-4 mt-2">
				<!-- Username Field -->
				<div class="flex flex-col gap-2">
					<label for="username" class="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
						{role === 'siswa' ? 'Nomor Induk Siswa (NISN)' : role === 'guru' ? 'Nomor Induk Pegawai (NIP)' : 'ID Administrator'}
					</label>
					<input
						id="username"
						type="text"
						bind:value={username}
						class="w-full px-4 py-3.5 bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm font-semibold text-[#0F172A] dark:text-white focus:outline-none focus:border-[#0F172A] dark:focus:border-white focus:ring-1 focus:ring-[#0F172A] dark:focus:ring-white transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
						placeholder={role === 'siswa' ? 'Masukkan NISN...' : 'Masukkan nomor identitas...'}
					/>
				</div>

				<!-- Password Field -->
				<div class="flex flex-col gap-2">
					<div class="flex justify-between items-center">
						<label for="password" class="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
							Kata Sandi
						</label>
						<button type="button" class="text-[11px] font-semibold text-[#2563EB] dark:text-[#60A5FA] hover:underline transition-all">Lupa sandi?</button>
					</div>
					<div class="relative">
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							bind:value={password}
							class="w-full px-4 pr-12 py-3.5 bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm font-semibold text-[#0F172A] dark:text-white focus:outline-none focus:border-[#0F172A] dark:focus:border-white focus:ring-1 focus:ring-[#0F172A] dark:focus:ring-white transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
							placeholder="••••••••"
						/>
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors p-1"
						>
							{#if showPassword}
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
							{:else}
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
							{/if}
						</button>
					</div>
				</div>
			</div>

			{#if error}
				<div class="px-4 py-3 bg-[#FEF2F2] dark:bg-[#7F1D1D]/20 border border-[#F87171]/50 rounded-lg text-[#DC2626] dark:text-[#FCA5A5] text-[12px] font-medium flex items-center gap-2">
					<svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
					{error}
				</div>
			{/if}

			<button
				type="submit"
				disabled={loading}
				class="w-full mt-2 py-3.5 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] rounded-lg text-sm font-semibold hover:bg-[#1E293B] dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-sm"
			>
				{#if loading}
					<svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
					Memproses otentikasi...
				{:else}
					Masuk ke Portal
				{/if}
			</button>
		</form>
	</div>

	<!-- Institutional Footer -->
	<div class="mt-8 text-center text-gray-400 dark:text-gray-500 text-[11px] font-medium flex flex-col gap-1">
		<span>&copy; 2026 Hak Cipta Dilindungi ARKHE Systems.</span>
		<span>Dikelola oleh Departemen IT Sekolah.</span>
	</div>
</div>
