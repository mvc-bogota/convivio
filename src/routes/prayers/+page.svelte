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
    <div id="banner-image" />

    <div id="prayer-count-container">
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

    <h2>Jarrones:</h2>

    <MarbleJar prayerTracker={data.prayerTracker} />
</div>

<style>
    h1 {
        color: white;
        margin: 5px;
        text-align: center;
    }

    p {
        margin-top: 5px;
        margin-bottom: 5px;
        text-align: center;
    }

    #header-container {
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #00558f;
        color: white;
        width: 100%;
    }

    #banner-image {
        width: 100%;
        height: 200px;
        background-image: url($lib/assets/prayer-banner.jpg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
    }

    #prayer-count-container {
        margin: 30px 0;
        padding: 0 15px 0 0;
        border-radius: 30px 30px 0px 30px;
        outline: 8px ridge #00558f;
        box-shadow: 10px 10px 5px lightblue;
    }

    #offerings-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    li {
        font-weight: 700;
    }
</style>
