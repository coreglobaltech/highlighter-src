<script lang="ts">
    import Colors from './Colors.svelte';
    import { Formatter, Theme } from '../api/Formatter';
    import { safeHtml } from 'common-tags';
    import { createEventDispatcher, onMount } from 'svelte';
    onMount(() => createFontSlider());

    export let formatted: string;
    export let editor: any;
    export let isCoding: boolean = false;
    const dispatch = createEventDispatcher();

    // Checkboxes
    let lineNumbers: boolean = true;
    let boxOutline: boolean = true;
    let leftBorder: boolean = true;
    let fontSize: number = 13;

    function isDiff(orig: any, update: any) {
        if (orig != update) {
            return true;
        }
    }

    $: {
        if (formatted) {
            if (isDiff(lineNumbers, Formatter.LINE_NUMBERS)) lineNumbers = Formatter.LINE_NUMBERS;
            if (isDiff(boxOutline, Formatter.BOX_OUTLINE)) boxOutline = Formatter.BOX_OUTLINE;
            if (isDiff(leftBorder, Formatter.LEFT_BORDER)) leftBorder = Formatter.LEFT_BORDER;
            if (isDiff(fontSize, Formatter.FONT_SIZE)) {
                createFontSlider(Formatter.FONT_SIZE);
                fontSize = Formatter.FONT_SIZE;
            }
        }
    }

    function onCheck(): void { dispatch('format'); }
    function onLines(): void { Formatter.LINE_NUMBERS = !Formatter.LINE_NUMBERS; onCheck(); }
    function onBox(): void { Formatter.BOX_OUTLINE = !Formatter.BOX_OUTLINE; onCheck(); }
    function onBorder(): void { Formatter.LEFT_BORDER = !Formatter.LEFT_BORDER; onCheck(); }
    function onImport(): void {
        (document.getElementById('import') as HTMLInputElement).value = null;
        document.getElementById('import').click();
    }

    function importTheme(): void {
        const input: HTMLInputElement = document.getElementById('import') as HTMLInputElement;

        if (input && input.files.length != 0) {
            const file: File = input.files[0];
            const reader: FileReader = new FileReader();

            reader.onload = (e) => {
                const file = e.target.result.toString();
                const lines = file.split(/\r\n|\n/);
                Theme.import(lines.join('\n'));
            }

            reader.onerror = (e) => {
                console.error(e.target.error);
                (<any>window).jQuery('body').toast({
                    showIcon: 'exclamation triangle icon',
                    class: 'error',
                    title: 'Error',
                    message: 'An error occurred while reading uploaded theme.',
                    displayTime: 5000
                });
            }

            reader.readAsText(file);
        }
    }

    function exportTheme(): void {
        const a = document.createElement('a');
        const file = new Blob([Theme.export()], { type: 'application/json' });

        a.href = URL.createObjectURL(file);
        a.download = 'highlight-theme.json';
        a.click();

        URL.revokeObjectURL(a.href);
    }

    function createFontSlider(start: number = 13): void {
        (<any>window).jQuery("#fontSize").slider({
            start,
            min: 12,
            max: 24,
            step: 1,
            onChange: (val) => {
                Formatter.FONT_SIZE = val;
                onCheck();
            }
        });
    }
</script>

<style>
    .glue-body {}
    .space {
        margin-bottom: 5px;
    }
</style>

<div class="column">
    <div class="ui grid">
        <div class="eight wide column">
            <h3 class="ui horizontal divider header">
                {#if isCoding}
                    <i class="sync alternate loading icon"></i>
                {:else}
                    <i class="print icon"></i>
                {/if}
                D2L Preview
            </h3>
            <div id="formatContext">
                {@html safeHtml(formatted)}
            </div>
        </div>

        <div class="eight wide column" id="formatOptions">
            <h3 class="ui horizontal divider header">
                <i class="drafting compass icon"></i>
                Formatting Options
            </h3>
            <div class="ui sticky grid glue-body">
                <div class="five wide column">
                    <h4 class="ui header">
                        <i class="ruler combined icon"></i>
                        Lines & Bordering
                    </h4>
                    <div class="row space">
                        <div class="ui checkbox">
                            <input type="checkbox" bind:checked={lineNumbers} on:click={onLines}>
                            <label>Line Numbers</label>
                        </div>
                    </div>

                    <div class="row space">
                        <div class="ui checkbox">
                            <input type="checkbox" bind:checked={boxOutline} on:click={onBox}>
                            <label>Box Outline</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="ui checkbox">
                            <input type="checkbox" bind:checked={leftBorder} on:click={onBorder} disabled={!boxOutline}>
                            <label>Left Border</label>
                        </div>
                    </div>

                    <h4 class="ui header">
                        <i class="brush icon"></i>
                        Apply Theme
                    </h4>
                    <button on:click={onImport} class="ui blue button">
                        <input on:change={importTheme} id="import" type="file" accept=".json" style="display:none;" />
                        <i class="upload icon"></i>
                        Import
                    </button>

                    <button on:click={exportTheme} class="ui blue button">
                        <i class="download icon"></i>
                        Export
                    </button>
                </div>

                <div class="five wide column" style="padding-left: 0; padding-right: 0;">
                    <h4 class="ui header">
                        <i class="pencil alternate icon"></i>
                        Font Size
                    </h4>
                    <div id="fontSize" class="ui blue labeled ticked slider" on:drag={onCheck}></div>
                </div>

                <div class="six wide column">
                    <h4 class="ui center aligned header" style="margin-right: 16px;">
                        <i class="paint roller icon"></i>
                        Colors
                    </h4>
                    <div style="padding: 0 1rem 0 1rem;">
                        <Colors on:format={onCheck} />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
