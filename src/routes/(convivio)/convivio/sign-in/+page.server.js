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
        const email = formData.get('email');

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${url.origin}/convivio/logging-in?redirect=/convivio`,
                shouldCreateUser: false,
            },
        });

        if (error) {
            console.error(error);
            return fail(500, {
                success: false,
                error: error.message,
                email,
            });
        }

        return {
            success: true,
            email,
        };
    },
};
