<script lang="ts">
    import Tutorial from './Tutorial.svelte';
    import { Formatter } from '../api/Formatter';
    import { onMount } from 'svelte';

    export let source: string;
    export let language: string;
    export let formatted: string;
    export let editor: any;
    export let isCoding: boolean = false;

    function help(): void {
        (<any>window).jQuery('.ui.modal').modal('show');
    }

    async function paste(): Promise<void> {
        const text: string = await navigator.clipboard.readText().catch(err => {
            console.error(err);
            (<any>window).jQuery('body').toast({
                showIcon: 'exclamation triangle icon',
                class: 'error',
                title: 'Error',
                message: 'Permission was denied to paste from clipboard.',
                displayTime: 5000
            });

            return source;
        });

        if (text) {
            source = text;
        }
    }

    async function copy(): Promise<void> {
        navigator.clipboard.writeText(formatted)
            .then(() => {
                (<any>window).jQuery('body').toast({
                    showIcon: 'copy',
                    class: 'success',
                    title: 'Copied',
                    message: 'Formatted source code copied to clipboard.',
                    displayTime: 3500
                });
            })
            .catch(err => {
                console.error(err);
                (<any>window).jQuery('body').toast({
                    showIcon: 'exclamation triangle icon',
                    class: 'error',
                    title: 'Error',
                    message: 'Permission was denied to copy to clipboard.',
                    displayTime: 5000
                });
            }
        );
    }

    function open(): void {
        (document.getElementById('upload') as HTMLInputElement).value = null;
        document.getElementById('upload').click();
    }

    function onOpen(): void {
        const input: HTMLInputElement = document.getElementById('upload') as HTMLInputElement;

        if (input && input.files.length != 0) {
            const file: File = input.files[0];
            const reader: FileReader = new FileReader();

            reader.onload = (e) => {
                const file = e.target.result.toString();
                const lines = file.split(/\r\n|\n/);
                const code = lines.join('\n');

                source = code;
                editor.session.setValue(code);
            }

            reader.onerror = (e) => {
                console.error(e.target.error);
                (<any>window).jQuery('body').toast({
                    showIcon: 'exclamation triangle icon',
                    class: 'error',
                    title: 'Error',
                    message: 'An error occurred while reading uploaded source.',
                    displayTime: 5000
                });
            }

            reader.readAsText(file);
        }
    }

    function onLanguage(): void {
        let el: HTMLInputElement = document.getElementById('languageInput') as HTMLInputElement;
        language = el.value;

        Formatter.customize();

        if (Formatter.editor.session) {
            Formatter.editor.session.setMode(`ace/mode/${Formatter.getAce(language)}`);
        }
    }

    function download(): void {
        const a = document.createElement('a');
        const file = new Blob([formatted], { type: 'text/plain' });

        a.href = URL.createObjectURL(file);
        a.download = 'formatted-code.txt';
        a.click();

        URL.revokeObjectURL(a.href);
    }

    onMount(() => {
        (<any>window).jQuery('#language').dropdown({
            values: Formatter.languages,
            className: {
                image: 'ui avatar image no-border'
            }
        });
    });
</script>

<style>
    textarea {
        resize: none !important;
        /*height: 500px !important;*/
        /*height: 50vh !important;*/
        height: 37vh !important;
        max-height: 37vh !important;
    }

    #editor {
        /*height: 24em !important;*/
        height: 37vh !important;
        border: 1px solid rgba(34, 36, 38, 0.15) !important;
        border-radius: 0.28571429rem !important;
        vertical-align: top !important;
        box-sizing: border-box !important;
    }

    .controls {
        margin-top: 1em;
    }
</style>

<Tutorial />
<div class="column" style="height: 100% !important;">
    <h3 class="ui header">
        <i class="file alternate outline icon"></i>
        <div class="content">
            Source Code
        </div>
    </h3>
    <div class="content">
        <div id="editor" class="ui form">{source}</div>
    </div>
    <div class="controls">
        <div class="ui grid">
            <div class="eleven wide column">
                <button on:click={open} class="ui blue labeled icon button">
                    <input on:change={onOpen} id="upload" type="file" style="display:none;" />
                    <i class="upload icon"></i>
                    Open
                </button>
                <button class="ui blue labeled icon button" on:click={paste}>
                    <i class="clipboard icon"></i>
                    Paste
                </button>
            </div>
            <div class="right aligned five wide column">
                <div id="language" class="ui fluid search selection small dropdown">
                    <input on:change={onLanguage} id="languageInput" type="hidden" name="language">
                    <i class="dropdown icon"></i>
                    <div class="default text">Select Language</div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="column" style="height: 100% !important;">
    <h3 class="ui header">
        {#if isCoding}
            <i class="sync alternate loading icon"></i>
        {:else}
            <i class="file code outline icon"></i>
        {/if}
        <div class="content">
            Formatted Code
        </div>
    </h3>
    <div class="content" id="output">
        <div class="ui form">
            <div class="ui fluid input">
                <textarea>{formatted}</textarea>
            </div>
        </div>
    </div>
    <div class="controls">
        <div class="ui grid">
            <div class="ten wide column">
                <button on:click={download} class="ui blue labeled icon button">
                    <i class="save icon"></i>
                    Save
                </button>
                <button class="ui blue labeled icon button" on:click={copy}>
                    <i class="copy icon"></i>
                    Copy
                </button>
            </div>

            <div class="right aligned six wide column">
                <button on:click={help} class="ui blue labeled icon button">
                    <i class="question icon"></i>
                    Help
                </button>
            </div>
        </div>
    </div>
</div>
