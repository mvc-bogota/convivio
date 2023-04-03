<script>
    import { enhance } from '$app/forms';

    export let data;
    export let form;

    let { session, profile } = data;

    let loading = false;

    let profileForm;
    console.log(profile);
    console.log(form);
    let firstName = profile?.first_name;
    let lastName = profile?.last_name;
    let phoneNumber = profile?.phone_number;
    let idType = profile?.id_type;
    let idNumber = profile?.id_number;

    function handleSubmit() {
        loading = true;
        return async ({ update }) => {
            loading = false;
            update();
        };
    }
</script>

<h1>Actualiza tu información</h1>

<div class="form-widget">
    <form
        class="form-widget"
        method="post"
        action="?/update"
        use:enhance={handleSubmit}
        bind:this={profileForm}
    >
        <div>
            <label for="email">Correo electrónico</label>
            <input id="email" name="email" type="email" value={session.user.email} readonly />
        </div>

        <div>
            <label for="firstName">Nombre(s)</label>
            <input
                id="firstName"
                name="firstName"
                type="text"
                value={form?.firstName ?? firstName ?? ''}
                required
            />
        </div>

        <div>
            <label for="lastName">Apellidos</label>
            <input
                id="lastName"
                name="lastName"
                type="text"
                value={form?.lastName ?? lastName ?? ''}
                required
            />
        </div>

        <div>
            <label for="phoneNumber">Número de teléfono celular</label>
            <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={form?.phoneNumber ?? phoneNumber ?? ''}
                required
            />
        </div>

        <div>
            <label for="idType">Tipo de identificación:</label>
            <select id="idType" name="idType" value={form?.idType ?? idType} required>
                <option value="CC">Cédula de ciudadanía</option>
                <option value="TI">Tarjeta de identidad</option>
                <option value="CE">Cédula de extranjería</option>
            </select>
            <label for="idNumber">Número de identificación:</label>
            <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={form?.idNumber ?? idNumber ?? ''}
                required
            />
        </div>

        <div>
            <input
                type="submit"
                class="button block primary"
                value={loading ? 'Cargando...' : 'Actualizar Datos'}
                disabled={loading}
            />
        </div>
    </form>

    <form method="post" action="?/signout" use:enhance={handleSubmit}>
        <div>
            <button class="button block" disabled={loading}>Cerrar Sesión</button>
        </div>
    </form>
</div>

<style>
    input:read-only {
        color: grey;
    }
</style>
