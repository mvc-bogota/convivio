<script>
    export let data;

    import MarbleJar from '$lib/prayers/MarbleJar.svelte';
    import PrayerForm from '$lib/prayers/PrayerForm.svelte';
    import { prayerTypes } from '$lib/prayers';
</script>

<h1>Haz tu ofrecimiento por Convivio</h1>
<p>Hasta el momento llevamos:</p>
<ul>
    {#each Object.entries(prayerTypes) as [type, { label }]}
        <li><strong>{label}</strong>: {data.prayerTracker.getPrayersCountByType(type)}</li>
    {/each}
</ul>

<PrayerForm />

<MarbleJar prayerTracker={data.prayerTracker} />
