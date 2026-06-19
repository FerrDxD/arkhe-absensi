<script lang="ts">
	import ArkheCard from '$lib/components/ArkheCard.svelte';
	import ArkheAvatar from '$lib/components/ArkheAvatar.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { mockSiswa } from '$lib/mock';
	import { showToast } from '$lib/stores/toast.svelte.js';

	function handleLogout() {
		showToast('Berhasil keluar.', 'info');
		setTimeout(() => {
			window.location.href = '/login';
		}, 1000);
	}
</script>

<svelte:head>
	<title>Profil Siswa · ARKHE</title>
</svelte:head>

<div class="min-h-screen bg-arkhe-mist pb-24 relative overflow-hidden flex flex-col items-center">
	
	<!-- Hero Profile Background -->
	<div class="absolute top-0 inset-x-0 h-[320px] bg-[#0F0F0F] rounded-b-[40px] shadow-lg overflow-hidden z-0">
		<!-- Dynamic Neo-pop Orbs -->
		<div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-tr from-[#fbc2eb] to-[#a18cd1] rounded-full mix-blend-screen filter blur-[40px] opacity-40 translate-x-1/3 -translate-y-1/3"></div>
		<div class="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-[#ff9a9e] to-[#fecfef] rounded-full mix-blend-screen filter blur-[40px] opacity-40 -translate-x-1/3 translate-y-1/3"></div>
	</div>

	<div class="w-full max-w-md mx-auto p-4 flex flex-col gap-6 relative z-10 pt-16">
		
		<!-- ID Card / Profile Card -->
		<ArkheCard class="!p-8 flex flex-col items-center text-center shadow-2xl shadow-black/10 border-arkhe-white/50 backdrop-blur-xl bg-arkhe-white/90 rounded-[32px] relative mt-12">
			<div class="absolute -top-16 p-2 bg-arkhe-white rounded-full shadow-lg">
				<ArkheAvatar name={mockSiswa.nama} class="w-28 h-28 text-3xl shadow-inner border-4 border-arkhe-mist" />
			</div>
			
			<div class="mt-14 flex flex-col gap-1 items-center">
				<h1 class="font-display text-2xl font-bold text-arkhe-ink">{mockSiswa.nama}</h1>
				<div class="bg-arkhe-accent/10 text-arkhe-accent font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest mt-1">
					Siswa • {mockSiswa.kelas}
				</div>
			</div>

			<div class="w-full mt-6 flex flex-col gap-3">
				<div class="flex justify-between items-center py-2 border-b border-arkhe-line/50">
					<span class="text-xs font-bold text-arkhe-slate uppercase tracking-widest">NISN</span>
					<span class="font-mono font-bold text-arkhe-ink">{mockSiswa.nisn}</span>
				</div>
				<div class="flex justify-between items-center py-2 border-b border-arkhe-line/50">
					<span class="text-xs font-bold text-arkhe-slate uppercase tracking-widest">Sekolah</span>
					<span class="font-medium text-arkhe-ink text-sm">SMAN 2 Jonggol</span>
				</div>
			</div>
		</ArkheCard>

		<!-- Pengaturan -->
		<section class="mt-4">
			<SectionHeader eyebrow="Aplikasi" title="Pengaturan Umum" class="mb-3 px-2" />
			<div class="flex flex-col bg-arkhe-white rounded-[24px] border border-arkhe-line/60 overflow-hidden shadow-sm">
				<ThemeToggle class="border-b border-arkhe-line/60 py-4 px-5" />
				<button class="flex items-center justify-between p-5 border-b border-arkhe-line/60 hover:bg-arkhe-mist transition-colors group">
					<div class="flex items-center gap-3">
						<div class="w-8 h-8 rounded-full bg-arkhe-mist text-arkhe-slate flex items-center justify-center group-hover:bg-arkhe-ink group-hover:text-white transition-colors">
							<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
							</svg>
						</div>
						<span class="text-sm font-bold text-arkhe-ink">Ganti Password</span>
					</div>
					<svg class="w-4 h-4 text-arkhe-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
					</svg>
				</button>
				<button class="flex items-center justify-between p-5 hover:bg-arkhe-mist transition-colors group">
					<div class="flex items-center gap-3">
						<div class="w-8 h-8 rounded-full bg-arkhe-mist text-arkhe-slate flex items-center justify-center group-hover:bg-arkhe-ink group-hover:text-white transition-colors">
							<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
						</div>
						<span class="text-sm font-bold text-arkhe-ink">Panduan Absensi</span>
					</div>
					<svg class="w-4 h-4 text-arkhe-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</section>

		<!-- Logout -->
		<button 
			onclick={handleLogout}
			class="mt-6 w-full py-4 bg-arkhe-alpa/10 border-2 border-arkhe-alpa/20 text-arkhe-alpa rounded-[20px] font-bold shadow-sm hover:bg-arkhe-alpa hover:text-white transition-all flex justify-center items-center gap-2"
		>
			<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
			</svg>
			Keluar Aplikasi
		</button>
	</div>
</div>
