<script>
    import { Auth } from '@supabase/auth-ui-svelte';
    import { ThemeSupa } from '@supabase/auth-ui-shared';

    export let data;
</script>

{#if !data.session}
    <div class="row flex-center flex">
        <div class="col-6 form-widget">
            <Auth
                supabaseClient={data.supabase}
                view="magic_link"
                redirectTo={`${data.url}/convivio/logging-in?redirect=/convivio`}
                showLinks={false}
                appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
            />
        </div>
    </div>
    
{:else}
    <h1>Welcome {data.session.user.email}</h1>
    <p>I am logged in!</p>
{/if}
