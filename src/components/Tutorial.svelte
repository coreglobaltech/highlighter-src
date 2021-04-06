<script lang="ts">
    import Tab from "./tutorial/Tab.svelte";
    import Stepper from "./tutorial/Stepper.svelte";

    let tabs = {
        isPostingTab: true,
        isSourceTab: false,
        isFormattedTab: false,
        isD2LTab: false,
        isOptionsTab: false
    };
</script>

<div class="ui modal">
    <div class="ui header">
        <i class="blue question icon"></i>
        <div class="content">
            Highlighter Tutorial
        </div>
    </div>
    <div class="scrolling content" style="background-color: #fafafa;">
        <div class="ui top attached tabular menu" style="background-color: #fafafa;">
            <Tab name="Posting Code" key="isPostingTab" bind:tabs={tabs} />
            <Tab name="Source Code" key="isSourceTab" bind:tabs={tabs} />
            <Tab name="Formatted Code" key="isFormattedTab" bind:tabs={tabs} />
            <Tab name="D2L Preview" key="isD2LTab" bind:tabs={tabs} />
            <Tab name="Formatting Options" key="isOptionsTab" bind:tabs={tabs} />
        </div>
        <div class="ui bottom attached segment" style="background-color: #eaeaea;">
            {#if tabs.isPostingTab}
                <Stepper>
                    <div class="step">
                        <div class="content">
                            <div class="title"><i class="blue copy icon"></i> Copy HTML</div>
                            <div class="description">
                                Click the <i class="copy icon"></i><b>Copy</b> button below the
                                <i class="file code outline icon"></i><b>Formatted Code</b> window.
                            </div>
                        </div>
                    </div>
                    <div class="step">
                        <div class="content">
                            <div class="title"><i class="blue comment alternate icon"></i> Start D2L Post</div>
                            <div class="description">Start a new D2L post.</div>
                        </div>
                    </div>
                    <div class="step">
                        <div class="content">
                            <div class="title"><i class="blue code icon"></i> Open HTML Window</div>
                            <div class="description">
                                Click on the <i class="code icon"></i> icon in the bottom right of the post window.
                            </div>
                        </div>
                    </div>
                    <div class="step">
                        <div class="content">
                            <div class="title"><i class="blue clipboard icon"></i> Paste HTML</div>
                            <div class="description">Paste in the code copied from the first step.</div>
                        </div>
                    </div>
                    <div class="step">
                        <div class="content">
                            <div class="title"><i class="blue save icon"></i> Save</div>
                            <div class="description">Click on the <b>Save</b> button.</div>
                        </div>
                    </div>
                    <div class="step">
                        <div class="content">
                            <div class="title"><i class="blue search icon"></i> Preview</div>
                            <div class="description">
                                You can preview the post by clicking on the paper icon with the magnifying glass on top.
                            </div>
                        </div>
                    </div>
                    <div class="step">
                        <div class="content">
                            <div class="title"><i class="blue share icon"></i> Post</div>
                            <div class="description">Click on the <b>Post</b> button once you are happy with how things look.</div>
                        </div>
                    </div>
                </Stepper>
            {:else if tabs.isSourceTab}
                <Stepper>
                    <div class="step">
                        <i class="blue file alternate outline icon"></i>
                        <div class="content">
                            <div class="title">Source Code</div>
                            <div class="description">
                                You can type source code into the embedded text area to quickly share code.
                            </div>
                        </div>
                    </div>
                    <div class="step">
                        <i class="blue upload icon"></i>
                        <div class="content">
                            <div class="title">Open</div>
                            <div class="description">
                                You can load code from your local machine by using the <i class="upload icon"></i><b>Open</b> button.
                            </div>
                        </div>
                    </div>
                    <div class="step">
                        <i class="blue clipboard icon"></i>
                        <div class="content">
                            <div class="title">Paste</div>
                            <div class="description">
                                You can paste code from your clipboard by using the <i class="clipboard icon"></i><b>Paste</b> button.
                            </div>
                        </div>
                    </div>
                    <div class="step">
                        <i class="blue coffee icon"></i>
                        <div class="content">
                            <div class="title">Language</div>
                            <div class="description">
                                You can change your programming language by using the dropdown menu.
                            </div>
                        </div>
                    </div>
                </Stepper>
            {:else if tabs.isFormattedTab}
                <Stepper>
                    <div class="step">
                        <i class="blue file code outline icon"></i>
                        <div class="content">
                            <div class="title">Formatted Code</div>
                            <div class="description">
                                This embedded textarea contains the formatted HTML that will be copied into the D2L HTML window.
                            </div>
                        </div>
                    </div>
                    <div class="step">
                        <i class="blue save icon"></i>
                        <div class="content">
                            <div class="title">Save</div>
                            <div class="description">
                                You can save the formatted HTML code by using the <i class="save icon"></i><b>Save</b> button.
                            </div>
                        </div>
                    </div>
                    <div class="step">
                        <i class="blue copy icon"></i>
                        <div class="content">
                            <div class="title">Copy</div>
                            <div class="description">
                                You can copy code to your clipboard by using the <i class="copy icon"></i><b>Copy</b> button.
                            </div>
                        </div>
                    </div>
                </Stepper>
            {:else if tabs.isD2LTab}
                <Stepper>
                    <div class="step">
                        <i class="blue print icon"></i>
                        <div class="content">
                            <div class="title">D2L Preview</div>
                            <div class="description">
                                <p style="margin: 0;">This area displays a preview of what the code will look like in a D2L post.</p>
                                <p>Note that the width of the preview area is <b>larger</b> than what will be available in D2L.</p>
                            </div>
                        </div>
                    </div>
                </Stepper>
            {:else if tabs.isOptionsTab}
                <Stepper>
                    <div class="step">
                        <i class="blue drafting compass icon"></i>
                        <div class="content">
                            <div class="title">Formatting Options</div>
                            <div class="description">
                                You can customize the way the formatted source code looks by using the following options.
                            </div>
                        </div>
                    </div>
                    <div class="step">
                        <i class="blue ruler combined icon"></i>
                        <div class="content">
                            <div class="title">Lines & Bordering</div>
                            <div class="description">
                                Use the checkboxes to modify the border or toggle the usage of line numbers.
                            </div>
                        </div>
                    </div>
                    <div class="step">
                        <i class="blue pencil alternate icon"></i>
                        <div class="content">
                            <div class="title">Font Size</div>
                            <div class="description">
                                Use the slider to modify the font size.
                            </div>
                        </div>
                    </div>
                    <div class="step">
                        <i class="blue paint roller icon"></i>
                        <div class="content">
                            <div class="title">Colors</div>
                            <div class="description">
                                Click on a colored circle and use the color picker popup to modify the clicked color.
                            </div>
                        </div>
                    </div>
                    <div class="step">
                        <i class="blue brush icon"></i>
                        <div class="content">
                            <div class="title">Theming</div>
                            <div class="description">
                                <p style="margin: 0;">Use the <i class="download icon"></i><b>Export</b> button to
                                download the current formatting options.</p>
                                <p>Use the <i class="upload icon"></i><b>Import</b> button to import saved formatting options.</p>
                            </div>
                        </div>
                    </div>
                </Stepper>
            {/if}
        </div>
    </div>
    <div class="actions" style="background-color: #fafafa;">
        <div class="ui positive right labeled icon button">
            Got it
            <i class="checkmark icon"></i>
        </div>
    </div>
</div>
