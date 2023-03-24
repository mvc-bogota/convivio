<script>
    export let data;
</script>

{#if !data.session}
    <h1>I am not logged in</h1>
{:else}
    <h1>Welcome {data.session.user.email}</h1>
    <p>I am logged in!</p>
{/if}
