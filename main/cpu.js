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
            this.memory[memoryStart + 2 * i] = romData[i] >> 8
            this.memory[memoryStart + 2 * i + 1] = romData[i] & 0x00ff
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
        this.PC = this.PC + 2
    }

    skipInstruction() {
        this.PC = this.PC + 4
    }

    halt() {
        this.halted = true
    }

    //fetch address from CPU memory
    fetch() {
        return (this.memory[this.PC] << 8 | this.memory[this.PC + 1] << 0)
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
                this.PC = args[0]
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
                this.PC = args[0]
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
                this.PC = this.registers[0] + args[1]
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

            default:
                this.halted = true
                throw new Error('illegal instruction')
        }
    }
}

module.exports = { CPU }