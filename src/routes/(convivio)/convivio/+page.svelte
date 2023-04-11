<script>
    import { enhance } from '$app/forms';

    export let data;
    export let form;
    let { profile } = data;

    let loading = false;

    const convivioDate = new Date(2023, 4, 6);
    const year = 1000 * 60 * 60 * 24 * 365;

    let birthDate;
    $: isUnderage = convivioDate.getTime() - new Date(birthDate).getTime() < year * 18;

    let bus;

    function handleSubmit() {
        loading = true;
        return async ({ update }) => {
            loading = false;
            update();
        };
    }
</script>

<h1>Termina tu inscripción a Convivio</h1>

<div class="form-widget">
    {#if profile.registration_filled || form?.success}
        <p>
            Hola {profile.first_name}, ya estás a un paso de terminar tu inscripción. Solo falta que pagues tu inscripción. 
            Si tienes alguna duda, puedes escribirnos a
            <a href="mailto:convivio@sanjose.edu.co">convivio@sanjose.edu.co</a> o por Whatsapp a
            <a href="https://wa.me/573222926960">322 292 6960</a>.
        </p>
        <form  method="POST" class= "flex flex-center" action="?/pay">
            <input type="hidden" name="email" value="{profile.email}" />
            <input type="hidden" name="fullName" value="{profile.first_name} {profile.last_name}" />
            <input type="hidden" name="phoneNumber" value="{profile.phone_number}" />
            <input type="hidden" name="legalIdNumber" value="{profile.id_number}" />
            <input type="hidden" name="legalIdType" value="{profile.id_type}" />
            <button type="submit" class="button primary"><strong>Pagar con Wompi</strong></button>
          </form>
    {:else}
        <p>
            Hola {profile.first_name}, ya casi terminas tu inscripción. Solo falta que llenes la siguiente
            información y pagues tu inscripción. Si tienes alguna duda, puedes escribirnos a
            <a href="mailto:convivio@sanjose.edu.co">convivio@sanjose.edu.co</a> o por Whatsapp a
            <a href="https://wa.me/573222926960">322 292 6960</a>.
        </p>
        <form class="flow" method="post" action="?/update" use:enhance={handleSubmit}>
            <div>
                <label for="school">Nombre de tu institución educativa</label>
                <input type="text" name="school" id="school" required />
            </div>
            <div>
                <label for="grade">Curso o semestre</label>
                <select name="grade" id="grade" required>
                    <option value="">---</option>
                    <option value="8">Octavo</option>
                    <option value="9">Noveno</option>
                    <option value="10">Décimo</option>
                    <option value="11">Once</option>
                    <option value="12">Doce</option>
                    <option value="I">Primer Semestre</option>
                    <option value="II">Segundo Semestre</option>
                    <option value="III">Tercer Semestre</option>
                    <option value="IV">Cuarto Semestre</option>
                    <option value="V">Quinto Semestre</option>
                    <option value="VI">Sexto Semestre</option>
                    <option value="VII">Séptimo Semestre</option>
                    <option value="VIII">Octavo Semestre</option>
                    <option value="IX">Noveno Semestre</option>
                    <option value="X">Décimo Semestre</option>
                    <option value="XI">Onceava Matrícula</option>
                    <option value="XII">Doceava Matrícula</option>
                </select>
            </div>

            <div>
                <label for="birthDate">Fecha de nacimiento</label>
                <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    required
                    bind:value={birthDate}
                />
            </div>

            {#if isUnderage}
                <div>
                    <label for="parentName">Nombre de algún padre, madre o acudiente</label>
                    <input type="text" name="parentName" id="parentName" required />
                </div>

                <div>
                    <label for="parentPhone">Teléfono del padre, madre o acudiente</label>
                    <input type="tel" name="parentPhone" id="parentPhone" required />
                </div>

                <div>
                    <label for="parentEmail">Correo electrónico del padre, madre o acudiente</label>
                    <input type="email" name="parentEmail" id="parentEmail" required />
                </div>
                <small>Descarga esta plantilla de permiso para menores de edad y luego de llenar los campos, adjunta el permiso a continuación:</small>
                <small><a href="https://drive.google.com/file/d/1ZrN5K6Vi5lrM__5S2VSMZqiJlLuR6bBI/view" target="_blank" rel="noreferrer noopener">
                    Permiso menores de edad Convivio
                </a></small>
                <div>
                    <label for="authorization">Permiso firmado por el padre, madre o acudiente</label>
                    <input type="file" name="authorization" id="authorization" required />
                </div>
            {/if}

            <div>
                <label for="bus">¿Necesitas transporte hasta Cajicá?</label>
                <small>El transporte NO tiene ningún costo adicional.</small>
                <select name="bus" id="bus" required bind:value={bus}>
                    <option value="">---</option>
                    <option value={true}>Sí</option>
                    <option value={false}>No</option>
                </select>
            </div>

            {#if bus}
                <div>
                    <label for="busStop">Parada de bus más cercana</label>
                    <select name="busStop" id="busStop" required>
                        <option value="">---</option>
                        <option value="Unicentro">Unicentro</option>
                        <option value="Carulla Alhambra">Carulla Alhambra</option>
                        <option value="Carulla de la 85">Carulla de la 85</option>
                        <option value="Centro Chía">Centro Chía</option>
                    </select>
                </div>
            {/if}

            <div>
                <label for="eps">Entidad Prestadora de Salud (EPS)</label>
                <input type="text" name="eps" id="eps" required />
            </div>

            <p>
                <strong>
                    Recuerda que si tienes alguna restricción alimentaria, es importante que lleves tu
                    propia comida a convivio.
                </strong>
            </p>

            <div>
                <button type="submit" class="button block primary" disabled={loading}>
                    {loading ? 'Cargando...' : 'Terminar Registro'}
                </button>
            </div>
        </form>
    {/if}

    <form method="post" action="?/signout" use:enhance={handleSubmit}>
        <div>
            <button class="button block" disabled={loading}>Cerrar Sesión</button>
        </div>
    </form>
</div>

<style>
    .flow > * + * {
        margin-top: 2em;
    }

    small {
        display: block;
        margin-bottom: 0.5rem;
    }
</style>
