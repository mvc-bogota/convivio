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

<h1>Termina tu inscripción</h1>

{#if form?.success}
    <div class="alert success">
        <p>
            Te hemos enviado un correo electrónico a {form.email} con un link para que términes tu inscripción.
        </p>
        <p>Ya puedes cerrar está página.</p>
    </div>
{:else}
    {#if !form?.success && form?.error}
        <div class="alert error">
            <h2>¡Ups!</h2>
            <p>
                Ha ocurrido un error. Por favor, intenta de nuevo o ponte en contacto con nosotros.
            </p>
        </div>
    {/if}
    <p>
        Escribe el correo electrónico con el que empezaste tu inscripción y te llegará un link para
        que la puedas términar.
    </p>

    <div class="form-widget">
        <form class="form-widget" method="post" use:enhance={handleSubmit}>
            <div>
                <label for="email">Correo electrónico</label>
                <input id="email" name="email" type="email" required />
            </div>

            <div>
                <button class="button block primary" disabled={loading}>
                    {#if loading}
                        Cargando...
                    {:else}
                        Enviar link con tú inscripción
                    {/if}
                </button>
            </div>
        </form>

        <div class="text-center">
            <p>¿No has iniciado tu inscripción aún? <a href="/convivio/registro">Empieza acá</a></p>
        </div>
    </div>
{/if}

<style>
    .text-center {
        text-align: center;
    }
</style>
