<script>
    export let data;
</script>

<h1>Datos de la compra:</h1>
<table>
    <tr>
        <th>Transacción #</th>
        <td>{data.purchaseId}</td>
    </tr>
    <tr>
        <th>Estado de la compra</th>
        {#if data.purchaseStatus == 'APPROVED'}
            <td>APROBADA (No se envió correo)</td>
        {:else if data.purchaseStatus == 'EMAIL_SENT'}
            <td>APROBADA Y CORREO ENVIADO</td>
        {:else if data.purchaseStatus == 'PENDING'}
            <td>PENDIENTE</td>
        {:else if data.purchaseStatus == 'DECLINED'}
            <td>DECLINADA</td>
        {:else}
            <td />
        {/if}
    </tr>
    <tr>
        <th>Cantidad de boletas</th>
        <td>{data.ticketsQuantity}</td>
    </tr>
    <tr>
        <th>Nombre del comprador</th>
        <td>{data.customerName}</td>
    </tr>
</table>

<style>
    h1 {
        background-color: var(--color-quaternary);
        color: var(--color-neutral-light);
        text-align: center;
    }

    table {
        border: 3px solid var(--color-secondary);
    }

    tr {
        border: 1px solid var(--color-secondary);
    }

    th {
        font-family: var(--ff-secondary);
    }
</style>
