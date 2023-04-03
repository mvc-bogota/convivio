import { error } from '@sveltejs/kit';
import { WOMPI_EVENT_KEY } from '$env/static/private';
import { validateEventAuthenticity } from '$lib/concert-tickets/wompi';
import { TicketPurchase, TicketPurchaseDAO } from '$lib/concert-tickets';
import { sendConfirmationEmail } from '$lib/server/email-generation';
import db from '$lib/server/db';

async function POST({ request }) {
    const wompiEvent = await request.json();
    console.info('WOMPI EVENT', wompiEvent);
    const isValid =
        (await validateEventAuthenticity(wompiEvent, WOMPI_EVENT_KEY)) &&
        wompiEvent.event === 'transaction.updated';

    if (!isValid) {
        throw error(403, 'Invalid event.');
    }

    const ticketPurchaseDao = new TicketPurchaseDAO(db);
    const wompiTransactionReference = wompiEvent.data.transaction.reference;
    const wompiTransactionStatus = wompiEvent.data.transaction.status;
    console.info('WOMPI TRANSACTION REFERENCE', wompiTransactionReference);
    const ticketPurchase = await TicketPurchase.get(wompiTransactionReference, ticketPurchaseDao);
    await ticketPurchase.addPayment(
        wompiEvent.data.transaction,
        wompiTransactionStatus,
        ticketPurchaseDao
    );
    console.info('TICKET PURCHASE', ticketPurchase);

    if (ticketPurchase.customer.email != undefined && wompiTransactionStatus == 'APPROVED') {
        await sendConfirmationEmail(
            ticketPurchase.ref,
            ticketPurchase.customer.email,
            ticketPurchase.customer.name
        ).then(() => {
            ticketPurchase.updateStatus('EMAIL_SENT', ticketPurchaseDao);
        });
    }

    return new Response('OK');
}

export { POST };
