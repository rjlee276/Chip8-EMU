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