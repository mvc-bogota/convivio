<script>
    export let marbles = 0;

    let colors = ['#f44336', '#9c27b0', '#3f51b5', '#03a9f4', '#4caf50', '#ffc107'];
    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }
    function getMarblePosition(i) {
        let x = i % 10;
        let y = Math.floor(i / 10);
        let offset = y % 2 === 0 ? 0 : 5;
        let left = x * 10 + offset;
        let top = 90 - y * 8;
        return { left, top };
    }
</script>

<div class="jar-4">
    <div class="marble-container">
        {#each Array.from({ length: marbles }) as _, i}
            <div
                class="marble"
                style="background-color: {getRandomColor()}; top: {getMarblePosition(i)
                    .top}%; left: {getMarblePosition(i).left}%;"
            />
        {/each}
    </div>
</div>

<style>
    .jar-4 {
        width: min-content;
        background-color: #fff;
        overflow: hidden;
    }

    .marble-container {
        width: 200px;
        height: 250px;
        position: relative;
    }

    .marble {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;
    }
</style>
