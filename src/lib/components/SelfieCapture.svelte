<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	
	let { onCapture, minBrightness = 40, containerClass = "relative w-full aspect-[3/4] bg-arkhe-mist rounded-xl overflow-hidden border" } = $props<{
		onCapture: (blob: Blob) => void;
		minBrightness?: number;
		containerClass?: string;
	}>();

	let videoElement: HTMLVideoElement;
	let canvasElement: HTMLCanvasElement;
	let stream: MediaStream | null = null;
	
	let capturedImage = $state<string | null>(null);
	let errorMsg = $state<string | null>(null);
	let brightnessWarning = $state(false);

	onMount(async () => {
		await startCamera();
	});

	onDestroy(() => {
		stopCamera();
	});

	async function startCamera() {
		try {
			stream = await navigator.mediaDevices.getUserMedia({ 
				video: { facingMode: 'user' } 
			});
			if (videoElement) {
				videoElement.srcObject = stream;
			}
			errorMsg = null;
		} catch (err: any) {
			console.error("Kamera ditolak:", err);
			errorMsg = "Akses kamera ditolak. Aktifkan izin kamera untuk presensi.";
		}
	}

	function stopCamera() {
		if (stream) {
			stream.getTracks().forEach(track => track.stop());
			stream = null;
		}
	}

	function getBrightness(context: CanvasRenderingContext2D, width: number, height: number): number {
		const imageData = context.getImageData(0, 0, width, height);
		const data = imageData.data;
		let r, g, b, avg;
		let colorSum = 0;

		for (let x = 0, len = data.length; x < len; x += 4) {
			r = data[x];
			g = data[x + 1];
			b = data[x + 2];
			avg = Math.floor((r + g + b) / 3);
			colorSum += avg;
		}

		return Math.floor(colorSum / (width * height));
	}

	function handleCapture() {
		if (!videoElement || !canvasElement) return;

		const width = videoElement.videoWidth;
		const height = videoElement.videoHeight;
		
		canvasElement.width = width;
		canvasElement.height = height;
		
		const ctx = canvasElement.getContext('2d');
		if (!ctx) return;

		ctx.drawImage(videoElement, 0, 0, width, height);
		
		// Check brightness
		const brightness = getBrightness(ctx, width, height);
		brightnessWarning = brightness < minBrightness;

		capturedImage = canvasElement.toDataURL('image/jpeg', 0.8);
		
		canvasElement.toBlob((blob) => {
			if (blob) {
				onCapture(blob);
			}
		}, 'image/jpeg', 0.8);
	}

	function handleRetake() {
		capturedImage = null;
		brightnessWarning = false;
	}
</script>

<div class="flex flex-col gap-3">
	{#if errorMsg}
		<div class="bg-arkhe-alpa/10 border border-arkhe-alpa/20 text-arkhe-alpa p-4 rounded-xl flex flex-col items-center justify-center text-center">
			<svg class="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
			</svg>
			<p class="text-sm font-medium">{errorMsg}</p>
			<button 
				type="button" 
				class="mt-3 bg-arkhe-white px-4 py-2 rounded-lg text-sm text-arkhe-ink shadow-sm border border-arkhe-line"
				onclick={startCamera}
			>
				Coba lagi
			</button>
		</div>
	{:else}
		<div class="{containerClass} {capturedImage ? 'border-arkhe-hadir' : 'border-arkhe-line/50'}">
			<!-- Tampilan Hasil Foto (Hidden if not captured) -->
			{#if capturedImage}
				<img src={capturedImage} alt="Selfie" class="w-full h-full object-cover absolute inset-0 z-20" />
				
				<!-- Badge Sukses -->
				<div class="absolute bottom-4 left-4 z-30 bg-arkhe-hadir text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
					<svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
					</svg>
					Terekam
				</div>
				
				<!-- Tombol Ulangi -->
				<button 
					type="button"
					class="absolute bottom-4 right-4 z-30 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-black/70 transition-colors"
					onclick={handleRetake}
				>
					<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
					</svg>
					Ulangi
				</button>
			{/if}

			<!-- Tampilan Live Kamera (Always mounted, hidden under image if captured) -->
			<video 
				bind:this={videoElement} 
				autoplay 
				playsinline 
				muted 
				class="w-full h-full object-cover transform scale-x-[-1] absolute inset-0 z-10 {capturedImage ? 'opacity-0' : 'opacity-100'}"
			></video>

			<!-- Area Tombol Shutter (Hidden if captured) -->
			{#if !capturedImage}
				<div class="absolute bottom-6 inset-x-0 flex justify-center z-30">
					<button 
						type="button"
						class="w-16 h-16 rounded-full border-4 border-white/80 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 hover:scale-105 active:scale-95 transition-all shadow-xl"
						onclick={handleCapture}
						aria-label="Ambil foto selfie"
					>
						<div class="w-12 h-12 bg-white rounded-full"></div>
					</button>
				</div>
			{/if}
			
			<canvas bind:this={canvasElement} class="hidden"></canvas>
		</div>

		{#if brightnessWarning}
			<div class="text-xs text-arkhe-izin font-medium flex items-center justify-center gap-1.5 mt-1">
				<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
				Pencahayaan foto gelap. Coba cari tempat lebih terang.
			</div>
		{/if}
	{/if}
</div>
