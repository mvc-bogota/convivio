<script>
    import { enhance } from '$app/forms';

    export let data;
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

<h1>Termina tu inscripción a convivio</h1>

<p>
    Hola {profile.first_name}, ya casi terminas tu inscripción. Solo falta que llenes la siguiente
    información y pagues tu inscripción. Si tienes alguna duda, puedes escribirnos a
    <a href="mailto:convivio@sanjose.edu.co">convivio@sanjose.edu.co</a>.
</p>

<div class="form-widget">
    {#if profile.registration_filled}
        <p>Poner aca la pasarela de pago</p>
    {:else}
        <form class="flow" method="post" action="?/update" use:enhance={handleSubmit}>
            <div>
                <label for="school">Institución Educativa</label>
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
                    <label for="parentName">Nombre del padre o madre</label>
                    <input type="text" name="parentName" id="parentName" required />
                </div>

                <div>
                    <label for="parentPhone">Teléfono del padre o madre</label>
                    <input type="tel" name="parentPhone" id="parentPhone" required />
                </div>

                <div>
                    <label for="parentEmail">Correo electrónico del padre o madre</label>
                    <input type="email" name="parentEmail" id="parentEmail" required />
                </div>

                <div>
                    <label for="authorization">Permiso firmado por el padre o la madre</label>
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
                    <select name="busStop" id="busStop">
                        <option value="">---</option>
                        <option value="Unicentro">Unicentro</option>
                        <option value="Carulla Alhambra">Carulla Alhambra</option>
                        <option value="Salitre">Salitre</option>
                    </select>
                </div>
            {/if}

            <div>
                <label for="eps">EPS</label>
                <input type="text" name="eps" id="eps" required />
            </div>

            <p>
                Recuerda que si tienes alguna restricción alimentaria, es importante que lleves tu
                propia comida a convivio.
            </p>

            <div>
                <button type="submit" class="button block primary" disabled={loading}>
                    {loading ? 'Cargando...' : 'Enviar'}
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
