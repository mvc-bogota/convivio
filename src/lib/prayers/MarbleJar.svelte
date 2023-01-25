<script>
    export let prayerTracker;
</script>

<div class="jars">
    {#each [...prayerTracker.jars].reverse() as jar}
        <div class="jar">
            <div class="marble-container">
                {#each jar.prayers as prayer}
                    <div class="marble" style="background: radial-gradient(circle at 20% 20%, {prayer.getColor()}, #000);" />
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
        padding: 30px;
    }

    .jar {
        --jar-width: 20em;
        --jar-height: 30em;
        width: var(--jar-width);
        height: var(--jar-height);
        background-color: aliceblue;
        display: flex;
        flex-direction: column-reverse;
        outline: 1px ridge rgba(0, 0, 0, 0.3);
        border-radius: 0 0 1em 1em;
        box-shadow: 0 0 10px #000;
    }

    .marble-container {
        display: flex;
        flex-wrap: wrap-reverse;
        align-items: end;
    }

    .marble {
        --marble-height: calc(var(--jar-height) / 15);
        flex-basis: calc(var(--jar-width) / 10);
        height: var(--marble-height);
        border-radius: 50%;
    }
</style>
