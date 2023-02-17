class Keyboard {
    #downListeners;
    #upListeners;
    #func;
    #keyCode;
    /**
     * The `Keyboard` class provides a simple interface for capturing keyboard events in a web browser.
     * It allows you to subscribe to keydown and keyup events, and execute custom functions when a key
     * is pressed or released. You can listen for specific key codes, or use the predefined key constants
     * in the `KeyCode` property of the class.
     *
     * Example usage:
     *
     * ```
     * const keyboard = new Keyboard();
     *
     * // Subscribe to key events
     * keyboard.subscribe();
     *
     * // Add a listener for the "A" key on keydown
     * keyboard.addListener(() => console.log("A key down"), keyboard.KeyCode.KeyA, true, false);
     *
     * // Add a listener for the "B" key on keyup
     * keyboard.addListener(() => console.log("B key up"), keyboard.KeyCode.KeyB, false, true);
     *
     * // Unsubscribe from key events when done
     * keyboard.unsubscribe();
     * ```
     */

    constructor() {
        this.keys = {};
        /**
         * An object with key names and their corresponding key codes.
         */
        this.KeyCode = {
            'Backspace': 8,
            'Tab': 9,
            'Enter': 13,
            'Shift': 16,
            'Ctrl': 17,
            'Alt': 18,
            'PauseBreak': 19,
            'CapsLock': 20,
            'Escape': 27,
            'Spacebar': 32,
            'PageUp': 33,
            'PageDown': 34,
            'End': 35,
            'Home': 36,
            'LeftArrow': 37,
            'UpArrow': 38,
            'RightArrow': 39,
            'DownArrow': 40,
            'Insert': 45,
            'Delete': 46,
            'A': 65,
            'B': 66,
            'C': 67,
            'D': 68,
            'E': 69,
            'F': 70,
            'G': 71,
            'H': 72,
            'I': 73,
            'J': 74,
            'K': 75,
            'L': 76,
            'M': 77,
            'N': 78,
            'O': 79,
            'P': 80,
            'Q': 81,
            'R': 82,
            'S': 83,
            'T': 84,
            'U': 85,
            'V': 86,
            'W': 87,
            'X': 88,
            'Y': 89,
            'Z': 90,
            'LeftWindowKey': 91,
            'RightWindowKey': 92,
            'SelectKey': 93,
            'Numpad0': 96,
            'Numpad1': 97,
            'Numpad2': 98,
            'Numpad3': 99,
            'Numpad4': 100,
            'Numpad5': 101,
            'Numpad6': 102,
            'Numpad7': 103,
            'Numpad8': 104,
            'Numpad9': 105,
            'Multiply': 106,
            'Add': 107,
            'Subtract': 109,
            'DecimalPoint': 110,
            'Divide': 111,
            'F1': 112,
            'F2': 113,
            'F3': 114,
            'F4': 115,
            'F5': 116,
            'F6': 117,
            'F7': 118,
            'F8': 119,
            'F9': 120,
            'F10': 121,
            'F11': 122,
            'F12': 123,
            'NumLock': 144,
            'ScrollLock': 145,
            'SemiColon': 186,
            'EqualSign': 187,
            'Comma': 188,
            'Dash': 189,
            'Period': 190,
            'ForwardSlash': 191,
            'GraveAccent': 192,
            'OpenBracket': 219,
            'Backslash': 220,
            'CloseBracket': 221,
            'SingleQuote': 222,
        };
        this.#downListeners = [];
        this.#upListeners = [];
        /**
         * @type {HTMLElement}
         */
        this.element = window;
    }

    #handleKeyDown = (event) => {
        const keyCode = event.keyCode;
        if (this.keys[keyCode]) return;
        this.keys[keyCode] = true;

        for (let i = 0; i < this.#downListeners.length; i++) {
            const func = this.#downListeners[i];
            if (func.keyCode == keyCode) { func.func(); };
        }
    };

    #handleKeyUp = (event) => {
        const keyCode = event.keyCode;
        if (!this.keys[keyCode]) return;
        this.keys[keyCode] = false;

        for (let i = 0; i < this.#upListeners.length; i++) {
            const func = this.#upListeners[i];
            if (func.keyCode == keyCode) { func.func(); };

        }
    };

    /**
     * Add keydown and keyup listeners.
     */
    subscribe() {
        this.element.addEventListener('keydown', this.#handleKeyDown);
        this.element.addEventListener('keyup', this.#handleKeyUp);
    }

    /**
     * Remove keydown and keyup listeners.
     */
    unsubscribe() {
        this.element.removeEventListener('keydown', this.#handleKeyDown);
        this.element.removeEventListener('keyup', this.#handleKeyUp);
    }

    /**
     * Adds a listener function to the keydown or keyup event for a specified keyCode.
     *
     * @param {function} func - The listener function to be called when the keydown or keyup event is triggered.
     * @param {number} keyCode - The keyCode to listen for key events on.
     * @param {boolean} [keydown=true] - Whether to listen for keydown events (default: true).
     * @param {boolean} [keyup=true] - Whether to listen for keyup events (default: true).
     * @returns {void}
     */

    addListener(func, keyCode, keydown, keyup) {
        this.#func = func;
        this.#keyCode = keyCode;
        if (keydown) {
            this.#downListeners.push({ keyCode: this.#keyCode, func: this.#func });
        }

        if (keyup) {
            this.#upListeners.push({ keyCode: this.#keyCode, func: this.#func });
        }
    }

    /**
     * Removes a listener function from the key event system for a specified key code and key event type.
     * @param {function} func The listener function to be removed.
     * @param {number} keyCode The key code to remove from the listener event.
     * @param {boolean} keydown If set, the keydown listener event will be removed.
     * @param {boolean} keyup If set, the keyup listener event will be removed.
     * @returns {void}
     */
    removeListener(func, keyCode, keydown = true, keyup = true) {
        if (keydown) {
            let found = false;
            for (let i = 0; i < this.#downListeners.length; i++) {
                const listener = this.#downListeners[i];

                if (listener.keyCode == keyCode && listener.func === func) {
                    found = true;
                    this.#downListeners.splice(i, 1);
                    i--;
                }
            }

            if (!found) console.warn("At removeListener(): Could not find any listeners to remove, is the func param correct?");
        }

        if (keyup) {
            let found = false;
            for (let i = 0; i < this.#upListeners.length; i++) {
                const listener = this.#upListeners[i];

                if (listener.keyCode == keyCode && listener.func === func) {
                    found = true;
                    this.#upListeners.splice(i, 1);
                    i--;
                }
            }

            if (!found) console.warn("At removeListener(): Could not find any listeners to remove, is the func param correct?");
        }
    }

    /**
     * Checks if a key is currently pressed down.
     * 
     * @param {number} keyCode - The code of the key to check.
     * @returns {boolean} Returns `true` if the key is currently pressed down, or `false` otherwise.
     */

    isKeyDown(keyCode) {
        if (this.keys[keyCode]) {
            return this.keys[keyCode];
        }
        return false;
    }

    /**
     * Removes all registered listeners for all key events.
     * @returns {void}
     */
    removeAllListeners() {
        this.#downListeners = [];
        this.#upListeners = [];
    }

    /**
     * Returns the name of a key code.
     * @param {number} keyCode The key code to return the name of.
     * @returns {string}
     */
    getKeyName(keyCode) {
        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }

        return getKeyByValue(this.keys, keyCode);
    }
    // TODO: test all of these for error handling and add if needed

    /**
     * Binds all key listeners to the specified HTML element. 
     * @param {HTMLElement} elmt The HTML element to bind all listeners to.
     */
    bindToElement(elmt) {
        this.element = elmt;
        try {
            this.unsubscribe();
            this.subscribe();
        } catch(err) {
            console.error(err, "Element does not exist. Defaulting to previous.");
        }
    }

    /**
     * Resets the keys array.
     * @returns {void}
     */
    clearKeys() {
        this.keys = {};
    }
}

let show = (function () {
    console.log(keyboard.isKeyDown(keyboard.KeyCode.Shift));
});

// Initialization
let keyboard = new Keyboard();
keyboard.subscribe();

// Listen only on canvas element
keyboard.bindToElement(document.getElementById('canvas'));

// At listener for both keydown and keyup
keyboard.addListener(show, keyboard.KeyCode.Shift, true, true);