<script>
    export let data;

    import MarbleJar from '$lib/prayers/MarbleJar.svelte';
    import PrayerForm from '$lib/prayers/PrayerForm.svelte';
    import { prayerTypes } from '$lib/prayers';
</script>

<div id="offerings-container">
    <div id="header-container">
        <h1>¡Haz tu ofrecimiento por Convivio!</h1>
        <p>Por cada ofrecimiento que registres, se agrega una bolita al jarrón</p>
        <p>Cuando un jarrón se llena, se agrega un nuevo jarrón</p>
    </div>
    <div id="banner-image"></div>

    <div id="prayer-count-container">
        <p><strong>Hasta el momento llevamos:</strong></p>
        <ul>
            {#each Object.entries(prayerTypes) as [type, { color, label }]}
                <li style="color: {color};">{label}: <strong>{data.prayerTracker.getPrayersCountByType(type)}</strong></li>
            {/each}
        </ul>
    </div>

    <PrayerForm />

    <h2>Jarrones:</h2>

    <MarbleJar prayerTracker={data.prayerTracker} />
</div>

<style>
    .offerings-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    li {
        font-weight: 700;
    }
</style>
