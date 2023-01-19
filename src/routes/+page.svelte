<script>
    export let data;

    import '$lib/assets/global.css';
    import { enhance } from '$app/forms';
    import MarbleJar from './MarbleJar.svelte';
</script>

<h1>Haz tu ofrecimiento por convivio</h1>
<p>{data.currentPrayers}</p>

<form method="POST" use:enhance>
    <button>Haz tu ofrecimiento</button>
</form>

<MarbleJar marbles={data.currentPrayers} />
