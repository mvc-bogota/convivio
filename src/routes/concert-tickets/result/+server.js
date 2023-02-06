import { error } from '@sveltejs/kit';
import { WOMPI_EVENT_KEY } from '$env/static/private';
import { validateEventAuthenticity } from '$lib/concert-tickets/wompi';
import { TicketPurchase, TicketPurchaseDAO } from '$lib/concert-tickets';
import db from '$lib/server/db';

async function POST({ request }) {
    const wompiEvent = await request.json();
    const isValid =
        (await validateEventAuthenticity(wompiEvent, WOMPI_EVENT_KEY)) &&
        wompiEvent.event === 'transaction.updated';

    if (!isValid) {
        throw error(403, 'Invalid event.');
    }

    const ticketPurchaseDao = new TicketPurchaseDAO(db);
    const ticketPurchase = await TicketPurchase.get(
        wompiEvent.data.transaction.reference,
        ticketPurchaseDao
    );
    ticketPurchase.addPayment(
        wompiEvent.data.transaction,
        wompiEvent.data.transaction.status,
        ticketPurchaseDao
    );

    return new Response('OK');
}

export { POST };
