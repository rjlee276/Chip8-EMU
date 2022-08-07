$(document).ready(function () {
    function displayMemory() {
        let address = 0x200
        const clasz = address
        const addresz = '0x' + hex(address, 4)
        while (address < 4096) {
            $('.panel1').append('<div>1</div>')
            address += 2
        }
    }

    module.exports = { displayMemory }
})