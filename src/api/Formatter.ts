/**
 * Language images from (License - MIT): https://github.com/PKief/vscode-material-icon-theme/blob/master/icons/
 */
import { Emitter } from './Emitter';

interface Language {
    selected?: boolean;
    ace: string;
    name: string;
    value: string;
    image: string;
}

interface Style {
    name: string;
    style: string;
}

/**
 * This function creates a language object for the programming languages list
 * @param {string} name The formal name of the language
 * @param {string} value The valid highlight.js name of the language
 * @param {string} image An image that represents the programming language
 * @param {string} ace The ace registry key of the programming language
 * @param {boolean} selected Whether or not this language is the default programming language
 * @returns {Language} The newly created language object
 */
function createLanguage(name: string, value: string, image: string, ace: string, selected?: boolean): Language {
    return {
        ace: ace,
        name: name,
        value: value,
        image: `images/${image || name}.svg`,
        selected: selected
    };
}

// --------   JSON Theming   --------

interface ThemeJSON {
    // Checkboxes
    boolean: {
        BOX_OUTLINE: boolean;
        LEFT_BORDER: boolean;
        LINE_NUMBERS: boolean;
    }

    // Font Sizing
    number: {
        FONT_SIZE: number;
    }

    string: {
        // Non-source Colors
        COLOR_FONT: string;
        COLOR_BACKGROUND: string;
        COLOR_BOX_OUTLINE: string;
        COLOR_LEFT_BORDER: string;

        // Source Colors
        SYNTAX: string;
        META: string;
        NUMBERS: string;
        STRINGS: string;
        COMMENTS: string;
    }
}

export class Theme {
    public static export(): string {
        const theme: ThemeJSON = {
            boolean: {
                BOX_OUTLINE: Formatter.BOX_OUTLINE,
                LEFT_BORDER: Formatter.LEFT_BORDER,
                LINE_NUMBERS: Formatter.LINE_NUMBERS
            },

            number: {
                FONT_SIZE: Formatter.FONT_SIZE,
            },

            string: {
                COLOR_FONT: Formatter.COLOR_FONT,
                COLOR_BACKGROUND: Formatter.COLOR_BACKGROUND,
                COLOR_BOX_OUTLINE: Formatter.COLOR_BOX_OUTLINE,
                COLOR_LEFT_BORDER: Formatter.COLOR_LEFT_BORDER,
                SYNTAX: Formatter.SYNTAX[0].style,
                META: Formatter.META[0].style,
                NUMBERS: Formatter.NUMBERS[0].style,
                STRINGS: Formatter.STRINGS[0].style,
                COMMENTS: Formatter.COMMENTS[0].style
            }
        };

        return JSON.stringify(theme, null, 2);
    }

    protected static isHex(hex: string): boolean {
        hex = hex.replace('#', '');

        if (hex.length === 6 && hex.match(/([A-F0-9]{6})/gi)) {
            return true;
        }
    }

    public static import(theme: string): void {
        const imported: Theme = JSON.parse(theme);

        for (const type in imported) {
            for (const value in imported[type]) {
                const result = imported[type][value];

                if (typeof result === type) {
                    if (typeof result === 'string' && Theme.isHex(result)) {
                        if (value.includes('COLOR_')) {
                            Formatter[value] = result;
                        } else {
                            Formatter[value][0].style = result;
                        }
                    } else if (typeof result !== 'string') {
                        Formatter[value] = result;
                    }
                }
            }
        }

        Formatter.customize();
        Formatter.emitter.emit('import');
    }
}

// -------- Formatting Class --------
export class Formatter {
    public static emitter = new Emitter();
    public static editor: any = {};

    public static customize(): void {
        if (Formatter.editor.session) {
            Formatter.editor.session.setValue(Formatter.editor.getValue());
        }
    }

    public static getAce(value: string): string {
        for (const lang of Formatter.languages) {
            if (lang.value === value) {
                return lang.ace;
            }
        }

        return "java";
    }

    public static languages: Language[] = [
        createLanguage("C", "c", "c", "c_cpp"),
        createLanguage("C#", "cs", "csharp", "csharp"),
        createLanguage("C++", "cc", "cpp", "c_cpp"),
        createLanguage("CSS", "css", "css", "css"),
        createLanguage("HTML", "xhtml", "html", "html"),
        createLanguage("XML", "xhtml", "xaml", "xml"),
        createLanguage("Java", "jsp", "java", "java", true),
        createLanguage("JavaScript", "js", "javascript", "javascript"),
        createLanguage("Lua", "lua", "lua", "lua"),
        createLanguage("Python", "py", "python", "python"),
        createLanguage("SCSS", "scss", "sass", "scss"),
        createLanguage("SQL", "sql", "database", "sql"),
        createLanguage("TypeScript", "ts", "typescript", "typescript"),
        createLanguage("Visual Basic (.NET)", "vb", "visualstudio", "vbscript")
    ];

    public static BOX_OUTLINE: boolean = true;
    public static LEFT_BORDER: boolean = true;
    public static LINE_NUMBERS: boolean = true;
    public static FONT_SIZE: number = 13;
    public static COLOR_FONT: string = "#000000";
    public static COLOR_BACKGROUND: string = "#FFFFFF";
    public static COLOR_BOX_OUTLINE: string = "#808080";
    public static COLOR_LEFT_BORDER: string = "#808080";
    public static SYNTAX: Style[] = [{ name: 'color', style: '#941EDF' }, { name: 'font-weight', style: 'bold' }];
    public static META: Style[] = [{ name: 'color', style: '#FF3B3B' }, { name: 'font-weight', style: 'bold' }];
    public static NUMBERS: Style[] = [{ name: 'color', style: '#0066FF' }];
    public static STRINGS: Style[] = [{ name: 'color', style: '#00A000' }];
    public static COMMENTS: Style[] = [{ name: 'color', style: '#E65D00' }];
    public static BOLD: Style[] = [{ name: 'font-weight', style: 'bold' }];
    public static CSS: Map<string, Style[]> = new Map([
        /* Purple Theming */
        ['hljs-keyword', Formatter.SYNTAX],
        ['hljs-type', Formatter.SYNTAX],
        ['hljs-literal', Formatter.SYNTAX],
        ['hljs-selector-class', Formatter.SYNTAX],
        ['hljs-selector-tag', Formatter.SYNTAX],
        ['hljs-selector-id', Formatter.SYNTAX],
        ['hljs-name', Formatter.SYNTAX],
        /* Dark Red Theming */
        ['hljs-built_in', Formatter.META],
        ['hljs-selector-attr', Formatter.META],
        ['hljs-meta', Formatter.META],
        ['hljs-selector-pseudo', Formatter.META],
        /* Blue Theming */
        ['hljs-number', Formatter.NUMBERS],
        /* Green Theming */
        ['hljs-string', Formatter.STRINGS],
        ['hljs-regexp', Formatter.STRINGS],
        /* Orange Theming */
        ['hljs-comment', Formatter.COMMENTS],
        /* Bold Theming */
        ['hljs-variable', Formatter.BOLD],
        ['hljs-title', Formatter.BOLD],
        ['hljs-params', Formatter.BOLD],
        ['hljs-doctag', Formatter.BOLD],
        ['hljs-attribute', Formatter.BOLD],
        ['hljs-attr', Formatter.BOLD]
    ]);

    public static OUTPUT: string = " ";
    public static update: () => void;
}
