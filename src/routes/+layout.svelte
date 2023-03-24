<script>
    import { invalidate } from '$app/navigation';
    import { onMount } from 'svelte';
    import '../app.css';

    export let data;

    $: ({ supabase } = data);

    onMount(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
            invalidate('supabase:auth');
        });

        return () => subscription.unsubscribe();
    });
</script>

<slot />
