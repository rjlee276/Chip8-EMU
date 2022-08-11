# Chip8-EMU

This interpreter is implemented in Javascript, so I took the liberty of calling it Jip8 in order to, at the very least, distinguish it from all other interpreters out there.

This interpreter can be interfaced with two environments: the terminal and the browser. 

For the terminal, I primarily utilized the Blessed library to create the interface. However, beyond that, there was not much more I had to do in order to implement the CLI app. 
I should probably mention, though, that I created a script file for the entry point, wherein you'll be able to pass the ROM name as an argument in the terminal in order to play the game. You can take a look at these files (for both the browser and the terminal) under the "scripts" folder!

For the webapp, I used Browserify to bundle all the web app's dependencies, using the browser script file as the entry point. That way, I'd be able to reference the source code in the browser. Under the "g-pages", you'll be able to take a look at this bundle.
I also used Bootstrap 5 to design the page (so as to make it more mobile-friendly), and created a menu using some JQuery conveniences in order to dynamically display the data that the CPU processes. This includes the system memory (which opcode is being executed), the registers and their values, as well as the program and index counters. 

There are still a handful of tweaks I'd like to work on in the future, but for now, what you see here is a working implementation of the Chip8 (Jip8) in Javascript!


# Improvements for the future

Speaking of improvements, I would like to figure out how to implement the sound into the program. I have been hearing legends of a glorious beep that supposedly plays at the initialization of the interpreter. 

I'd also like to make an on-screen keyboard for mobile devices, because as of now, the web app is just eye candy for those using smaller screens. 


#Acknowledgements

Much thanks to these resources in helping me better understand the realm of emulation and how I would go about implementing my interpreter.


http://devernay.free.fr/hacks/chip8/C8TECH10.HTM

https://en.wikipedia.org/wiki/CHIP-8

https://tobiasvl.github.io/blog/write-a-chip-8-emulator/

https://github.com/mattmikolay/chip-8/wiki/Mastering-CHIP%E2%80%908

https://www.taniarascia.com/writing-an-emulator-in-javascript-chip8/#web-app---interfacing-with-the-browser

https://multigesture.net/articles/how-to-write-an-emulator-Chip-8-interpreter/

