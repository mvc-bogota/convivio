<script>
    import { enhance } from '$app/forms';
    import { prayerTypes } from '$lib/prayers';
</script>

<form method="POST" use:enhance>
    <div class="wrapper">
        <label for="prayerType">¿Qué ofreciste por convivio?</label>
        <select name="prayerType" id="prayerType" required>
            <option value="" selected>Selecciona un ofrecimiento</option>
            {#each Object.entries(prayerTypes) as [prayerType, { label }]}
                <option value={prayerType}>{label}</option>
            {/each}
        </select>
        <button>Haz tu ofrecimiento</button>
    </div>
</form>

<style>
    .wrapper {
        padding: 20px 0px;
        text-align: center;
    }

    label {
        font-family: var(--ff-secondary);
        font-weight: bold;
    }
</style>
