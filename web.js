let timer = 0
function emulateCycle() {
    timer++
    if (timer % 3 === 0) {
        cpu.tick_increment()
        timer = 0
    }

    cpu.step()

    setTimeout(emulateCycle, 2)
}

async function load() {
    const rom = event.target.value
    console.log(rom)
    const response = await fetch(`./roms/${rom}`)
    console.log(response)
    const arrayBuffer = await response.arrayBuffer()
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
            instructions = `
            Q = go to the left
            E = go to the right
            W = drop a coin

            Coin suit alternates with each play. 
            This game has no victory detection method.
            `
            break

        case 'TETRIS':
            instructions = `
            W = go to the left
            E = go to the right 
            R = fall faster 
            Q = rotate block
            `
            break

        case 'PONG':
            instructions = `
            Player 1: 

            2 = go up
            Q = go down

            Player 2: 

            2 = go up

            X = go down
            `

            break

        case 'INVADERS':
            instructions = `
            W = start game 
            W = shoot
            Q = go to the left
            E = go to the right
            `
            break
    }

    document.querySelector('.instructions').textContent = instructions
}

document.querySelector('select').addEventListener('change', load)

emulateCycle()

