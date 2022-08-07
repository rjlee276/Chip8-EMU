const fs = require('fs')
const { CPU } = require('../main/cpu')
const { RomBuffer } = require('../main/ROM_buffer')
const { terminalInterface } = require('../interfaces/terminal_interface')

const fileContents = fs.readFileSync(process.argv.slice(2)[0])

const cpu_interface = new terminalInterface
const cpu = new CPU(cpu_interface)
const romBuffer = new RomBuffer(fileContents)

cpu.load(romBuffer)

let timer = 0
function emulateCycle() {
    timer++
    if (timer % 3 === 0) {
        cpu.tick_increment()
        timer = 0
    }

    cpu.step()

    setTimeout(emulateCycle, 3)
}

emulateCycle()