<script>
    import { enhance } from '$app/forms';

    export let form;
    let loading = false;

    function handleSubmit() {
        loading = true;
        return async ({ update }) => {
            loading = false;
            update();
        };
    }
</script>

<h1>Pre-inscripción a Convivio</h1>

{#if form?.success}
    <div class="alert success">
        <h2>¡Gracias por inscribirte!</h2>
        <p>
            Te hemos enviado un correo electrónico con los detalles de tu inscripción a {form.email}.
        </p>
        <p>Ya puedes cerrar está página.</p>
    </div>
{:else}
    {#if !form?.success && form?.error}
        <div class="alert error">
            <h2>¡Ups!</h2>
            <p>
                Ha ocurrido un error al intentar inscribirte. Por favor, intenta de nuevo o ponte en
                contacto con nosotros.
            </p>
        </div>
    {/if}
    <div class="form-widget">
        <form class="form-widget" method="post" use:enhance={handleSubmit}>
            <div>
                <label for="email">Correo electrónico</label>
                <input id="email" name="email" type="email" required />
            </div>

            <div>
                <label for="firstName">Nombre(s)</label>
                <input id="firstName" name="firstName" type="text" required />
            </div>

            <div>
                <label for="lastName">Apellidos</label>
                <input id="lastName" name="lastName" type="text" required />
            </div>

            <div>
                <label for="phone">Número de teléfono celular</label>
                <input id="phone" name="phone" type="tel" required />
            </div>

            <div>
                <label for="idType">Tipo de identificación:</label>
                <select id="idType" name="idType" required>
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="TI">Tarjeta de identidad</option>
                    <option value="RC">Registro civil</option>
                    <option value="CE">Cédula de extranjería</option>
                </select>
                <label for="idNumber">Número de identificación:</label>
                <input type="text" id="idNumber" name="idNumber" required />
            </div>

            <div>
                <button class="button block primary" disabled={loading}>
                    {#if loading}
                        Cargando...
                    {:else}
                        Terminar pre-inscripción
                    {/if}
                </button>
            </div>
        </form>
        <div class="text-center">
            <p>¿Ya empezaste tu inscripción? <a href="/convivio/sign-in">Termínala acá</a></p>
        </div>
    </div>
{/if}

<style>
    .text-center {
        text-align: center;
    }
</style>
