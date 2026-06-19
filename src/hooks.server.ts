import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Placeholder untuk route protection
	// const session = await getSession(event);
	const session = true; // Set to true to allow access during development
	
	if (event.url.pathname === '/') {
		throw redirect(303, '/login');
	}
	
	if (!session && event.url.pathname !== '/login') {
		throw redirect(303, '/login');
	}

	return resolve(event);
};
