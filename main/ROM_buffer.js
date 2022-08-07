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
