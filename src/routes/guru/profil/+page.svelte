<script lang="ts">
	import ArkheAvatar from '$lib/components/ArkheAvatar.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { showToast } from '$lib/stores/toast.svelte.js';

	const mockGuru = {
		nama: 'Budi Santoso, S.Pd',
		nip: '19800101 200501 1 002',
		jabatan: 'Wali Kelas XI.5',
		mapel: 'Matematika Peminatan'
	};

	function handleLogout() {
		showToast('Berhasil keluar.', 'info');
		setTimeout(() => {
			window.location.href = '/login';
		}, 1000);
	}
</script>

<svelte:head>
	<title>Profil Guru · ARKHE</title>
</svelte:head>

<div class="min-h-screen bg-arkhe-mist pb-24 relative overflow-hidden flex flex-col items-center">
	
	<!-- Premium Hero Background -->
	<div class="absolute top-0 inset-x-0 h-[320px] bg-[#0F0F0F] rounded-b-[40px] shadow-lg overflow-hidden z-0">
		<div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#818CF8] to-[#C084FC] rounded-full mix-blend-screen filter blur-[50px] opacity-30 translate-x-1/3 -translate-y-1/3"></div>
		<div class="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-[#38BDF8] to-[#818CF8] rounded-full mix-blend-screen filter blur-[40px] opacity-20 -translate-x-1/3 translate-y-1/3"></div>
	</div>

	<div class="w-full max-w-md mx-auto p-4 flex flex-col gap-6 relative z-10 pt-16">
		
		<!-- ID Card / Profile Card -->
		<div class="bg-arkhe-white/90 backdrop-blur-xl border border-arkhe-line/50 rounded-[32px] p-8 flex flex-col items-center text-center shadow-2xl shadow-black/10 relative mt-12">
			<div class="absolute -top-16 p-2 bg-arkhe-white rounded-full shadow-lg">
				<ArkheAvatar name={mockGuru.nama} class="w-28 h-28 text-3xl shadow-inner border-4 border-arkhe-mist" />
			</div>
			
			<div class="mt-14 flex flex-col items-center gap-1 w-full">
				<span class="px-3 py-1 bg-arkhe-accent/10 text-arkhe-accent rounded-full text-[10px] font-bold uppercase tracking-widest mb-1">{mockGuru.jabatan}</span>
				<h1 class="font-display text-2xl font-bold text-arkhe-ink">{mockGuru.nama}</h1>
				<p class="text-arkhe-slate text-sm font-medium">{mockGuru.mapel}</p>
			</div>
		</div>

		<!-- Informasi Kepegawaian -->
		<section class="mt-4">
			<SectionHeader eyebrow="Detail" title="Data Pegawai" class="mb-3 px-1" />
			<div class="bg-arkhe-white rounded-[24px] border border-arkhe-line/50 overflow-hidden shadow-sm flex flex-col">
				<div class="flex items-center justify-between p-5 border-b border-arkhe-line/50">
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-full bg-arkhe-mist flex items-center justify-center text-arkhe-slate">
							<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
						</div>
						<div class="flex flex-col">
							<span class="text-[10px] uppercase font-bold text-arkhe-slate tracking-widest">NIP / NUPTK</span>
							<span class="font-mono text-sm font-bold text-arkhe-ink mt-0.5">{mockGuru.nip}</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Pengaturan -->
		<section>
			<SectionHeader eyebrow="Sistem" title="Pengaturan Akun" class="mb-3 px-1" />
			<div class="bg-arkhe-white rounded-[24px] border border-arkhe-line/50 overflow-hidden shadow-sm flex flex-col">
				<ThemeToggle class="border-b border-arkhe-line/50 p-5" />
				<button class="flex items-center justify-between p-5 hover:bg-arkhe-mist/50 transition-colors group">
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-full bg-arkhe-mist flex items-center justify-center text-arkhe-slate group-hover:bg-arkhe-ink group-hover:text-white transition-colors">
							<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
							</svg>
						</div>
						<span class="text-sm font-bold text-arkhe-ink">Ganti Kata Sandi</span>
					</div>
					<svg class="w-5 h-5 text-arkhe-slate group-hover:text-arkhe-ink transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</section>

		<!-- Logout -->
		<button 
			onclick={handleLogout}
			class="mt-6 w-full py-4 bg-arkhe-alpa/10 border-2 border-transparent text-arkhe-alpa rounded-[20px] font-bold shadow-sm hover:border-arkhe-alpa/30 hover:bg-arkhe-alpa/20 transition-all flex justify-center items-center gap-2 group"
		>
			<svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
			</svg>
			Keluar Sesi
		</button>
	</div>
</div>
