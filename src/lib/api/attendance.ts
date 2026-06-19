import { MOCK_MODE, mockSiswa } from '$lib/mock';

export async function getStatusHariIni(siswaId: string) {
	if (MOCK_MODE) {
		return Promise.resolve(mockSiswa);
	}
	const response = await fetch(`/api/attendance/today/${siswaId}`);
	return response.json();
}
