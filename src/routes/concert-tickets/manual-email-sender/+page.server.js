import { TicketPurchaseDAO } from '$lib/concert-tickets'
import db from '$lib/server/db.js';
import { sendConfirmationEmail } from '$lib/server/email-generation';

export const actions = {
    default: async ({ request }) => {
        const { legalIdType, legalIdNumber } =
            Object.fromEntries(await request.formData());

        const ticketPurchaseDao = new TicketPurchaseDAO(db)
        const ticketPurchases = await ticketPurchaseDao.getAllTicketPurchases()

        const currentCustomerTicketPurchases = ticketPurchases.filter((ticketPurchase) => {
            let ticketPurchaseData = ticketPurchase.data
            const idMatches = ticketPurchaseData.customer.legalIdType == legalIdType && ticketPurchaseData.customer.legalIdNumber == legalIdNumber
            let ticketPurchaseApproved = false
            if (ticketPurchaseData.payment != undefined) {
                ticketPurchaseApproved = ticketPurchaseData.payment.status == 'APPROVED'
            }
            return idMatches && ticketPurchaseApproved
        })

        currentCustomerTicketPurchases.forEach(async (currentCustomerTicketPurchase) => {
            let currentCustomerTicketPurchaseData = currentCustomerTicketPurchase.data
            let currentCustomerTicketPurchaseRef = currentCustomerTicketPurchase.ref.id

            await sendConfirmationEmail(
                currentCustomerTicketPurchaseData.payment.reference,
                currentCustomerTicketPurchaseData.customer.email,
                currentCustomerTicketPurchaseData.customer.name
            ).then(() => {
                if (currentCustomerTicketPurchaseData.status == 'APPROVED') {
                    ticketPurchaseDao.updateStatusUsingGivenDocumentId(currentCustomerTicketPurchaseRef, 'EMAIL_SENT')
                }
            })
        })
        
    }
  };