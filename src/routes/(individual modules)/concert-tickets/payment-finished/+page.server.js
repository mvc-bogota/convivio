import { PUBLIC_WOMPI_API_URL } from '$env/static/public';

async function load({ url, fetch }) {
    const paymentId = url.searchParams.get('id');

    const response = await fetch(`${PUBLIC_WOMPI_API_URL}/transactions/${paymentId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    return {
        payment: data.data,
    };
}

export { load };
