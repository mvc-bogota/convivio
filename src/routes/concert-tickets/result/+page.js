function load({ url }) {
    return {
        paymentId: url.searchParams.get('id'),
    };
}

export { load };
