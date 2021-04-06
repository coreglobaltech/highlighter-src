export class Emitter {
    private _events: { [key in string]: Function[] } = {};

    public on(name: string, listener: Function): void {
        if (!this._events[name]) {
            this._events[name] = [];
        }

        this._events[name].push(listener);
    }

    public removeListener(name: string, remove: Function): void {
        if (!this._events[name]) {
            throw new Error(`Unable to remove listener. Event "${name}" does not exist.`);
        }

        const filterListeners = (listener) => listener !== remove;

        this._events[name] = this._events[name].filter(filterListeners);
    }

    public emit(name: string, data?: any): void {
        if (!this._events[name]) {
            throw new Error(`Unable to emit event. Event "${name}" does not exist.`);
        }

        const fireCallbacks = (callback) => {
            callback(data);
        };

        this._events[name].forEach(fireCallbacks);
    }
}
