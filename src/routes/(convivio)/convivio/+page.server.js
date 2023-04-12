import { fail, redirect } from '@sveltejs/kit';
import {v4 as uuidv4} from 'uuid';
import { getPaymentURL } from '$lib/concert-tickets/wompi';
import { WOMPI_INTEGRITY_KEY } from '$env/static/private';
import { 
    PUBLIC_WOMPI_COMMERCE_KEY, 
    PUBLIC_BASE_URL,
    PUBLIC_SUPABASE_EVENTS_MANAGER_URL,
    PUBLIC_SUPABASE_EVENTS_MANAGER_ANON_KEY
} from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

const ticketValue = 200000;
const ticketValueInCents = ticketValue * 100;

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
        throw redirect(303, '/convivio/register');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name, email, phone_number, id_number, id_type, registration_filled, payment_completed')
        .eq('id', session.user.id)
        .single();

    return { profile };
};

export const actions = {
    update: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const school = formData.get('school');
        const grade = formData.get('grade');
        const birthDate = formData.get('birthDate');
        const parentName = formData.get('parentName');
        const parentPhone = formData.get('parentPhone');
        const parentEmail = formData.get('parentEmail');
        const authorization = formData.get('authorization');
        const bus = formData.get('bus');
        const busStop = formData.get('busStop');
        const eps = formData.get('eps');

        const session = await getSession();

        const { error: profileError } = await supabase.from('profiles').upsert({
            id: session?.user.id,
            school,
            grade,
            birth_date: birthDate,
            parent_name: parentName,
            parent_phone: parentPhone,
            parent_email: parentEmail,
            needs_bus: bus,
            bus_stop: busStop,
            eps,
            registration_filled: true,
        });

        if (profileError) {
            return fail(500, {
                success: false,
                error: 'Hubo un error al actualizar el perfil. Por favor, inténtalo de nuevo.',
            });
        }

        if (authorization) {
            const suffix = authorization.name.split('.').pop();

            const { error: authorizationError } = await supabase.storage
                .from('authorizations')
                .upload(`${session?.user.id}.${suffix}`, authorization);

            if (authorizationError) {
                return fail(500, {
                    success: false,
                    error: 'Hubo un error al subir el archivo de autorización. Por favor, inténtalo de nuevo.',
                });
            }
        }

        return {
            success: true,
        };
    },
    signout: async ({ locals: { supabase, getSession } }) => {
        const session = await getSession();
        if (session) {
            await supabase.auth.signOut();
            throw redirect(303, '/convivio/sign-in');
        }
    },
    pay: async ({ request}) => {

        const { fullName, email, phoneNumber, legalIdType, legalIdNumber } =
            Object.fromEntries(await request.formData());

        const eventId = 'CONVIVIO';
        const paymentId = `${eventId}_${uuidv4()}`;

        const supabaseForEventsManager = createClient(PUBLIC_SUPABASE_EVENTS_MANAGER_URL, PUBLIC_SUPABASE_EVENTS_MANAGER_ANON_KEY);

        const { error: paymentError } = await supabaseForEventsManager
        .from('payments')
        .insert({
            id: paymentId,
            event_identifier: eventId,
            client_info: {
                full_name: fullName,
                email: email,
                phone_number: phoneNumber,
                legal_id_type: legalIdType,
                legal_id_number: legalIdNumber
            }
        });

        if (paymentError) {
            console.log(paymentError);
            return fail(500, {
                success: false,
                error: 'Hubo un error al crear el pago en nuestra base de datos. Por favor, inténtalo de nuevo.',
            });
        }

        const paymentURL = await getPaymentURL({
            publicKey: PUBLIC_WOMPI_COMMERCE_KEY,
            amountInCents: ticketValueInCents,
            reference: paymentId,
            name: fullName,
            email,
            phone: phoneNumber,
            legalIdType,
            legalIdNumber,
            integrityKey: WOMPI_INTEGRITY_KEY,
            redirectURL: `${PUBLIC_BASE_URL}/convivio`,
        });

        throw redirect(303, paymentURL);
    },
};
