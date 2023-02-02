const singleTicketPrice = 20000;

const calcStandardPrice = function () {
    return singleTicketPrice * this.quantity;
};

const calcSpecialPrice = function () {
    return singleTicketPrice * (this.quantity - 1);
};

const ticketsOptions = {
    one_ticket: {
        quantity: 1,
        price: calcStandardPrice,
    },
    two_tickets: {
        quantity: 2,
        price: calcStandardPrice,
    },
    three_tickets: {
        quantity: 3,
        price: calcStandardPrice,
    },
    four_tickets: {
        quantity: 4,
        price: calcStandardPrice,
    },
    five_tickets: {
        quantity: 5,
        price: calcSpecialPrice,
    },
};

export { ticketsOptions };
