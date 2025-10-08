# Project Chimera - Cursed Code

Built for [Horror-Hacks 2025](https://horror-hacks-2025.devpost.com/). <br/>
Under "Cursed Code" theme

## 💀 A Digital Descent into Madness 💀

**Project Chimera - Cursed Code** is an interactive, browser-based horror experience built for **Horror Hacks 2025**. It plunges the user into a retro-futuristic terminal interface, where seemingly innocuous commands slowly unravel a chilling narrative of a system compromised by something... else. Prepare for a journey where the code itself becomes a source of dread.

---

## 👻 The Motive, The Urge, The Fun (for Horror Hacks 2025)

Our primary motive for "Project Chimera" was to explore the unique potential of **digital horror** within a web environment. We wanted to move beyond traditional jump scares and create an atmosphere of pervasive unease, where the very tools of interaction (the terminal, the code) become corrupted and threatening.

The urge was to craft an experience that feels both nostalgic and deeply unsettling. The retro CRT aesthetic and command-line interface evoke a sense of old-school computing, but beneath that familiar veneer lies a sinister presence waiting to emerge. We aimed to leverage the browser's capabilities to deliver a truly immersive and surprising horror narrative.

The fun came from experimenting with various web technologies to achieve these effects:
*   **Web Audio API:** Crafting dynamic, escalating soundscapes – from subtle ambient static to jarring jump scares – that respond directly to user actions and game progression.
*   **CSS Glitches & Animations:** Bringing the "cursed code" to life with visual distortions, screen flickers, and color inversions that make the terminal feel unstable and alive.
*   **JavaScript Game Logic:** Building a simple yet effective command parser and state machine to drive the narrative and horror escalation, ensuring each interaction pushes the player deeper into the mystery.

This project is a direct answer to the call of Horror Hacks: to create something genuinely scary and innovative using code. It's about the horror of losing control, of technology turning against you, and the chilling realization that some things are better left undisturbed.

---

## ✨ Features

*   **Authentic Terminal Experience:** A fully interactive command-line interface with a retro CRT aesthetic.
*   **Dynamic Boot Sequence:** An initial boot-up that sets the stage for the unfolding horror.
*   **Command-Driven Narrative:** Interact with the system using familiar commands (`ls`, `cat`, `run`) to uncover clues and trigger events.
*   **Escalating Horror:** Subtle glitches, unsettling ambient audio, and sudden jump scares that intensify as the user delves deeper.
*   **Responsive Audio:** Sounds that react to the game state, creating an immersive and terrifying soundscape.
*   **Hidden Commands:** Discover secret commands that reveal more lore or trigger unique effects.

---

## 🛠️ Technologies Used

*   **HTML5:** Structure of the terminal interface.
*   **CSS3:** Styling, retro CRT effects, and glitch animations.
*   **JavaScript (ES6+):** Core game logic, command parsing, typing effects, and horror escalation.
*   **Web Audio API:** Advanced audio playback, looping, and dynamic volume control for immersive sound.
*   **Google Fonts:** For the pixelated "Press Start 2P" font, enhancing the retro feel.

---

## 🚀 How to Run Locally (for Judges!)

To experience "Project Chimera" as intended, you'll need to serve the files using a local web server. This bypasses browser security restrictions that prevent local file access for dynamic content like audio.

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/horror-hacks.git
    cd horror-hacks
    ```


2.  **Start a Local HTTP Server:**
    The easiest way is using Python (most systems have it pre-installed):
    ```bash
    python -m http.server 8000
    ```
    *(If you have Python 2, use `python -m SimpleHTTPServer 8000`)*

    This will start a server on port 8000.

3.  **Open in Browser:**
    Navigate to `http://localhost:8000/` in your web browser.

4.  **Interact & Listen:**
    *   The boot sequence will begin automatically.
    *   **Crucially, click anywhere on the terminal window after the boot sequence completes.** This allows the browser to resume the AudioContext and enable sound playback due to modern autoplay policies.
    *   Start typing commands like `help`, `ls`, `cat README.txt`, `cat system_log.dat`, and `run project_chimera.exe` to progress the narrative and trigger the horror elements.

---

## 🚧 Challenges & Learnings

*   **Browser Autoplay Policies:** A significant challenge was ensuring audio played reliably. Modern browsers often suspend `AudioContext` until explicit user interaction. Implementing a robust resume mechanism was key.
*   **Local File Restrictions:** Initially, running `index.html` directly from the file system (`file://`) caused `fetch` requests for audio to fail due to security policies. Understanding and implementing a local HTTP server was essential.
*   **Synchronizing Effects:** Coordinating CSS glitches, text output, and Web Audio API events to create a cohesive and impactful horror experience required careful timing and `setTimeout` management.
*   **Creating Convincing Glitches:** Iterating on CSS animations and JavaScript triggers to make the visual and auditory glitches feel organic and genuinely unsettling.

---

## 🔮 Future Enhancements

Given more time, we would love to expand "Project Chimera" with:
*   **Deeper Narrative Branches:** More complex command interactions leading to different story paths and endings.
*   **Visual Jump Scares:** Integrating corrupted images or short video clips that flash on screen during critical moments.
*   **Advanced Audio Effects:** Implementing filters, spatial audio, or more complex sound synthesis using the Web Audio API.
*   **Persistent State:** Allowing users to "save" their progress or have the system remember past interactions.
*   **More Hidden Lore:** Expanding the universe with more files, programs, and cryptic messages to discover.

---

## 🙏 Credits

*   **Google Fonts:** "Press Start 2P" for the retro terminal font.
*   **Sound Effects:** Thanks to [Pixabay](https://pixabay.com)

---

We hope you enjoy your descent into the cursed code of Project Chimera. Don't say we didn't warn you...