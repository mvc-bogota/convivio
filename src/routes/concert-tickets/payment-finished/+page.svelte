<script>
    export let data;
    const { reference, status } = data.payment;
</script>

<div class="wrapper">
    <h1>¡Hiciste un pago!</h1>

    {#if status === 'APPROVED'}
        <p>
            ¡Tu pago fue <strong>aprobado</strong>! A tu correo debería llegar pronto el código QR que tienes que mostrar
            el día del concierto. Asegúrate de revisar tu bandeja de Spam/Social si no encuentras el correo.
        </p>
    {:else if status === 'DECLINED'}
        <p>
            Lastimosamente tu pago fue <strong>rechazado</strong>. Puedes volver a intentar
            <a href="/concert-tickets">aquí</a>
        </p>
    {:else}
        <p>
            Tu transacción está <strong>pendiente</strong>. Tan pronto como confirmemos si tu transacción fue aprobada, a tu correo debería llegar 
            el código QR que tienes que mostrar el día del concierto. Asegúrate de revisar tu bandeja de Spam/Social si no encuentras el correo.

            Si tu transacción es rechazada, vuelve a intentar la compra de tu boleta.
        </p>
    {/if}

    <p>
        El número de referencia de esta transacción es: <strong>{reference}</strong>. Si tienes alguna
        duda, puedes contactarte con nosotros al siguiente correo: <a href="mailto:noticiasmvcbog@gmail.com">noticiasmvcbog@gmail.com</a>
    </p>
    <p>
        <a href="/concert-tickets">Volver al inicio</a>
    </p>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        text-align: center;
    }
</style>
