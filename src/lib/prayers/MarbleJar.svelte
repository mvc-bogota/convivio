<script>
    export let prayerTracker;
</script>

<div class="jars">
    {#each [...prayerTracker.jars].reverse() as jar}
        <div class="jar">
            <div class="marble-container">
                {#each jar.prayers as prayer}
                    <div class="marble" style="background-color: {prayer.getColor()};" />
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .jars {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5em;
    }

    .jar {
        --jar-width: 20em;
        --jar-height: 30em;
        width: var(--jar-width);
        height: var(--jar-height);
        background-color: #fff;
        display: flex;
        flex-direction: column-reverse;
        outline: 1px solid #000;
        border-radius: 1em;
    }

    .marble-container {
        display: flex;
        flex-wrap: wrap-reverse;
        align-items: end;
    }

    .marble {
        flex-basis: calc(var(--jar-width) / 10);
        height: calc(var(--jar-height) / 15);
        border-radius: 50%;
    }
</style>
