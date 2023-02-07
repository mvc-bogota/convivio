const concertEvent = {
    name: 'Concierto Convivio',
    pricePerTicketInCents: 2000000,
    ticketCurrency: 'COP',
    calculatePriceInCents(quantity) {
        return this.pricePerTicketInCents * (quantity - Math.floor(quantity / 5));
    },
};

const legalIdTypes = {
    CC: 'Cédula de ciudadanía',
    CE: 'Cédula de extranjería',
    TI: 'Tarjeta de identidad',
    PP: 'Pasaporte',
    NIT: 'Número de identificación tributaria',
    DNI: 'Documento nacional de identidad',
    RG: 'Registro civil',
    OTHER: 'Otro',
};

class TicketPurchase {
    constructor({
        quantity,
        name,
        email,
        phone,
        legalIdType,
        legalIdNumber,
        payment = null,
        status = 'pending',
    }) {
        this.status = status;
        this.quantity = parseInt(quantity, 10);
        this.customer = { name, email, phone, legalIdType, legalIdNumber };
        this.event = concertEvent;
        this.payment = payment;
    }

    calculatePriceInCents() {
        return this.event.calculatePriceInCents(this.quantity);
    }

    async save(ticketPurchaseDao) {
        const result = await ticketPurchaseDao.createTicketPurchase({
            status: this.status,
            quantity: this.quantity,
            customer: this.customer,
            event: {
                name: this.event.name,
                pricePerTicketInCents: this.event.pricePerTicketInCents,
                ticketCurrency: this.event.ticketCurrency,
            },
        });
        this.ref = result.ref.id;
        return result;
    }

    async addPayment(payment, paymentStatus, ticketPurchaseDao) {
        if (this.status !== 'pending') {
            throw new Error('Ticket purchase is not pending');
        }
        this.payment = payment;
        this.status = paymentStatus;
        return await ticketPurchaseDao.updateTicketPurchase(this.ref, {
            payment,
            status: this.status,
        });
    }

    static async get(ref, ticketPurchaseDao) {
        const result = await ticketPurchaseDao.getTicketPurchase(ref);
        console.debug('RESULT', result);
        const ticketPurchase = new TicketPurchase(result.data);
        ticketPurchase.ref = result.ref.id;
        return ticketPurchase;
    }
}

class TicketPurchaseDAO {
    constructor(db) {
        this.db = db;
        this.tableName = 'ConcertTickets';
    }

    async createTicketPurchase(data) {
        return await this.db.put({ tableName: this.tableName, data });
    }

    async updateTicketPurchase(ref, data) {
        return await this.db.update({
            tableName: this.tableName,
            ref,
            data,
        });
    }

    async getTicketPurchase(ref) {
        return await this.db.get({ tableName: this.tableName, ref });
    }
}

export { concertEvent, legalIdTypes, TicketPurchase, TicketPurchaseDAO };
