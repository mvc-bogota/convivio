<script>
    export let data;

    import MarbleJar from '$lib/prayers/MarbleJar.svelte';
    import PrayerForm from '$lib/prayers/PrayerForm.svelte';
    import { prayerTypes } from '$lib/prayers';
</script>

<header>
    <div class="wrapper">
        <h1>¡Haz tu ofrecimiento por Convivio!</h1>
        <p>
            Ofrece alguna oración por convivio y registralo acá. Agregaremos una bolita al jarrón
            por cada oración. ¿Cuántos jarrones podremos llenar?
        </p>
    </div>
    <div class="banner" />
</header>

<main class="flow">
    <div class="prayer-counter">
        <p><strong>Hasta el momento llevamos:</strong></p>
        <ul>
            {#each Object.entries(prayerTypes) as [type, { color, label }]}
                <li style="color: {color};">
                    {label}: <strong>{data.prayerTracker.getPrayersCountByType(type)}</strong>
                </li>
            {/each}
        </ul>
    </div>

    <PrayerForm />

    <div class="jars flow">
        <h2>Jarrones:</h2>
        <MarbleJar prayerTracker={data.prayerTracker} />
    </div>
</main>

<style>
    header {
        background-color: var(--color-primary);
        color: var(--color-neutral-light);
        text-align: center;
    }

    header .wrapper {
        padding: var(--s-400);
        max-width: 65ch;
        margin: 0 auto;
    }

    h1 {
        color: var(--color-neutral-light);
    }

    h2 {
        margin: 0px;
    }

    .banner {
        height: 200px;
        background-image: url($lib/assets/prayer-banner.jpg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    li {
        font-weight: 700;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: var(--s-600);
    }

    .prayer-counter {
        padding: var(--s-400);
        border-radius: var(--s-700) var(--s-700) 0px var(--s-700);
        outline: 8px ridge #00558f;
        box-shadow: 10px 10px 5px lightblue;
    }

    .jars {
        --flow-space: var(--s-300);
        text-align: center;
    }
</style>
