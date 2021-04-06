<script lang="ts">
    import Picker from './Picker.svelte';
    import { Formatter } from '../api/Formatter';
    import { onDestroy } from 'svelte';

    export let name: string = "undefined";
    export let color: string = "#000";
    export let description: string = "Click on the dot to edit.";
    let id = name.replace(" ", "-");

    const onImport = () => {
        switch(name) {
            case "Keywords":
                color = Formatter.SYNTAX[0].style;
                break;
            case "Strings":
                color = Formatter.STRINGS[0].style;
                break;
            case "Numbers":
                color = Formatter.NUMBERS[0].style;
                break;
            case "Comments":
                color = Formatter.COMMENTS[0].style;
                break;
            case "Meta":
                color = Formatter.META[0].style;
                break;
            case "Background":
                color = Formatter.COLOR_BACKGROUND;
                break;
            case "Left Border":
                color = Formatter.COLOR_LEFT_BORDER;
                break
            case "Box Outline":
                color = Formatter.COLOR_BOX_OUTLINE;
                break;
            case "Default":
                color = Formatter.COLOR_FONT;
                break;
        }
    };

    Formatter.emitter.on('import', onImport);

    onDestroy(() => {
        Formatter.emitter.removeListener('import', onImport);
    });

    function onColor(rgba) {
        color = rgba.detail[0];

        switch(name) {
            case "Keywords":
                Formatter.SYNTAX[0].style = color;
                break;
            case "Strings":
                Formatter.STRINGS[0].style = color;
                break;
            case "Numbers":
                Formatter.NUMBERS[0].style = color;
                break;
            case "Comments":
                Formatter.COMMENTS[0].style = color;
                break;
            case "Meta":
                Formatter.META[0].style = color;
                break;
            case "Background":
                Formatter.COLOR_BACKGROUND = color;
                break;
            case "Left Border":
                Formatter.COLOR_LEFT_BORDER = color;
                break
            case "Box Outline":
                Formatter.COLOR_BOX_OUTLINE = color;
                break;
            case "Default":
                Formatter.COLOR_FONT = color;
                break;
        }

        Formatter.customize();
    }

    function load(): void {
        (<any>window).jQuery(`#activate-${id}`).popup({
            on: 'click',
            position: 'bottom center',
            popup: `#picker-${id}`
        });
    }
</script>

<style>
    .dot {
        width: 25px !important;
        height: 25px !important;
        border: 3px solid #292929;
        border-radius: 50%;
        cursor: pointer;
    }

    .grow { transition: all .2s ease-in-out; }
    .grow:hover { transform: scale(1.1); }

    .title { transition: all .2s ease-in-out; }
    .title:hover {
        color: #2185D0;
        font-weight: bold;
        cursor: default;
    }
</style>

<svelte:window on:load="{ () => load() }"/>

<div class="center aligned column title" style="margin-bottom: 1rem;" id="activate-{id}">
    <img class="dot grow" style="background-color: {color}" src="images/blank.png">
    <div class="ui popup hidden" id="picker-{id}" style="z-index: 100001 !important;">
        <h4 class="ui center aligned header">
            {name}
        </h4>
        <Picker on:colorChange={onColor} bind:startColor={color}/>
    </div>
    <p data-tooltip="{description}" data-position="bottom right" data-inverted="">{ name }</p>
</div>
