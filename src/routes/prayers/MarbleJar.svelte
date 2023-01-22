<script>
    export let marbles = 0;

    let colors = ['#1855B3', '#506481', '#67DAE5', '#03a9f4', '#EC8C6C', '#B42C2C'];

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }
</script>

<div class="jar">
    <div class="marble-container">
        {#each Array.from({ length: marbles }) as _, i}
            <div class="marble" style="background-color: {getRandomColor()};" />
        {/each}
    </div>
</div>

<style>
    .jar {
        --jar-width: 20em;
        --jar-height: 30em;
        width: var(--jar-width);
        height: var(--jar-height);
        background-color: #fff;
        display: flex;
        flex-direction: column-reverse;
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
