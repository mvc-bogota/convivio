async function checksum({ ref, amount, currency, integrity_key }) {
    const concat = ref + amount + currency + integrity_key;
    const encoded = new TextEncoder().encode(concat);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function getPaymentURL({
    publicKey,
    amountInCents,
    reference,
    name,
    email,
    phone,
    legalIdType,
    legalIdNumber,
    currency = 'COP',
    integrityKey = null,
    redirectURL = null,
}) {
    const integrity = integrityKey
        ? `&signature:integrity=${await checksum({
              ref: reference,
              amount: amountInCents,
              currency,
              integrity_key: integrityKey,
          })}`
        : '';
    const redirect = redirectURL ? `&redirect-url=${redirectURL}` : '';
    const url = `https://checkout.wompi.co/p/?public-key=${publicKey}&amount-in-cents=${amountInCents}&reference=${reference}&currency=${currency}&customer-data:email=${email}&customer-data:phone-number=${phone}&customer-data:full-name=${name}&customer-data:legal-id-type=${legalIdType}&customer-data:legal-id=${legalIdNumber}${integrity}${redirect}`;
    return url;
}

export { getPaymentURL };
