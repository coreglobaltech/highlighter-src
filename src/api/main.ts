import { Formatter } from './Formatter';

const worker = new Worker('scripts/worker.js');

interface WorkerEvent extends Event {
    data: any;
}

export function main() {
    worker.addEventListener('message', (event: WorkerEvent) => {
        if (event.data.run === 'highlight') {
            Formatter.OUTPUT = event.data.out;
            Formatter.update();
        }
    });

    worker.addEventListener('error', (err: ErrorEvent) => {
        console.error('error received from worker => ', err);
    });
}

export function highlight(language: string, source: string) {
    worker.postMessage({ run: 'highlight', transfer: { language, source, options: {
        BOX_OUTLINE: Formatter.BOX_OUTLINE,
        COLOR_BACKGROUND: Formatter.COLOR_BACKGROUND,
        COLOR_BOX_OUTLINE: Formatter.COLOR_BOX_OUTLINE,
        COLOR_FONT: Formatter.COLOR_FONT,
        COLOR_LEFT_BORDER: Formatter.COLOR_LEFT_BORDER,
        CSS: Formatter.CSS,
        FONT_SIZE: Formatter.FONT_SIZE,
        LEFT_BORDER: Formatter.LEFT_BORDER,
        LINE_NUMBERS: Formatter.LINE_NUMBERS
    }}});
}
