const outputElement = document.getElementById('output');
const commandInput = document.getElementById('command-input');
const terminalContent = document.getElementById('terminal-content');
const crtScreen = document.querySelector('.crt-screen');

let bootSequenceComplete = false;
let currentLine = '';
let commandHistory = [];
let historyIndex = -1;
let glitchInterval;
let audioContext;
let ambientSound;
let jumpScareSound;

// --- Utility Functions ---

function typeWriter(text, element, delay = 50, callback = () => {}) {
    let i = 0;
    element.innerHTML += '<span class="typing-cursor"></span>'; // Add a blinking cursor
    const cursor = element.querySelector('.typing-cursor');

    function type() {
        if (i < text.length) {
            element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
            i++;
            setTimeout(type, delay);
        } else {
            cursor.remove(); // Remove cursor after typing
            callback();
        }
    }
    type();
}

function appendOutput(text, className = '') {
    const p = document.createElement('span'); // Use span to allow inline typing
    p.className = className;
    outputElement.appendChild(p);
    typeWriter(text, p, 30, () => {
        terminalContent.scrollTop = terminalContent.scrollHeight; // Scroll to bottom
    });
}

function clearOutput() {
    outputElement.innerHTML = '';
}

function addGlitchEffect(element, className, duration = 500) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, duration);
}

function startPersistentGlitch(element, className, interval = 5000, duration = 200) {
    glitchInterval = setInterval(() => {
        addGlitchEffect(element, className, duration);
    }, interval);
}

function stopPersistentGlitch() {
    clearInterval(glitchInterval);
}

// --- Audio Functions ---

async function initAudio() {
    console.log('Attempting to initialize AudioContext...');
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('AudioContext initialized. State:', audioContext.state);

        // Add a listener to log state changes
        audioContext.onstatechange = () => {
            console.log('AudioContext state changed to:', audioContext.state);
        };

        ambientSound = await loadSound('./assets/ambient_static.mp3');
        jumpScareSound = await loadSound('./assets/jumpscare_scream.mp3');

        if (ambientSound) {
            console.log('Ambient sound loaded successfully.');
        }
        if (jumpScareSound) {
            console.log('Jump scare sound loaded successfully.');
        }

    } catch (e) {
        console.error('Web Audio API not supported or failed to initialize audio context:', e);
    }
}

async function loadSound(url) {
    console.log(`Attempting to load sound from: ${url}`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} for ${url}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        console.log(`Successfully loaded and decoded: ${url}`);
        return audioBuffer;
    } catch (error) {
        console.error(`Failed to load sound from ${url}:`, error);
        return null;
    }
}

function playSound(buffer, loop = false, volume = 1) {
    if (!audioContext || !buffer) {
        console.warn('Attempted to play sound but audioContext is not initialized or buffer is null/undefined.');
        return;
    }
    if (audioContext.state === 'suspended') {
        console.warn('AudioContext is suspended. Sound will not play until resumed by user interaction.');
        return; // Prevent playing if suspended
    }

    console.log(`Playing sound (loop: ${loop}, volume: ${volume})`);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start(0);
    return source;
}

// --- Game Logic ---

const commands = {
    'help': 'Available commands: help, ls, cat [file], run [program]',
    'ls': 'Files: README.txt, system_log.dat, project_chimera.exe',
    'cat readme.txt': 'README.txt: This system is unstable. Do not proceed. Data corruption detected.', // Changed key to lowercase
    'cat system_log.dat': 'system_log.dat: [ERROR] Core integrity compromised. [WARNING] Entity detected. [CRITICAL] System override imminent.',
    'run project_chimera.exe': 'Executing project_chimera.exe... Access denied. System response: "IT WANTS OUT."',
    'whoami': 'You are an intruder. Leave.', // Hidden command
    'ping': 'Pinging... Target unresponsive. Or is it?', // Hidden command
    'exit': 'Connection terminated. Or so you think.', // Hidden command
};

let gameStage = 0; // 0: initial boot, 1: user interaction, 2: escalating horror, 3: climax

function handleCommand(command) {
    command = command.toLowerCase().trim();
    appendOutput(`> ${command}\n`);

    if (commandHistory[commandHistory.length - 1] !== command) {
        commandHistory.push(command);
    }
    historyIndex = commandHistory.length;

    let response = commands[command];
    if (!response) {
        // Check for commands with arguments
        if (command.startsWith('cat ')) {
            const file = command.substring(4);
            response = commands[`cat ${file}`] || `Error: File '${file}' not found.`;
        } else if (command.startsWith('run ')) {
            const program = command.substring(4);
            response = commands[`run ${program}`] || `Error: Program '${program}' not found.`;
        } else {
            response = `Error: Command not recognized: '${command}'. Type 'help' for assistance.`;
        }
    }

    appendOutput(`${response}\n\n`);
    commandInput.value = '';

    if (command === 'run project_chimera.exe' && gameStage < 2) {
        gameStage = 2;
        appendOutput('Initiating Project Chimera protocol... Standby for system changes.\n', 'glitch-text');
        setTimeout(escalateHorror, 2000);
    } else if (command === 'whoami' && gameStage < 1) {
        gameStage = 1;
        setTimeout(() => {
            appendOutput('A strange presence is felt...\n');
            addGlitchEffect(crtScreen, 'screen-flicker', 1000);
        }, 1000);
    }
}

function escalateHorror() {
    appendOutput('SYSTEM OVERLOAD. INTEGRITY CRITICAL.\n', 'glitch-text');
    startPersistentGlitch(outputElement, 'glitch-text', 1500, 100);
    startPersistentGlitch(crtScreen, 'screen-flicker', 3000, 500);

    // Play ambient static
    if (ambientSound) {
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                playSound(ambientSound, true, 0.5);
            });
        } else {
            playSound(ambientSound, true, 0.5);
        }
    } else {
        console.warn('Ambient sound not available, skipping playback.');
    }

    setTimeout(() => {
        appendOutput('WARNING: UNKNOWN ENTITY DETECTED. ATTEMPTING TO BREACH INTERFACE.\n', 'glitch-text');
        addGlitchEffect(crtScreen, 'color-invert', 500);
    }, 5000);

    setTimeout(() => {
        if (jumpScareSound) { // Ensure jumpScareSound was successfully loaded
            playSound(jumpScareSound, false, 1);
        } else {
            console.warn('Jump scare sound not available, skipping playback.');
        }
        addGlitchEffect(crtScreen, 'color-invert', 1000);
        addGlitchEffect(outputElement, 'glitch-text', 1000);
        appendOutput('GET OUT. NOW.\n', 'glitch-text');
    }, 10000);

    // Further escalation...
    setTimeout(() => {
        appendOutput('THE CODE IS ALIVE.\n', 'glitch-text');
    }, 15000);
}


// --- Event Listeners ---

commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (bootSequenceComplete) {
            handleCommand(commandInput.value);
        } else {
            // If boot sequence not complete, just clear input
            commandInput.value = '';
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault(); // Prevent cursor from moving to start of input
        if (historyIndex > 0) {
            historyIndex--;
            commandInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            commandInput.value = '';
        }
    }
});

// --- Initial Boot Sequence ---

function startBootSequence() {
    appendOutput('CHIMERA OS v1.0.0 Booting...\n');
    setTimeout(() => appendOutput('Loading kernel modules...\n'), 1000);
    setTimeout(() => appendOutput('Initializing hardware...\n'), 2000);
    setTimeout(() => appendOutput('Establishing network connection... [FAILED]\n', 'glitch-text'), 3500);
    setTimeout(() => appendOutput('Checking file system integrity...\n'), 4500);
    setTimeout(() => {
        appendOutput('WARNING: Corrupted sectors detected. Attempting repair...\n', 'glitch-text');
        addGlitchEffect(crtScreen, 'screen-flicker', 800);
    }, 6000);
    setTimeout(() => appendOutput('Repair failed. System integrity at 67%.\n', 'glitch-text'), 7500);
    setTimeout(() => {
        appendOutput('Boot sequence complete. Type \'help\' for commands.\n\n');
        bootSequenceComplete = true;
        commandInput.focus();
    }, 9000);
}

// Start everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAudio(); // Initialize audio context
    startBootSequence();
});

// Ensure audio playback can start (user interaction required)
document.body.addEventListener('click', () => {
    if (audioContext && audioContext.state === 'suspended') {
        console.log('User clicked, attempting to resume AudioContext...');
        audioContext.resume().then(() => {
            console.log('AudioContext resumed successfully.');
        }).catch(e => {
            console.error('Error resuming AudioContext:', e);
        });
    }
}, { once: true }); //  to resume once