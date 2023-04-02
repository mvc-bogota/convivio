import { error, redirect } from '@sveltejs/kit';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/convivio');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`first_name, last_name, email, phone_number, id_type, id_number`)
		.eq('id', session.user.id)
		.single();

	return { session, profile };
});

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName');
		const lastName = formData.get('lastName');
		const email = formData.get('email');
		const phoneNumber = formData.get('phoneNumber');
		const idType = formData.get('idType');
		const idNumber = formData.get('idNumber');

		const session = await getSession();

		const { error: profileError } = await supabase.from('profiles').upsert({
			id: session?.user.id,
			first_name: firstName,
			last_name: lastName,
			email: email,
			phone_number: phoneNumber,
			id_type: idType,
			id_number: idNumber,
			updated_at: new Date()
		});

		if (profileError) {
			return error(500, {
				firstName,
				lastName,
				email,
				phoneNumber,
				idType,
				idNumber
			});
		}

		return {
			firstName,
			lastName,
			email,
			phoneNumber,
			idType,
			idNumber
		};
	},
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/convivio');
		}
	}
};
