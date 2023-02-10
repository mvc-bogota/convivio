<script>
    import { concertEvent, legalIdTypes } from '$lib/concert-tickets';

    let colombiaNumberFormat = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        currencyDisplay: 'code',
        minimumFractionDigits: 0,
    });
</script>

<div class="header">
    <h1>¡Compra tus entradas para el Concierto Convivio!</h1>

    <div class="page-description">
        <p>Cada entrada tiene un costo de $20.000 pesos</p>
        <p>¡Si compras 5 entradas, te quedan al precio de 4!</p>
    </div>
</div>


<form method="POST">
    <div class="form-container">
        <div class="fields">
            <label for="full-name">Nombre Completo</label>
            <input type="text" id="full-name" name="fullName" value="" required />

            <label for="email">Correo</label>
            <input type="email" id="email" name="email" value="" required />

            <label for="phone"> Teléfono</label>
            <input type="tel" id="phone" name="phoneNumber" value="" />

            <label for="legal-id-type">Tipo de documento de identidad</label>
            <select name="legalIdType" id="legal-id-type" required>
                <option value="" selected>Selecciona el tipo de documento</option>
                {#each Object.entries(legalIdTypes) as [legalIdTypeKey, legalIdTypeValue]}
                    <option value={legalIdTypeKey}>{legalIdTypeValue}</option>
                {/each}
            </select>

            <label for="legal-id-number">Número de documento</label>
            <input type="text" id="legal-id-number" name="legalIdNumber" />

            <label for="ticket-quantity">¿Cuántas boletas quieres?</label>
            <select name="ticketQuantity" id="ticket-quantity" required>
                <option value="" selected>Selecciona la cantidad de boletas</option>
                {#each Array(5) as _, index}
                    <option value={index + 1}
                        >{index + 1} ({colombiaNumberFormat.format(
                            concertEvent.calculatePriceInCents(index + 1) / 100
                        )})</option
                    >
                {/each}
            </select>
        </div>

        <button type="submit">Pagar con Wompi</button>
    </div>
</form>

<style>
    .header {
        margin-left: 20px;
        margin-right: 20px;
    }

    h1 {
        text-align: center;
    }

    .page-description {
        margin-bottom: 30px;
    }

    p {
        text-align: center;
        font-size: 20px;
        margin: 0px;
    }

    .form-container {
        display: flex;
        flex-direction: column;
        background-color: #506481;
        padding: 20px 30px;
        color: white;
        border-radius: 10px;
        margin: 0px 30px;
    }

    .fields {
        display: flex;
        flex-direction: column;
        padding-bottom: 30px;
    }

</style>