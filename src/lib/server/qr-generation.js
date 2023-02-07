import { PUBLIC_BASE_URL } from '$env/static/public';

export const generateQR = function (databaseEntityId) {
    let redirectURL = `${PUBLIC_BASE_URL}/concert-tickets/validation?id=${databaseEntityId}`;
    return redirectURL;
};
