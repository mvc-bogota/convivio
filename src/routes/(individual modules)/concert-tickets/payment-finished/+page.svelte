<script>
    export let data;
    const { reference, status } = data.payment;
</script>

<div class="wrapper">
    <h1>¡Hiciste un pago!</h1>

    <div class="message-block">
        {#if status === 'APPROVED'}
            <p>
                ¡Tu pago fue <strong style="color: green;">aprobado</strong>! A tu correo debería
                llegar pronto el código QR que tienes que mostrar el día del concierto. Asegúrate de
                revisar tu bandeja de Spam/Promociones si no encuentras el correo.
            </p>
        {:else if status === 'DECLINED'}
            <p>
                Lastimosamente tu pago fue <strong style="color: red;">rechazado</strong>. Puedes
                volver a intentar la compra de tus entradas
                <a href="/concert-tickets">aquí</a>
            </p>
        {:else}
            <p>
                Tu transacción está <strong>pendiente</strong>.
            </p>
            <p>
                Tan pronto confirmemos la aprobación de tu compra, a tu correo debería llegar el
                código QR que tienes que mostrar el día del concierto. Asegúrate de revisar tu
                bandeja de Spam/Promociones si no encuentras el correo.
            </p>
            <p>Si tu transacción es rechazada, vuelve a intentar la compra de tu boleta.</p>
        {/if}
        <p>
            El número de referencia de esta transacción es: <strong>{reference}</strong>
        </p>
    </div>

    <p>
        Si tienes alguna duda, puedes contactarte con nosotros al siguiente correo: <a
            href="mailto:noticiasmvcbog@gmail.com">noticiasmvcbog@gmail.com</a
        >
    </p>
    <p>
        <a href="/concert-tickets">Volver a la compra de entradas</a>
    </p>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
    }

    .message-block {
        border-left: 10px solid #ccc;
        background-color: #f9f9f9;
        padding: 10px 30px;
    }
</style>
