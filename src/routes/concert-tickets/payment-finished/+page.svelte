<script>
    export let data;
    const { reference, status } = data.payment;
</script>

<h1>Hiciste un pago</h1>

{#if status === 'APPROVED'}
    <p>
        ¡Tu pago fue aprobado! Muy pronto nos pondremos en contacto contigo con la información de
        tus entradas para el concierto Convivio.
    </p>
{:else if status === 'DECLINED'}
    <p>
        Lastimosamente tu pago fue rechazado. Puedes volver a intentar
        <a href="/concert-tickets">aquí</a>
    </p>
{:else}
    <p>
        Tu transacción está pendiente. Muy pronto sabremos el estado de tu pago y nos pondremos en
        contacto contigo con más información sobre tus entradas para el concierto Convivio
    </p>
{/if}

<p>
    El número de referencia de tu transacción es: <strong>{reference}</strong>. Si tienes alguna
    duda, puedes contactarte con nosotros.
</p>
<p>
    <a href="/concert-tickets">Volver al inicio</a>
</p>
