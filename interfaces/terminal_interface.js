const blessed = require('blessed')
const { cpuInterface } = require('./cpu_interface')
const { display_width, display_height, color } = require('../data/const_vals')
const keyMap = require('../data/key_map')

class terminalInterface extends cpuInterface {
    constructor() {
        super()
        this.screen = blessed.screen({
            smartCSR: true
        })
        this.frameBuffer = this.createFrameBuffer()
        this.screen.title = 'chip8'
        this.color = blessed.helpers.attrToBinary({ fg: color })

        this.keys = 0
        this.keyPressed = undefined

        this.soundEnabled = false

        this.screen.key(['escape', 'C-c'], function () {
            process.exit(0)
        })

        this.screen.on('keypress', (_, key) => {
            const index = keyMap.indexOf(key.full)

            if (index > -1) {
                this.setKeys(index)
            }
        })

        setInterval(() => {
            this.resetKeys()
        }, 100)
    }

    createFrameBuffer() {
        let frameBuffer = []

        for (let i = 0; i < display_width; i++) {
            frameBuffer.push([])
            for (let j = 0; j < display_height; j++) {
                frameBuffer[i].push(0)
            }
        }

        return frameBuffer
    }

    setKeys(keyIndex) {
        //create a keyMask to identify the position of the key that was pressed, 
        //shifting by the index of the pressed key
        let keyMask = 1 << keyIndex
        //update the keys pressed with the pressed key
        this.keys = this.keys | keyMask
        //register the key pressed as the index of the most recent key pressed
        this.keyPressed = keyIndex
    }

    resetKeys() {
        this.keys = 0
        this.keyPressed = undefined
    }

    waitKey() {
        const keyPressed = this.keyPressed
        this.keyPressed = undefined

        return keyPressed
    }

    getKeys() {
        return this.keys
    }

    drawPixel(x, y, value) {
        const collision = this.frameBuffer[y][x] & value
        this.frameBuffer[y][x] ^= value

        if (this.frameBuffer[y][x]) {
            this.screen.fillRegion(this.color, '█', x, x + 1, y, y + 1)
        } else {
            this.screen.clearRegion(x, x + 1, y, y + 1)
        }

        this.screen.render()
        return collision
    }

    clearDisplay() {
        this.frameBuffer = this.createFrameBuffer()
        this.screen.clearRegion(0, display_width, 0, display_height)
    }

    enableSound() {
        this.soundEnabled = true
    }

    disableSound() {
        this.soundEnabled = false
    }
}


module.exports = { terminalInterface }




