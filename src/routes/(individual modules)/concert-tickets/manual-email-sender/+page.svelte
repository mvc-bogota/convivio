<script>
    import { enhance } from '$app/forms';
    import { legalIdTypes } from '$lib/concert-tickets';
</script>

<div class="header">
    <h1>Envía manualmente correos</h1>

    <div class="page-description">
        <p>Si nunca te llegó el correo con el código QR o necesitas que te lo reenvien, este formulario revisa las compras que hiciste con tu documento de identidad y te envía los correos correspondientes</p>
    </div>
</div>

<form method="POST" use:enhance>
    <div class="form-container">
        <div class="fields">
            <label for="legal-id-type">
                Tipo de documento de identidad
                <select name="legalIdType" id="legal-id-type" required>
                    <option value="" selected>Selecciona el tipo de documento</option>
                    {#each Object.entries(legalIdTypes) as [legalIdTypeKey, legalIdTypeValue]}
                        <option value={legalIdTypeKey}>{legalIdTypeValue}</option>
                    {/each}
                </select>
            </label>

            <label for="legal-id-number">
                Número de documento
                <input type="text" id="legal-id-number" name="legalIdNumber" required/>
            </label>
        </div>

        <button type="submit">ENVIAR CORREO CON CÓDIGO QR</button>
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
        background-color: var(--color-primary);
        padding: 20px 30px;
        color: white;
        border-radius: 10px;
        margin: 0px 15px;
    }

    .fields {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding-bottom: 30px;
    }

    label *{
        width: 100%;
    }
</style>