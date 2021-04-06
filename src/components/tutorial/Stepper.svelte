<script lang="ts">
    import { fly } from 'svelte/transition';
</script>

<div class="ui fluid vertical steps" in:fly="{{ x: 14, delay: 100, duration: 400 }}">
    <slot />
</div>
