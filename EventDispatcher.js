export class EventDispatcher {

    constructor() {
        this._listeners = []
    }

    hasEventListener(type, listener) {
        return this._listeners.some(item => item.type === type && item.listener === listener)
    }

    addEventListener(type, listener) {
        if (!this.hasEventListener(type, listener)) {
            this._listeners[this._listeners.length] = { type, listener, options: { once: false } }
        }
        return this
    }
    /**
     * 
     * @param {Array<Array>} listeners 
     */
    addEventListeners(listeners) {
        if (!Array.isArray(listeners)) {
            listeners = [listeners]
        }
        for (let i = 0, n = listeners.length; i < n; i++) {
            const [type, listener] = listeners[i]
            if (type && listener && !this.hasEventListener(type, listener)) {
                this._listeners[this._listeners.length] = { type, listener, options: { once: false } }
            }
        }
        return this
    }

    removeEventListener(type, listener) {
        let index = this._listeners.findIndex(item => item.type === type && item.listener === listener)
        if (index > -1) this._listeners.splice(index, 1)
        return this
    }

    removeEventListeners() {
        this._listeners = []
        return this
    }

    dispatchEvent(evt) {
        this._listeners
            .filter(item => item.type === evt.type)
            .forEach(item => {
                const { type, listener, options: { once } } = item
                listener.call(this, evt)
                if (once === true) this.removeEventListener(type, listener)
            })
        return this
    }
}