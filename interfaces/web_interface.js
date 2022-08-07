const { cpuInterface } = require('./cpu_interface')
const { display_height, display_width, color } = require('../data/const_vals')
const keyMap = require('../data/key_map')

class webInterface extends cpuInterface {
    constructor() {
        super()

        this.frameBuffer = this.createFrameBuffer()
        this.screen = document.querySelector('canvas')
        this.multiplier = 10
        this.screen.width = display_width * this.multiplier
        this.screen.height = display_height * this.multiplier
        this.context = this.screen.getContext('2d')
        this.context.fillStyle = 'black'
        this.context.fillRect(0, 0, this.screen.width, this.screen.height)

        this.keys = 0
        this.keyPressed = undefined

        this.soundEnabled = false

        document.addEventListener('keydown', event => {
            const index = keyMap.indexOf(event.key)
            if (index > -1) {
                this.setKeys(index)
            }
        })

        document.addEventListener('keyup', event => {
            this.resetKeys()
        })

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
        //returns true if this collides with something that is already a 1, or already set
        const collision = this.frameBuffer[y][x] & value
        this.frameBuffer[y][x] ^= value

        if (this.frameBuffer[y][x]) {
            this.context.fillStyle = color
            //identify where to fill rect using the coordinates and upscaling them, and then specify the dimensions of the rect to be 
            //1/64 and 1/32 of the screen's dimensions
            this.context.fillRect(
                x * this.multiplier,
                y * this.multiplier,
                this.multiplier,
                this.multiplier)
        } else {
            this.context.fillStyle = 'black'
            this.context.fillRect(
                x * this.multiplier,
                y * this.multiplier,
                this.multiplier,
                this.multiplier)
        }

        return collision
    }

    clearDisplay() {
        this.frameBuffer = this.createFrameBuffer()
        this.context.fillStyle = 'black'
        this.context.fillRect(0, 0, this.screen.width, this.screen.height)
    }
}

module.exports = {
    webInterface
}