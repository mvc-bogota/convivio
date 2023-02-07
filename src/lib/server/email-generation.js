import { SENDGRID_API_KEY } from '$env/static/private';
import { generateQR } from './qr-generation';
import client from '@sendgrid/mail';

const verifiedSenderEmail = 'noticiasmvcbog@gmail.com';
const confirmationEmailTemplateId = 'd-b81cb950599f4e7aa9b003cbfe098b5b';

export const sendConfirmationEmail = function (databaseEntityId, recipientsEmail, fullName) {
    client.setApiKey(SENDGRID_API_KEY);

    const message = {
        from: {
            email: verifiedSenderEmail,
        },
        personalizations: [
            {
                to: [
                    {
                        email: recipientsEmail,
                    },
                ],
                dynamic_template_data: {
                    full_name: fullName,
                    qr_code_url: generateQR(databaseEntityId),
                },
            },
        ],
        template_id: confirmationEmailTemplateId,
    };

    return client
        .send(message)
        .then(() => console.log(`Mail sent succesfully to ${recipientsEmail}`))
        .catch((err) => console.error(err));
};
