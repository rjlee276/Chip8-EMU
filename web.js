let timer = 0
function emulateCycle() {
    timer++
    if (timer % 3 === 0) {
        cpu.tick_increment()
        timer = 0
    }

    if (!cpu.halted) {
        cpu.step()
        updateHighlight()
        displayMemory()
        displayRegisters()
        scrollBottom()
    }
    setTimeout(emulateCycle, 2)
}

async function load() {
    const rom = event.target.value
    const response = await fetch(`./roms/${rom}`)
    const arrayBuffer = await response.headers.arrayBuffer()
    const uint8array = new Uint8Array(arrayBuffer)
    const romBuffer = new RomBuffer(uint8array)

    cpu.interface.clearDisplay()
    cpu.load(romBuffer)
    displayInstructions(rom)
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

function scrollBottom() {
    document.querySelector('panel1').scrollTop = document.querySelector('panel1').scrollHeight
    document.querySelector('panel2').scrollTop = document.querySelector('panel2').scrollHeight
}

const hex = (value, length = 2) => {
    const padded = '0000' + value.toString(16).toUpperCase()
    return padded.substr(padded.length - length)
}

function displayMemory() {
    const clasz = cpu.PC
    const addresz = '0x' + hex(cpu.PC, 4)
    document.querySelector('panel1').append(`<div class='pc ${clasz}'>${addresz} - ${cpu.decode(cpu.fetch()).instruction.id}</div>`)
}

function updateHighlight() {
    document.querySelector('.info > .panel1 > div').removeClass('pc')
}

function displayRegisters() {
    for (let i = 0; i < cpu.registers; i++) {
        document.querySelector('panel2').append(`<div>V${i}: ${cpu.registers[i]}</div>`)
    }
}

document.querySelector('select').addEventListener('change', load)

emulateCycle()




