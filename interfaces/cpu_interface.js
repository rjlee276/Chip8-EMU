
class cpuInterface {
    constructor() { }

    clearDisplay() {
        throw new TypeError('Must be implemented on inherited class')
    }

    waitKey() {
        throw new TypeError('Must be implemented on inherited class')
    }

    getKeys() {
        throw new TypeError('Must be implemented on inherited class')
    }

    drawPixel() {
        throw new TypeError('Must be implemented on inherited class')
    }

    enableSound() {
        throw new TypeError('Must be implemented on inherited class')
    }

    disableSound() {
        throw new TypeError('Must be implemented on inherited class')
    }

    setKeys() {
        throw new TypeError('Must be implemented on inherited class')
    }

    resetKeys() {
        throw new TypeError('Must be implemented on inherited class')
    }
}

module.exports = { cpuInterface }