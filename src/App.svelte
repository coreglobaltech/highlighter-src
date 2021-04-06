<script lang="ts">
    import Header from "./components/Header.svelte";
    import Footer from "./components/Footer.svelte";
    import SourceFormatter from "./components/SourceFormatter.svelte";
    import SourcePreview from "./components/SourcePreview.svelte";
    import { main, highlight } from './api/main';
    import { onMount } from 'svelte';
    import { Formatter } from './api/Formatter';

    let source: string = "import java.io.*;";
    let language: string = "Java";
    let formatted: string = "";
    let editor: any = {};

    let isCoding: boolean = false;
    let timeout: any;

    function onCustomize(): void {
        if (editor.session) {
            editor.session.setValue(editor.getValue());
        }
    }

    function onFormat(): void {
        highlight(language, source);
        (<any>window).jQuery(".glue-body").sticky({
            context: '#formatContext',
            observeChanges: true,
            silent: true,
            offset: 81 // Non-sticky header: 10 (px)
        });
    }

    function onTimeout(): void {
        isCoding = false;
        source = editor.getValue();
        onFormat();

        (<any>window).jQuery("#output").dimmer("hide");
        (<any>window).jQuery("#formatContext").dimmer("hide");

        clearTimeout(timeout);
        timeout = null;
    }

    function dim(id: string): void {
        const dim = () => {
            (<any>window).jQuery(id)
                .dimmer({ variation: 'inverted', closable: false })
                .dimmer("show");
        };

        if ((<any>window).jQuery(id).dimmer('is animating')) {
            setTimeout(() => {
                dim();
            }, 500);
        } else {
            dim();
        }
    }

    function loadEditor(): void {
        if ((<any>window).ace) {
            editor = (<any>window).ace.edit("editor");
            editor.setTheme("ace/theme/xcode");
            editor.session.setMode(`ace/mode/java`);
            editor.session.on('change', () => {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = setTimeout(onTimeout, 1500);
                }

                if (!isCoding && !timeout) {
                    dim("#output");
                    dim("#formatContext");

                    isCoding = true;
                    timeout = setTimeout(onTimeout, 1500);
                }
            });

            document.getElementById('editor').style.fontSize='15px';

            Formatter.editor = editor;
        } else {
            console.error("Ace is not attached to the window object.");
        }
    }

    main();
    onMount(() => {
        onFormat();

        Formatter.update = () => {
            formatted = Formatter.OUTPUT + " ";
            formatted = Formatter.OUTPUT;
        }
    });
</script>

<svelte:window on:load="{ () => loadEditor() }" />

<Header/>
<div id="#app">
    <section class="ui equal width middle aligned padded grid">
        <section class="row" style="margin-top: 5.7rem !important; height: 50vh !important;">
            <SourceFormatter bind:source bind:language editor={editor} formatted={formatted} isCoding={isCoding} />
        </section>
        <section class="row" style="margin-bottom: 4.5rem !important;">
            <SourcePreview formatted={formatted} on:format={onCustomize} editor={editor} isCoding={isCoding} />
        </section>
    </section>
</div>
<Footer />
