<script lang="ts">
    import Anchor from "./Anchor.svelte";
</script>

<style>
    .app-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 99999;
    }
</style>

<div class="ui equal width padded grid app-footer">
    <div class="row" style="background-color: #2f3032">
        <div class="column">
            <h4 class="ui inverted left aligned header">
                <i class="plug icon"></i>
                <div class="content">
                    Powered By
                    <div class="sub header">
                        <Anchor url="https://svelte.dev/" name="Svelte"/> |
                        <Anchor url="https://ace.c9.io/" name="Ace" /> &
                        <Anchor url="https://highlightjs.org/" name="Highlight.js" />
                    </div>
                </div>
            </h4>
        </div>
        <div class="column">
            <h4 class="ui inverted center aligned header" style="position: absolute; left: 40%;">
                <i class="code branch icon"></i>
                <div class="content">
                    Source Code
                    <div class="sub header">
                        <Anchor name="GitHub" url="https://github.com/coreglobaltech/highlighter-src" />
                    </div>
                </div>
            </h4>
        </div>
        <div class="column">
            <h4 class="ui inverted right aligned header" style="position: absolute; right: 1rem;">
                <i class="balance scale icon"></i>
                <div class="content">
                    License
                    <div class="sub header">
                        <Anchor name="MIT" url="https://opensource.org/licenses/MIT" />
                    </div>
                </div>
            </h4>
        </div>
    </div>
</div>
