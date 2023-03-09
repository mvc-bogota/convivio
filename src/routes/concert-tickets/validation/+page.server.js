import { TicketPurchaseDAO, TicketPurchase } from '$lib/concert-tickets';
import db from '$lib/server/db.js';

async function load({ url }) {
    const entityId = url.searchParams.get('id')
    const ticketPurchaseDao = new TicketPurchaseDAO(db)
    const ticketPurchase = await TicketPurchase.get(
        entityId,
        ticketPurchaseDao
    );
    return {
        purchaseId: ticketPurchase.ref,
        ticketsQuantity: ticketPurchase.quantity,
        customerEmail: ticketPurchase.customer.email,
        customerName: ticketPurchase.customer.name,
    };
}

export { load };
