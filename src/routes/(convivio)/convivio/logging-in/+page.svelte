<script>
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    export let data;
    $: {
        const redirectTo = $page.url.searchParams.get('redirect');

        // check if user has been set in session store then redirect
        if (browser && data.session) {
            goto(redirectTo ?? '/convivio/account');
        }
    }
</script>

<section>Iniciando sesión</section>
