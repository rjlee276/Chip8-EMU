var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

let timer = 0
function emulateCycle() {
    timer++
    if (timer % 3 === 0) {
        cpu.tick_increment()
        timer = 0
    }

    if (!cpu.halted) {
        cpu.step()
    }
    setTimeout(emulateCycle, 2)
}

async function load() {
    const rom = event.target.value
    const response = await fetch(`./roms/${rom}`)
    const arrayBuffer = await response.arrayBuffer()
    const uint8array = new Uint8Array(arrayBuffer)
    const romBuffer = new RomBuffer(uint8array)

    cpu.interface.clearDisplay()
    cpu.load(romBuffer)
    displayInstructions(rom)
    displayMemory()
    scrollBottom()
}

function displayInstructions(rom) {
    let instructions;

    switch (rom) {
        case 'CONNECT4':
            instructions = `Q = go to the left
E = go to the right
W = drop a coin

Coin suit alternates with each play. 
This game has no victory detection.
`
            break

        case 'TETRIS':
            instructions = `W = go to the left
E = go to the right 
R = fall faster 
Q = rotate block
`
            break

        case 'PONG':
            instructions = `Player 1: 

2 = go up
Q = go down

Player 2: 

2 = go up
X = go down`

            break

        case 'INVADERS':
            instructions = `W = start game 
W = shoot
Q = go to the left
E = go to the right`
            break
    }

    document.querySelector('.instructions').textContent = instructions
}

const inRange = (value, lower, upper) => value >= lower && value <= upper

function disassemble(program, addr) {
    const opcode = (program[addr] << 8) | program[addr + 1]

    const x = (opcode & 0x0f00) >> 8
    const y = (opcode & 0x00f0) >> 4
    const nnn = opcode & 0x0fff
    const kk = opcode & 0x00ff
    const n = opcode & 0x000f

    if (opcode === 0x00e0) return "CLS"
    if (opcode === 0x00ee) return "RET"
    if (inRange(opcode, 0x1000, 0x1fff)) return `JP 0x${hex(nnn, 3)}`
    if (inRange(opcode, 0x2000, 0x2fff)) return `CALL 0x${hex(nnn, 3)}`
    if (inRange(opcode, 0x3000, 0x3fff)) return `SE V${n} ${kk}`
    if (inRange(opcode, 0x4000, 0x4fff)) return `SNE V${n} ${kk}`
    if (inRange(opcode, 0x5000, 0x5fff)) return `SE V${x} V${y}`
    if (inRange(opcode, 0x6000, 0x6fff)) return `LD V${x} ${kk}`
    if (inRange(opcode, 0x7000, 0x7fff)) return `ADD V${x} ${kk}`
    if (inRange(opcode, 0x8000, 0x8fff)) {
        if (n === 0x0) return `LD V${x} V${y}`
        if (n === 0x1) return `OR V${x} V${y}`
        if (n === 0x2) return `AND V${x} V${y}`
        if (n === 0x3) return `XOR V${x} V${y}`
        if (n === 0x4) return `ADD V${x} V${y}`
        if (n === 0x5) return `SUB V${x} V${y}`
        if (n === 0x6) return `SHR V${x}`
        if (n === 0x7) return `SUBN V${x} V${y}`
        if (n === 0xe) return `SHL V${x}`
    }
    if (inRange(opcode, 0x9000, 0x9fff)) return `SNE V${x} V${y}`
    if (inRange(opcode, 0xa000, 0xafff)) return `LDI ${nnn}`
    if (inRange(opcode, 0xb000, 0xbfff)) return `JP V0 + ${nnn}`
    if (inRange(opcode, 0xc000, 0xcfff)) return `RND ${kk}`
    if (inRange(opcode, 0xd000, 0xdfff)) return `DRW V${x} V${y} ${n}`
    if (inRange(opcode, 0xe000, 0xefff)) {
        if (kk === 0x9e) return `SKP V${x}`
        if (kk === 0xa1) return `SKNP V${x}`
    }
    if (inRange(opcode, 0xf000, 0xffff)) {
        if (kk === 0x07) return `LD V${x} DT`
        if (kk === 0x0a) return `LD V${x} K`
        if (kk === 0x15) return `LD DT, V${x}`
        if (kk === 0x1e) return `ADD I, V${x}`
        if (kk === 0x29) return `LD F, V${x}`
        if (kk === 0x33) return `LD B, V${x}`
        if (kk === 0x55) return `LD [I], ${x}`
        if (kk === 0x65) return `LD ${x}, [I]`
    }
    return "-"
}

function scrollBottom() {
    document.querySelector('.panel1').scrollTop = document.querySelector('.panel1').scrollHeight
    document.querySelector('.panel2').scrollTop = document.querySelector('.panel2').scrollHeight
}

const hex = (value, length = 2) => {
    const padded = '0000' + value.toString(16).toUpperCase()
    return padded.substr(padded.length - length)
}

function displayMemory() {
    let address = 0x200
    const clasz = address
    const addresz = '0x' + hex(address, 4)
    while (address < 4096) {
        let select1 = document.querySelector('.panel1')
        select1.append(<div>1</div>)
        address += 2
    }
}

function updateHighlight() {
    document.querySelector('.info > .panel1 > div').removeClass('pc')
}

function displayRegisters() {
    for (let i = 0; i < cpu.registers; i++) {
        let select2 = document.querySelector('.panel2')
        select2.append(`<div>V${i}: ${cpu.registers[i]}</div>`)
    }
}

document.querySelector('select').addEventListener('change', load)

emulateCycle()




