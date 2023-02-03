import { redirect } from '@sveltejs/kit';
import { WOMPI_INTEGRITY_KEY } from '$env/static/private';
import { PUBLIC_WOMPI_COMMERCE_KEY, PUBLIC_BASE_URL } from '$env/static/public';

import { TicketPurchase, TicketPurchaseDAO } from '$lib/concert-tickets';
import { getPaymentURL } from '$lib/concert-tickets/wompi';
import db from '$lib/server/db';

const actions = {
    default: async ({ request }) => {
        const { fullName, email, phoneNumber, legalIdType, legalIdNumber, ticketQuantity } =
            Object.fromEntries(await request.formData());
        const ticketPurchase = new TicketPurchase({
            quantity: ticketQuantity,
            name: fullName,
            email,
            phone: phoneNumber,
            legalIdType,
            legalIdNumber,
        });

        await ticketPurchase.save(new TicketPurchaseDAO(db));

        const paymentURL = await getPaymentURL({
            publicKey: PUBLIC_WOMPI_COMMERCE_KEY,
            amountInCents: ticketPurchase.calculatePriceInCents(),
            reference: ticketPurchase.ref,
            name: fullName,
            email,
            phone: phoneNumber,
            legalIdType,
            legalIdNumber,
            integrityKey: WOMPI_INTEGRITY_KEY,
            redirectURL: `${PUBLIC_BASE_URL}/concert-tickets/payment-success`,
        });

        throw redirect(303, paymentURL);
    },
};

export { actions };
