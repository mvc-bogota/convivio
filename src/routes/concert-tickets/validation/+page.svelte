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
        <th>Cantidad de boletas</th>
        <td>{data.ticketsQuantity}</td>
    </tr>
    <tr>
        <th>Nombre del comprador</th>
        <td>{data.customerName}</td>
    </tr>
    <tr>
        <th>Correo registrado del comprador</th>
        <td>{data.customerEmail}</td>
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
