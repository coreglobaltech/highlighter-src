<script lang="ts">
    export let name: string;
    export let url: string;
</script>

<style>
    a {
        color: rgba(255, 255, 255, 0.8);
    }

    a:hover {
        text-decoration: none;
        color: #46adfc;
    }
</style>

<a href="{url}" target="_blank" rel="noopener noreferrer">{name}</a>
