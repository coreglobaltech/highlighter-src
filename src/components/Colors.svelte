<script lang="ts">
    import ColorItem from './ColorItem.svelte';
    import { Formatter } from '../api/Formatter';
    import { createEventDispatcher } from 'svelte';

    let keywords: string = Formatter.SYNTAX[0].style;
    let strings: string = Formatter.STRINGS[0].style;
    let numbers: string = Formatter.NUMBERS[0].style;
    let comments: string = Formatter.COMMENTS[0].style;
    let meta: string = Formatter.META[0].style;
    let background: string = Formatter.COLOR_BACKGROUND;
    let leftBorder: string = Formatter.COLOR_LEFT_BORDER;
    let boxOutline: string = Formatter.COLOR_BOX_OUTLINE;
    let font: string = Formatter.COLOR_FONT;

    const dispatch = createEventDispatcher();
    const descriptions = {
        keywords: `Highlights reserved words.`,
        strings: `Highlights strings — covers all string enclosures and multiline.`,
        numbers: `Highlights numbers — covers scientific and all other forms of numbers.`,
        comments: `Highlights comments — covers multiline and offers doc support.`,
        meta: `Highlights built-ins, attributes, and pseudo values — not all languages support this.`,
        background: `Background color of post.`,
        left_border: `Color of the bar on the left side of the post.`,
        box_outline: `Color of the box outline that surrounds the post.`,
        default: `Color of words that are without a color.`
    };

    function onColor() {
        dispatch('format');
    }
</script>

<div class="ui grid">
    <div class="three column row">
        <ColorItem name="Keywords" bind:color={keywords} description="{descriptions.keywords}" on:format={onColor} />
        <ColorItem name="Strings" bind:color={strings} description="{descriptions.strings}" on:format={onColor} />
        <ColorItem name="Numbers" bind:color={numbers} description="{descriptions.numbers}" on:format={onColor} />
        <ColorItem name="Comments" bind:color={comments} description="{descriptions.comments}" on:format={onColor} />
        <ColorItem name="Meta" bind:color={meta} description="{descriptions.meta}" on:format={onColor} />
        <ColorItem name="Background" bind:color={background} description="{descriptions.background}" on:format={onColor} />
        <ColorItem name="Left Border" bind:color={leftBorder} description="{descriptions.left_border}" on:format={onColor} />
        <ColorItem name="Box Outline" bind:color={boxOutline} description="{descriptions.box_outline}" on:format={onColor} />
        <ColorItem name="Default" bind:color={font} description="{descriptions.default}" on:format={onColor} />
    </div>
</div>
