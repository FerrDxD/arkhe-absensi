<script lang="ts">
	export type ColorType = 'hadir' | 'sakit' | 'izin' | 'alpa' | 'ink';

	let {
		title,
		value,
		colorType = 'ink',
		class: className = ''
	}: {
		title: string;
		value: string | number;
		colorType?: ColorType;
		class?: string;
	} = $props();

	const textColors: Record<ColorType, string> = {
		hadir: 'text-arkhe-hadir',
		sakit: 'text-arkhe-sakit',
		izin: 'text-arkhe-izin',
		alpa: 'text-arkhe-alpa',
		ink: 'text-arkhe-ink'
	};
</script>

<div
	class="bg-arkhe-white border border-arkhe-line rounded-[10px] p-4 flex flex-col justify-center items-start shadow-[0_1px_3px_rgba(0,0,0,0.06)] {className}"
>
	<span class="text-arkhe-slate text-sm font-medium">{title}</span>
	<span class="font-display text-3xl font-semibold mt-1 {textColors[colorType]}">
		{value}
	</span>
</div>
