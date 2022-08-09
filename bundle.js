(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
instruction_set = [

    {
        id: 'CLS',
        name: 'CLS',
        mask: 0xffff,
        pattern: 0x00e0,
        arguments: [],

    },

    {
        id: 'RET',
        name: 'RET',
        mask: 0xffff,
        pattern: 0x00ee,
        arguments: [],
    },

    {
        id: 'JMP_ADDR',
        name: 'JMP',
        mask: 0xf000,
        pattern: 0x1000,
        arguments: [{ mask: 0x0fff, shift: 0, type: 'A' }]
    },

    {
        id: 'CALL_ADDR',
        name: 'CALL',
        mask: 0xf000,
        pattern: 0x2000,
        arguments: [{ mask: 0x0fff, shift: 0, type: 'A' }]
    },

    {
        id: 'SE_VX_NN',
        name: 'SE',
        mask: 0xf000,
        pattern: 0x3000,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }]
    },

    {
        id: 'SNE_VX_NN',
        name: 'SNE',
        mask: 0xf000,
        pattern: 0x4000,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }]
    },

    {
        id: 'SE_VX_VY',
        name: 'SE',
        mask: 0xf00f,
        pattern: 0x5000,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }]
    },

    {
        id: 'LD_VX_NN',
        name: 'LD',
        mask: 0xf000,
        pattern: 0x6000,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }]
    },

    {
        id: 'ADD_VX_NN',
        name: 'ADD',
        mask: 0xf000,
        pattern: 0x7000,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }]
    },

    {
        id: 'LD_VX_VY',
        name: 'LD',
        mask: 0xf00f,
        pattern: 0x8000,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }]
    },

    {
        id: 'OR_VX_VY',
        name: 'OR',
        mask: 0xf00f,
        pattern: 0x8001,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }]
    },

    {
        id: 'AND_VX_VY',
        name: 'AND',
        mask: 0xf00f,
        pattern: 0x8002,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }]
    },

    {
        id: 'XOR_VX_VY',
        name: 'XOR',
        mask: 0xf00f,
        pattern: 0x8003,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }]
    },

    {
        id: 'ADD_VX_VY',
        name: 'ADD',
        mask: 0xf00f,
        pattern: 0x8004,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }]
    },

    {
        id: 'SUB_VX_VY',
        name: 'SUB',
        mask: 0xf00f,
        pattern: 0x8005,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }]
    },

    {
        id: 'SHR_VX_VY',
        name: 'SHR',
        mask: 0xf00f,
        pattern: 0x8006,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }]
    },

    {
        id: 'SUBN_VX_VY',
        name: 'SUBN',
        mask: 0xf00f,
        pattern: 0x8007,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }]
    },

    {
        id: 'SHL_VX_VY',
        name: 'SHL',
        mask: 0xf00f,
        pattern: 0x800e,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }]
    },

    {
        id: 'SNE_VX_VY',
        name: 'SNE',
        mask: 0xf00f,
        pattern: 0x9000,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }]
    },

    {
        id: 'LD_I_ADDR',
        name: 'LD',
        mask: 0xf000,
        pattern: 0xa000,
        arguments: [{ mask: 0x0000, shift: 0, type: 'I' }, { mask: 0x0fff, shift: 0, type: 'A' }]
    },

    {
        id: 'JMP_V0_ADDR',
        name: 'JMP',
        mask: 0xf000,
        pattern: 0xb000,
        arguments: [{ mask: 0x0000, shift: 0, type: 'V0' }, { mask: 0x0fff, shift: 0, type: 'A' }]
    },

    {
        id: 'RND_VX_NN',
        name: 'RND',
        mask: 0xf000,
        pattern: 0xc000,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }]
    },

    {
        id: 'DRW_VX_VY_N',
        name: 'DRW',
        mask: 0xf000,
        pattern: 0xd000,
        arguments: [
            { mask: 0x0f00, shift: 8, type: 'R' },
            { mask: 0x00f0, shift: 4, type: 'R' },
            { mask: 0x000f, shift: 0, type: 'N' }
        ]
    },

    {
        id: 'SKP_VX',
        name: 'SKP',
        mask: 0xf0ff,
        pattern: 0xe09e,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }]
    },

    {
        id: 'SKNP_VX',
        name: 'SKNP',
        mask: 0xf0ff,
        pattern: 0xe0a1,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }]
    },

    {
        id: 'LD_VX_DT',
        name: 'LD',
        mask: 0xf00f,
        pattern: 0xf007,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x0000, shift: 0, type: 'DT' }]
    },

    {
        id: 'LD_VX_N',
        name: 'LD',
        mask: 0xf00f,
        pattern: 0xf00a,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x0000, shift: 0, type: 'K' }]
    },

    {
        id: 'LD_DT_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf015,
        arguments: [{ mask: 0x0000, shift: 0, type: 'DT' }, { mask: 0x0f00, shift: 8, type: 'R' }]
    },

    {
        id: 'LD_ST_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf018,
        arguments: [{ mask: 0x0000, shift: 0, type: 'ST' }, { mask: 0x0f00, shift: 8, type: 'R' }]
    },

    {
        id: 'ADD_I_VX',
        name: 'ADD',
        mask: 0xf0ff,
        pattern: 0xf01e,
        arguments: [{ mask: 0x0000, shift: 0, type: 'I' }, { mask: 0x0f00, shift: 8, type: 'R' }]
    },

    {
        id: 'LD_F_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf029,
        arguments: [{ mask: 0x0000, shift: 0, type: 'I' }, { mask: 0x0f00, shift: 8, type: 'R' }]
    },

    {
        id: 'LD_B_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf033,
        arguments: [{ mask: 0x0000, shift: 0, type: 'B' }, { mask: 0x0f00, shift: 8, type: 'R' }]
    },

    {
        id: 'LD_I_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf055,
        arguments: [{ mask: 0x0000, shift: 0, type: '[I]' }, { mask: 0x0f00, shift: 8, type: 'R' }]
    },

    {
        id: 'LD_VX_I',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf065,
        arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x0000, shift: 0, type: '[I]' }]
    },

    {
        id: 'DW',
        name: 'DW',
        mask: 0x0000,
        pattern: 0x0000,
        arguments: [{ mask: 0xffff, shift: 0, type: 'DW' }]
    }

]

module.exports = { instruction_set }
},{}],2:[function(require,module,exports){
const display_height = 32
const display_width = 64
const color = '#33ff66'

module.exports = {
    display_width,
    display_height,
    color
}
},{}],3:[function(require,module,exports){
const font_set =
    [
        0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
        0x20, 0x60, 0x20, 0x20, 0x70, // 1
        0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
        0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
        0x90, 0x90, 0xF0, 0x10, 0x10, // 4
        0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
        0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
        0xF0, 0x10, 0x20, 0x40, 0x40, // 7
        0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
        0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
        0xF0, 0x90, 0xF0, 0x90, 0x90, // A
        0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
        0xF0, 0x80, 0x80, 0x80, 0xF0, // C
        0xE0, 0x90, 0x90, 0x90, 0xE0, // D
        0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
        0xF0, 0x80, 0xF0, 0x80, 0x80  // F
    ]

module.exports = font_set
},{}],4:[function(require,module,exports){
const keyMap = ['1', '2', '3', '4', 'q', 'w', 'e',
    'r', 'a', 's', 'd', 'f', 'z', 'x', 'c', 'v']


module.exports = keyMap
},{}],5:[function(require,module,exports){

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

    setKeys() {
        throw new TypeError('Must be implemented on inherited class')
    }

    resetKeys() {
        throw new TypeError('Must be implemented on inherited class')
    }
}

module.exports = { cpuInterface }
},{}],6:[function(require,module,exports){
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
},{"../data/const_vals":2,"../data/key_map":4,"./cpu_interface":5}],7:[function(require,module,exports){
class RomBuffer {
    constructor(fileContents) {
        this.data = []

        const buffer = fileContents

        //take the buffer's contents (raw binary) and translate it into big endian words, where the most significant byte is first in the buffer
        for (let i = 0; i < buffer.length; i += 2) {
            this.data.push((buffer[i] << 8 | buffer[i + 1] << 0))
            //ex: if the buffer spits out bytes 20 and 34, this will create a 16-bit big endian code in the form of 2034 (where 20 and 34 are represented as binary)
            //and are placed adjacent to each other to create a 16 bit or 2 byte code
        }
    }
}

module.exports = { RomBuffer }

},{}],8:[function(require,module,exports){
const Disassembler = require('./disassembler')
const { display_height, display_width, } = require('../data/const_vals')
const font_set = require('../data/font_set')


class CPU {

    constructor(cpuInterface) {
        this.reset()
        this.interface = cpuInterface
    }

    reset() {
        this.memory = new Uint8Array(4096)
        this.PC = 0x200
        this.registers = new Uint8Array(16)
        this.I = 0
        this.stack = new Uint16Array(16)
        this.SP = -1
        this.DT = 0
        this.ST = 0
        this.halted = true
        this.soundEnabled = false
    }

    //equivalent of loading a game cartridge 
    load(romBuffer) {
        this.reset()

        for (let i = 0; i < font_set.length; i++) {
            this.memory[i] = font_set[i]
        }

        const romData = romBuffer.data
        let memoryStart = 0x200 // where the reserved memory for programs start

        this.halted = false

        for (let i = 0; i < romData.length; i++) {

            //need to reserve two slots of memory for storing the opcode
            //since the CPU has 8 bit memory, we need to store opcodes as two seperate indexes of memory, which is why 
            //we need to traverse through the memory by 2
            this.memory[memoryStart + i] = romData[i]
        }
    }

    tick_increment() {
        if (this.DT > 0) {
            this.DT--
        }

        if (this.ST > 0) {
            this.ST--
        } else {
            if (this.soundEnabled) {
                this.soundEnabled = false
            }
        }
    }

    step() {
        const opcode = this.fetch()
        const instruction = this.decode(opcode)

        this.execute(instruction)
    }

    nextInstruction() {
        this.PC = this.PC + 1
    }

    skipInstruction() {
        this.PC = this.PC + 2
    }

    halt() {
        this.halted = true
    }

    //fetch address from CPU memory
    fetch() {
        return (this.memory[this.PC])
    }

    //disassemble opcode
    decode(opcode) {
        return Disassembler.disassemble(opcode)
    }

    execute(instruction) {

        //inquire about the instruction object's ID, and the retuerned args(an array of derived opcode arg values) from the decode()
        const id = instruction.instruction.id
        const args = instruction.args

        switch (id) {

            case 'CLS':
                // CLS - Clear the screen
                this.interface.clearDisplay()

                this.nextInstruction()
                break

            case 'RET':
                //RET - Return from subroutine
                this.PC = this.stack[this.SP]
                this.SP--
                break

            case 'JMP_ADDR':
                //JMP - jump to address NNN
                this.PC = Math.floor(args[0] / 2)
                break

            case 'CALL_ADDR':
                //CALL - call subroutine at NNN
                if (this.SP === 15) {
                    this.halted = true
                    throw new Error('Stack overflow')
                }

                //increases SP by one to account for new current position (about to make a jump)
                this.SP++

                //save the current position in the stack pointer
                this.stack[this.SP] = this.PC + 2

                //make the jump to the first argument, which is NNN
                this.PC = Math.floor(args[0] / 2)
                break

            case 'SE_VX_NN':
                //SKP - skip to next instruction if VX = NN
                if (this.registers[args[0]] === args[1]) {
                    this.skipInstruction()
                } else {
                    this.nextInstruction()
                }
                break

            case 'SNE_VX_NN':
                //SKP - skip to the next instruction if VX != NN
                if (this.registers[args[0]] !== args[1]) {
                    this.skipInstruction()
                } else {
                    this.nextInstruction()
                }
                break

            case 'SE_VX_VY':
                //SKP - skip to the next instruction if VX = VY
                if (this.registers[args[0]] === this.registers[args[1]]) {
                    this.skipInstruction()
                } else {
                    this.nextInstruction()
                }
                break

            case 'LD_VX_NN':
                //Sets VX to NN
                this.registers[args[0]] = args[1]
                this.nextInstruction()
                break

            case 'ADD_VX_NN':
                //ADD - adds NN to VX, setting VX = VX + NN
                let v = this.registers[args[0]] + args[1]
                if (v > 255) {
                    v -= 256
                }
                this.registers[args[0]] = v

                this.nextInstruction()
                break

            case 'LD_VX_VY':
                //LD - set VX = VY
                this.registers[args[0]] = this.registers[args[1]]

                this.nextInstruction()
                break

            case 'OR_VX_VY':
                //OR - set VX = VX OR VY
                this.registers[args[0]] |= this.registers[args[1]]

                this.nextInstruction()
                break

            case 'AND_VX_VY':
                //set VX = VX AND VY
                this.registers[args[0]] &= this.registers[args[1]]

                this.nextInstruction()
                break

            case 'XOR_VX_VY':
                //set VX = VX XOR VY
                this.registers[args[0]] ^= this.registers[args[1]]

                this.nextInstruction()
                break

            case 'ADD_VX_VY':
                //ADD - sets VX = VX + VY
                this.registers[0xf] = this.registers[args[0]] + this.registers[args[1]] > 0xff ? 1 : 0
                this.registers[args[0]] += this.registers[args[1]]

                this.nextInstruction()
                break

            case 'SUB_VX_VY':
                //SUB - sets VX = VX - VY
                this.registers[0xf] = this.registers[args[0]] > this.registers[args[1]] ? 1 : 0
                this.registers[args[0]] -= this.registers[args[1]]

                this.nextInstruction()
                break

            case 'SHR_VX_VY':
                //SHR - Assign VF the least significant bit of VX and then shift VX to the right by 1
                this.registers[0xf] = this.registers[args[0]] & 1
                this.registers[args[0]] >>= 1

                this.nextInstruction()
                break

            case 'SUBN_VX_VY':
                //SUBN - Sets VX = VY - VX
                this.registers[0xf] = this.registers[args[1]] > this.registers[args[0]] ? 1 : 0
                this.registers[args[0]] = this.registers[args[1]] - this.registers[args[0]]

                this.nextInstruction()
                break

            case 'SHL_VX_VY':
                //SHL - Assign VF the most significant bit of VX and then shifts VX to the left by 1
                //arithmetic right-shift operations copy the most significant bit
                this.registers[0xf] = this.registers[args[0]] >> 7
                this.registers[args[0]] <<= 1

                this.nextInstruction()
                break

            case 'SNE_VX_VY':
                //SNE - skips instruction if VX != VY
                if (this.registers[args[0]] !== this.registers[args[1]]) {
                    this.skipInstruction()
                } else {
                    this.nextInstruction()
                }
                break

            case 'LD_I_ADDR':
                //LD - Sets I to the address of NNN
                this.I = args[1]

                this.nextInstruction()
                break

            case 'JMP_V0_ADDR':
                //JMP - Jump to address NNN + V0
                this.PC = this.registers[0] + Math.floor(args[1] / 2)
                break

            case 'RND_VX_NN':
                //RND - Sets VX to the result of a bitwise AND operation on a random number and NN 
                this.registers[args[0]] = Math.floor(Math.random() * 0xff) & args[1]

                this.nextInstruction()
                break

            case 'DRW_VX_VY_N':
                //DRW - Draws a sprite at coordinate (VX, VY) that has a width of 8 pixels and a height of N pixels 
                //Each row of pixels is processed as bit-code starting from memory location I(this value does not change after execution)
                //VF = 1 if any screen pixels are from set to unset when sprite is drawn and 0 otherwise

                //no pixels erased
                this.registers[0xf] = 0

                //each byte is a line of 8 pixels of height N(AKA arg 2) and so reads N bytes from memory
                for (let i = 0; i < args[2]; i++) {
                    //the line starts from the Ith position in memory
                    let line = this.memory[this.I + i]
                    //reading the 8 pixels of the nth line 
                    for (let j = 0; j < 8; j++) {
                        //traversing through every bit (shifting by j and then masking in order to inquire about a bit's state)
                        let value = line & (0x80 >> j) ? 1 : 0
                        //if a pixel is changed or unset, change VF to 1, otherwise 0
                        let x = (this.registers[args[0]] + j) % display_width //display width (j tells how far to increment)
                        let y = (this.registers[args[1]] + i) % display_height //display height (i tell how high to increment)
                        //mod is used for wrap around

                        if (this.interface.drawPixel(x, y, value)) {
                            this.registers[0xf] = 1
                        }
                    }
                }

                this.nextInstruction()
                break

            case 'SKP_VX':
                //SKP - skip next instruction if the key  stored in VX is pressed
                //conditional takes the binary keymapping and uses the argument to check if the 
                //AND bitwise operator evaluates the masking as zero, which tells us that the key has been pressed
                if (this.interface.getKeys() & (1 << this.registers[args[0]])) {
                    this.skipInstruction()
                } else {
                    this.nextInstruction()
                }
                break

            case 'SKNP_VX':
                //SKNP - skips the next instruction if the key stored in VX is not pressed
                if (!(this.interface.getKeys() & (1 << this.registers[args[0]]))) {
                    this.skipInstruction()
                } else {
                    this.nextInstruction()
                }
                break

            case 'LD_VX_DT':
                //LD - sets VX to the value of the delay timer
                this.registers[args[0]] = this.DT
                this.nextInstruction()
                break

            case 'LD_VX_N':
                //LD - Key press is awaited, and then stored in VX
                const keyPress = this.interface.waitKey()

                if (!keyPress) {
                    return
                }

                this.registers[args[0]] = keyPress

                this.nextInstruction()
                break

            case 'LD_DT_VX':
                //LD - set delay timer equal to VX
                this.DT = this.registers[args[1]]

                this.nextInstruction()
                break

            case 'LD_ST_VX':
                //LD - sets the sound timer to VX
                this.ST = this.registers[args[1]]
                if (this.ST > 0) {
                    this.soundEnabled = true
                }

                this.nextInstruction()
                break

            case 'ADD_I_VX':
                //ADD - adds VX to I (VF is not affected)
                this.I = this.I + this.registers[args[1]]

                this.nextInstruction()
                break

            case 'LD_F_VX':
                //LD - Sets I to the *location of the sprite* for the character in VX
                //character is represented in 4x5 font -- have to translsate accordingly to account for the height
                /* Example of a 4 pixels wide and 5 pixels tall character

                ****
                *  *
                *  * 
                *  *
                ****

                */
                this.I = this.registers[args[1]] * 5 //multiply by 5 because 5 bytes make up the sprite so need to traverse by 5

                this.nextInstruction()
                break

            case 'LD_B_VX':
                //LD Stores BCD representation of VX with MSD at I, the middle at I + 1 and the LSD at I + 2
                //VX is stored in x
                let x = this.registers[args[1]]
                //find the digit in the hundreths place
                const a = Math.floor(x / 100)
                //get rid of the digit in the hundreths place
                x = x - a * 100
                //get the digit in the tenths place
                const b = Math.floor(x / 10)
                //get rid of the digit in the tenths place
                x = x - b * 10
                //assign c to the last digit
                const c = Math.floor(x)

                this.memory[this.I] = a
                this.memory[this.I + 1] = b
                this.memory[this.I + 2] = c

                this.nextInstruction()
                break

            case 'LD_I_VX':
                //LD - Stores from V0 to VX (including VX) in memory, starting at I
                for (let i = 0; i <= args[1]; i++) {
                    this.memory[this.I + i] = this.registers[i]
                }

                this.nextInstruction()
                break

            case 'LD_VX_I':
                //LD - Fills from V0 to VX (including VX) with values from memory, starting at I
                for (let i = 0; i <= args[0]; i++) {
                    this.registers[i] = this.memory[this.I + i]
                }

                this.nextInstruction()
                break

            case 'DW':
                this.nextInstruction()
                break

            default:
                this.halted = true
                throw new Error('illegal instruction')
        }
    }
}

module.exports = { CPU }
},{"../data/const_vals":2,"../data/font_set":3,"./disassembler":9}],9:[function(require,module,exports){
const { instruction_set } = require('../data/InstrSet')

const Disassembler = {
    disassemble(opcode) {

        //find the desired instruction based on the given opcode (whichever instruction.pattern yields true in the callback function)
        const instruction = instruction_set.find((instruction) => (opcode & instruction.mask) === instruction.pattern)

        //find the args based on the instruction found above, traverse through all elements of the arguments list, 
        //and apply the respective masks and shifts of each element
        const args = instruction.arguments.map((arg) => (opcode & arg.mask) >> arg.shift)

        //return an object that contains the instruction and args
        return { instruction, args }

    }
}

module.exports = Disassembler
},{"../data/InstrSet":1}],10:[function(require,module,exports){
(function (global){(function (){
const { CPU } = require('../main/cpu')
const { RomBuffer } = require('../main/ROM_buffer')
const { webInterface } = require('../interfaces/web_interface')

const cpuInterface = new webInterface()
const cpu = new CPU(cpuInterface)

global.cpu = cpu
global.RomBuffer = RomBuffer

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../interfaces/web_interface":6,"../main/ROM_buffer":7,"../main/cpu":8}]},{},[10]);
