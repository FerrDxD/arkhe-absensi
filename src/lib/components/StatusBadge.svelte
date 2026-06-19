<script lang="ts">
	export type StatusType = 'hadir' | 'sakit' | 'izin' | 'alpa' | 'block';
	
	let {
		status,
		class: className = '',
		showTime = null
	}: {
		status: StatusType;
		class?: string;
		showTime?: string | null;
	} = $props();

	const labels: Record<StatusType, string> = {
		hadir: 'Hadir',
		sakit: 'Sakit',
		izin: 'Izin',
		alpa: 'Alpa',
		block: 'Diblokir'
	};

	const colors: Record<StatusType, { bg: string; text: string }> = {
		hadir: { bg: 'bg-arkhe-hadir/10', text: 'text-arkhe-hadir' },
		sakit: { bg: 'bg-arkhe-sakit/10', text: 'text-arkhe-sakit' },
		izin: { bg: 'bg-arkhe-izin/10', text: 'text-arkhe-izin' },
		alpa: { bg: 'bg-arkhe-alpa/10', text: 'text-arkhe-alpa' },
		block: { bg: 'bg-arkhe-block/10', text: 'text-arkhe-block' }
	};
</script>

<span
	class="inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-medium rounded-full {colors[
		status
	].bg} {colors[status].text} {className}"
>
	{labels[status]}{showTime ? ` · ${showTime}` : ''}
</span>
