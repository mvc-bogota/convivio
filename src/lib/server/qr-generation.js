import { PUBLIC_BASE_URL } from '$env/static/public';

export const generateQrUrl = function (databaseEntityId) {
    const qrApiUrl = 'https://api.qrserver.com/v1/create-qr-code/?data=';
    const redirectUrl= `${PUBLIC_BASE_URL}/concert-tickets/validation?id=${databaseEntityId}`;

    const completeUrl = qrApiUrl + encodeURI(redirectUrl);
    return completeUrl;
};
