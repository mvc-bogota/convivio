<script>
    import { enhance } from '$app/forms';
    import { prayerTypes } from '$lib/prayers';
</script>

<form method="POST" use:enhance>
    <label for="prayerType">¿Qué ofreciste por convivio?</label>
    <select name="prayerType" id="prayerType" required>
        <option value="" selected>Selecciona una oración</option>
        {#each Object.entries(prayerTypes) as [prayerType, { label }]}
            <option value={prayerType}>{label}</option>
        {/each}
    </select>
    <button>Haz tu ofrecimiento</button>
</form>
