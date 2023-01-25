<script>
    export let data;

    import MarbleJar from '$lib/prayers/MarbleJar.svelte';
    import PrayerForm from '$lib/prayers/PrayerForm.svelte';
    import { prayerTypes } from '$lib/prayers';
</script>

<div class="offerings-container">
    <h1>Haz tu ofrecimiento por Convivio</h1>
    <p>Hasta el momento llevamos:</p>
    <ul>
        {#each Object.entries(prayerTypes) as [type, { color, label }]}
            <li style="color: {color};">{label}: <strong>{data.prayerTracker.getPrayersCountByType(type)}</strong></li>
        {/each}
    </ul>

    <PrayerForm />

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
