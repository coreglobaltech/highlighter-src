<script lang="ts">
    export let name = "";
    export let tabs: unknown = {};
    export let key = "";

    let flag: boolean;
    $: flag = !!tabs[key];

    function toggle() {
        for (const prop in tabs) {
            if (tabs[prop]) {
                tabs[prop] = false;
                break;
            }
        }

        tabs[key] = true;
        tabs = Object.assign({}, tabs);
    }
</script>

<style>
    .active {
        background-color: #eaeaea !important;
    }
</style>

<a class="item {flag ? 'active' : ''}" on:click={toggle}>{name}</a>
