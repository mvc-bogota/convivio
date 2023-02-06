function load({ url }) {
    return {
        entityId: url.searchParams.get('id'),
    };
}

export { load };
