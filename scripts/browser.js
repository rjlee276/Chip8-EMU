const { CPU } = require('../main/cpu')
const { RomBuffer } = require('../main/ROM_buffer')
const { webInterface } = require('../interfaces/web_interface')

const cpuInterface = new webInterface()
const cpu = new CPU(cpuInterface)

global.cpu = cpu
global.RomBuffer = RomBuffer
