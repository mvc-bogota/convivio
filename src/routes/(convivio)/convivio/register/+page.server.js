import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals: { getSession } }) {
    const session = await getSession();

    // if the user is already logged in return them to the account page
    if (session) {
        throw redirect(303, '/convivio');
    }
}

export const actions = {
    default: async ({ request, url, locals: { supabase } }) => {
        const formData = await request.formData();
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const phoneNumber = formData.get('phone');
        const idType = formData.get('idType');
        const idNumber = formData.get('idNumber');

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phoneNumber,
                    id_type: idType,
                    id_number: idNumber,
                },
                emailRedirectTo: `${url.origin}/convivio/logging-in?redirect=/convivio`,
            },
        });

        if (error) {
            console.error(error);
            return fail(500, {
                success: false,
                error: error.message,
                firstName,
                lastName,
                email,
                phoneNumber,
                idType,
                idNumber,
            });
        }

        return {
            success: true,
            email,
        };
    },
};
