<script>
    import { concertEvent, legalIdTypes } from '$lib/concert-tickets';

    let colombiaNumberFormat = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        currencyDisplay: 'code',
        minimumFractionDigits: 0,
    });
</script>

<h1>Compra tu boleta para el concierto convivio</h1>

<form method="POST">
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

    <button type="submit">Pagar con Wompi</button>
</form>
