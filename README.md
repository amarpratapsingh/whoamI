# Terminal Portfolio

> **Amar Pratap Singh** — Systems & Software Engineer | CS Undergrad @ KIIT Bhubaneswar (CGPA: 7.97/10)  
> [GitHub](https://github.com/amarpratapsingh) • [LinkedIn](https://linkedin.com/in/amar-pratap-singh) • [Website](https://amarpratap.dev) • `amar.p.s.1509@gmail.com` • `+91 6370550534`

An interactive browser-based Linux terminal portfolio engineered with **xterm.js**, GPU-accelerated WebGL rendering, and zero runtime dependencies. Simulates a complete virtual Unix operating environment (`Amar OS v2.4.1`) with a virtual hierarchical filesystem, realistic command execution, code-editor window cards, theme switching, responsive typography, and an edge `curl` resume endpoint.

---

## 1. Project Overview

| Property | Details |
| --- | --- |
| **Concept** | Interactive VT100/ANSI terminal emulator in the browser with authentic Unix shell UX |
| **Audience** | Recruiters, engineering managers, systems architects, and open-source engineers |
| **Flagship Builds** | **ThreadTrace** (1.34 GB/s log parser in GraalVM AOT) • **AirSocket** (Zero-dependency P2P file streamer) • **BitGit** (Git VCS from scratch) |
| **Research** | Co-author & Presenter at **ComSIA-2026** (Explainable AI for Transparent Medical Diagnosis) |
| **Hosting** | 100% free via **GitHub Pages** (with optional custom domain via Cloudflare) |
| **Live URLs** | `https://amarpratapsingh.github.io/whoamI/` (or `https://amarpratapsingh.github.io/`) |
| **Edge curl** | `curl amarpratap.dev` in a real terminal returns the full ANSI resume |

---

## 2. Technical Architecture & Stack

### 2.1 Core Runtime & Libraries
* **Terminal Engine**: [`xterm.js v5.3.0`](https://xtermjs.org/) — Industry-standard terminal emulator handling ANSI escapes, cursor positioning, and full scrollback buffer (`5,000` lines).
* **GPU Acceleration**: [`@xterm/addon-webgl`](https://www.npmjs.com/package/@xterm/addon-webgl) — Direct WebGL canvas rendering for smooth 60 FPS scrolling and low CPU usage.
* **Responsive Layout**: [`@xterm/addon-fit`](https://www.npmjs.com/package/@xterm/addon-fit) + `ResizeObserver` — Dynamically fits columns and rows to the viewport with responsive font sizing (`11px` on mobile, `13px` on tablet, `15px` on desktop).
* **Zero Runtime Bloat**: Zero external libraries for ASCII generation, typewriter animations, syntax highlighting, or canvas effects. Custom lightweight modules eliminate hundreds of kilobytes of transitive npm dependencies.

### 2.2 Custom Built-in Subsystems
* **Custom Code-Editor Windows**: Renders macOS-style window frames with traffic light dots (`● ● ●`), toolbars, line numbers, and formatted JSON (`whoami.json`, `projects.json`, `contact.json`).
* **Multi-Tier ASCII Banner (`ascii.js`)**: Responsive 1-line, 2-line, or 3-line Slant font ASCII art banner adapting to terminal column widths (`cols >= 104`, `>= 74`, or mobile).
* **Interactive Boot Sequence (`BootSequence.js` & `BootOverlay.js`)**: Authentic kernel initialization sequence with progress counter and **instant bypass** (press `[Esc]`, `[Enter]`, `[Space]`, or click to skip).
* **Lightweight Canvas Matrix Rain (`MatrixRain.js`)**: Custom HTML5 2D canvas matrix digital rain with katakana and alphanumeric characters.
* **Lexer / Syntax Colorizer (`cat.js`)**: Fast regex scanner colorizing JSON keys/strings, Markdown headings/lists, and Shell script commands without heavy runtime syntax libraries.
* **Theme Engine (`theme.js`)**: 6 custom high-contrast color palettes with automatic persistence to `localStorage`.

---

## 3. Project Directory Structure

```text
Terminal Portfolio/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Multi-OS Node 20 & 22 matrix CI verification
│       └── deploy.yml             # Automated GitHub Pages production deployment
│
├── public/
│   ├── favicon.svg                # Minimalist SVG terminal icon
│   └── resume.pdf                 # Authentic downloadable PDF resume (APS.pdf)
│
├── src/
│   ├── index.html                 # Entry point with SEO, OpenGraph, and Twitter tags
│   ├── main.js                    # Application bootstrapping and lifecycle
│   ├── style.css                  # Terminal styling, CRT scanlines, and responsive layout
│   │
│   ├── boot/
│   │   ├── BootOverlay.js         # DOM overlay, progress counter, and skip triggers
│   │   ├── BootSequence.js        # BIOS/kernel typewriter boot lines & SVG logo
│   │   └── MatrixRain.js          # Standalone HTML5 canvas matrix rain animation
│   │
│   ├── commands/
│   │   ├── index.js               # Command registry and alias definitions
│   │   ├── metadata.js            # Command catalog, descriptions, and usage examples
│   │   ├── whoami.js              # Identity card in code-editor window format (whoami.json)
│   │   ├── projects.js            # Projects listing (projects.json) and deep dives (threadtrace, airsocket, bitgit)
│   │   ├── resume.js              # ANSI document resume (Education, Projects, Research, Skills)
│   │   ├── skills.js              # Categorized proficiency bars and technical tags
│   │   ├── contact.js             # Interactive contact channels card (contact.json)
│   │   ├── open.js                # Browser opener for links, GitHub repos, and resume.pdf
│   │   ├── neofetch.js            # OS-style spec card with skills as hardware specifications
│   │   ├── theme.js               # Terminal palette switcher with localStorage persistence
│   │   ├── man.js                 # Manual documentation pages (man <cmd>)
│   │   ├── help.js                # Categorized command directory with usage hints
│   │   ├── clear.js               # Terminal screen reset
│   │   ├── ls.js                  # Virtual directory listing (supports -l, -a, paths)
│   │   ├── cat.js                 # Syntax-colorized file viewer (supports -n line numbers)
│   │   ├── cd.js                  # Fake path traversal (~, .., -, /)
│   │   ├── pwd.js                 # Print fake working path
│   │   ├── history.js             # Session command history viewer
│   │   ├── date.js                # System date and time
│   │   ├── cowsay.js              # Classic ASCII talking cow
│   │   ├── quote.js               # Inspiring computer science quotes
│   │   ├── hack.js                # Cinematic Hollywood penetration simulation
│   │   ├── matrix.js              # Fullscreen digital rain animation
│   │   ├── ping.js                # Recruiter endpoint ping latency simulation
│   │   ├── sudo.js                # Easter egg permission prompt (sudo hire-me)
│   │   ├── git.js                 # Simulated commit history (git log)
│   │   ├── curl.js                # Information on fetching the ANSI resume
│   │   └── rm.js                  # Safe rm -rf / Easter egg
│   │
│   ├── data/
│   │   └── profile.js             # Single source of truth for bio, skills, metrics, and links
│   │
│   ├── filesystem/
│   │   ├── fs.js                  # Hierarchical Unix virtual filesystem tree
│   │   ├── navigation.js          # POSIX path resolution, traversal, and permission checks
│   │   └── files/                 # Static markdown and text representations of files
│   │       ├── about.txt
│   │       ├── skills.json
│   │       ├── resume.pdf.txt
│   │       └── projects/
│   │           ├── threadtrace.md
│   │           ├── airsocket.md
│   │           └── bitgit.md
│   │
│   ├── terminal/
│   │   ├── Terminal.js            # xterm.js orchestration, autocomplete, and event handling
│   │   ├── CommandParser.js       # Shell tokenizer and argument parsing
│   │   └── History.js             # Command history ring buffer with up/down arrows
│   │
│   └── utils/
│       ├── ansi.js                # ANSI 256-color codes, bold, badges, and progress bars
│       ├── ascii.js               # Multi-tier Slant font ASCII banner generator
│       └── linkify.js             # URL detection and browser navigation helper
│
├── worker/
│   └── curl-resume.js             # Cloudflare Worker script for curl endpoint
│
├── .gitignore
├── eslint.config.js
├── package.json
└── vite.config.js
```

---

## 4. Command Directory & Reference

The terminal supports standard Unix shell features: **Tab completion** for commands, paths, themes, and targets; **Up/Down arrow** history navigation; **Ctrl+C** to interrupt; and **Ctrl+L** to clear the screen.

### 4.1 Portfolio Commands

| Command | Usage | Description |
| --- | --- | --- |
| `whoami` | `whoami` | Renders developer persona, education, and contact in a code-editor window (`whoami.json`). |
| `projects` | `projects [name]` | Renders all flagship builds in `projects.json` format. Run `projects threadtrace`, `projects airsocket`, or `projects bitgit` for architectural deep dives. |
| `resume` | `resume` | Displays full structured ANSI resume matching `APS.pdf` (KIIT CGPA 7.97, ComSIA-2026 paper, ThreadTrace, AirSocket, BitGit). |
| `skills` | `skills` | Visual dashboard of proficiencies with graphical progress bars across Systems, Networking, Backend, and Frontend. |
| `contact` | `contact` | Displays phone, email, GitHub, LinkedIn, and website in a code-editor card (`contact.json`). |
| `neofetch` | `neofetch` | Hardware spec summary spoofing skills as system hardware alongside a 16-color test swatch. |
| `open` | `open <target>` | Opens target in a new browser tab (`open resume` opens `/resume.pdf`; supports `github`, `linkedin`, `email`, `website`, `threadtrace`, `airsocket`, `bitgit`, or custom URLs). |

### 4.2 Virtual Filesystem & Shell Commands

| Command | Usage | Description |
| --- | --- | --- |
| `ls` | `ls [-l] [-a] [path]` | Lists virtual directory contents with permissions, sizes, and color-coded directories. |
| `cat` | `cat [-n] <file>` | Displays file contents with auto-detected syntax highlighting for `.json`, `.md`, and `.sh`. |
| `cd` | `cd [path]` | Changes working directory (supports `~`, `..`, `-`, `/`, and relative paths). |
| `pwd` | `pwd` | Prints the absolute virtual current working directory. |
| `clear` | `clear` | Clears terminal viewport and resets buffer (shortcut: `Ctrl+L`). |
| `help` | `help [command]` | Lists all categorized commands or displays detailed syntax for a specific command. |
| `man` | `man <command>` | Displays BSD-style manual page (`man whoami`, `man threadtrace`, `man airsocket`, `man bitgit`, etc.). |
| `history` | `history [-c]` | Shows numbered command history from the current session (`-c` clears history). |
| `theme` | `theme [list \| name]` | Switches color palette and persists preference to `localStorage`. |
| `date` | `date` | Prints current system date, time, and timezone. |

### 4.3 Utilities & Easter Eggs

| Command | Usage | Description |
| --- | --- | --- |
| `matrix` | `matrix` | Launches a full-screen canvas digital rain animation. |
| `hack` | `hack` | Cinematic penetration test and root escalation sequence. |
| `cowsay` | `cowsay [text]` | Classic talking ASCII cow with word wrapping. |
| `quote` | `quote` (alias: `fortune`) | Displays inspiring quotes from computer scientists and systems engineers. |
| `sudo` | `sudo hire-me` | Superuser privilege escalation Easter egg. |
| `ping` | `ping recruiter` | Network latency ping simulation to recruiter endpoints. |
| `git` | `git log` | Displays simulated commit history of the portfolio. |
| `curl` | `curl amarpratap.dev` | Explains the live curl ANSI endpoint. |
| `rm` | `rm -rf /` | Playful permission denied / system self-defense sequence. |

---

## 5. Themes

The terminal includes 6 handcrafted color palettes that can be changed live using `theme <name>`:

| Theme Name | Description |
| --- | --- |
| `default` | Minimalist obsidian with mint and cyan accents |
| `matrix` | Retro green monochrome phosphor glow |
| `cyberpunk` | Neon cyan, hot magenta, and night city yellow |
| `dracula` | Classic vampire purple, pink, and turquoise |
| `amber` | Warm 1970s vintage CRT mainframe monitor |
| `solarized` | Low-contrast precision palette designed for eye comfort |

Selected themes are saved to `localStorage` and automatically restored when the visitor returns.

---

## 6. Flagship Engineering Projects Highlighted

### 1. ThreadTrace — Multi-Threaded CLI Log Analyzer
* **Stack**: Java 21+, GraalVM Native Image (AOT), Project Loom Virtual Threads, Memory-Mapped Files (Mmap).
* **Throughput**: **1.34 GB/s peak throughput** across 8 threads (200MB / 2.18M lines in 148 ms with 100% data consistency).
* **Startup & Memory**: **<8ms cold startup** and **~26MB RSS memory** via GraalVM AOT compilation.
* **Architecture**: Zero-allocation positional scanner bypassing regex NFA engines (10x speedup); static flyweight accumulators (`ONE_ERROR`, `ONE_WARN`) saving 6.5M+ heap allocations per run; embedded web dashboard.
* **Repository**: [`github.com/amarpratapsingh/ThreadTrace`](https://github.com/amarpratapsingh/ThreadTrace)

### 2. AirSocket — Resilient P2P File Transfer & Networking Lab
* **Stack**: Java 21+ (`java.base` only — zero external runtime dependencies), Raw TCP/UDP Sockets, AES-256-GCM AEAD, PBKDF2, Project Loom.
* **Throughput**: **5.41x throughput leap** (163.6 Mbps at 4KB to **886.0 Mbps** at 512KB) by tuning socket buffers and solving Nagle’s algorithm / TCP Delayed ACK contention. Up to **16.3 Gbps** loopback.
* **Architecture**: Fixed 28-byte custom binary header (V4 framing); automatic UDP discovery on `42069/UDP`; deterministic crash journals (`.airsocket_journal_*.bin`) for seamless resumption; 10-suite TCP socket tuning lab.
* **Repository**: [`github.com/amarpratapsingh/AirSocket`](https://github.com/amarpratapsingh/AirSocket)

### 3. BitGit — Distributed VCS from Scratch
* **Stack**: Node.js (ES Modules), SHA-1 Hashing, Custom Object Database.
* **Architecture**: Content-addressable object store (`.bg/objects/xx/yyy...`) using SHA-1 hashing and 2-character directory fan-out; index staging area (`.bg/index.json`); branch reference tracking; core plumbing and porcelain commands (`init`, `add`, `commit`, `status`, `diff`, `log`, `branch`, `checkout`).
* **Repository**: [`github.com/amarpratapsingh/BitGit`](https://github.com/amarpratapsingh/BitGit)

---

## 7. Local Development & Testing

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ or v20+ recommended)
* `npm` or `pnpm`

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/amarpratapsingh/whoamI.git
cd whoamI

# 2. Install dependencies
npm install

# 3. Start local development server with instant HMR
npm run dev

# 4. Run code quality verification
npm run lint

# 5. Build production distribution
npm run build

# 6. Preview production build locally
npm run preview
```

---

## 8. Deployment & CI/CD Pipeline

The project includes automated **GitHub Actions CI/CD** workflows:

1. **Continuous Integration (`.github/workflows/ci.yml`)**:
   Runs on every pull request and push to `main` across a multi-OS matrix (Ubuntu, macOS, Windows) and Node versions (20, 22), verifying linting and compilation.

2. **GitHub Pages Deployment (`.github/workflows/deploy.yml`)**:
   Automatically compiles the application with Vite and publishes the production `dist/` bundle to the `gh-pages` branch on every push to `main`.

### Enabling GitHub Pages:
1. Push your repository to GitHub.
2. In your repo, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, choose **Deploy from a branch**.
4. Select the **`gh-pages`** branch and folder **`/ (root)`**, then click **Save**.
5. Your portfolio is live immediately at `https://amarpratapsingh.github.io/whoamI/`!

*(To host directly at the root `https://amarpratapsingh.github.io/`, simply rename the repository on GitHub to `amarpratapsingh.github.io`.)*

---

## 9. Live `curl` Endpoint (Cloudflare Worker)

For visitors accessing your portfolio from a real Unix terminal:

```bash
curl amarpratap.dev
```

The script in [`worker/curl-resume.js`](file:///home/amar/Documents/Projects/Terminal%20Portfolio/worker/curl-resume.js) inspects the HTTP `User-Agent`:
* If requested via `curl`: Returns the complete ANSI-colored resume directly in stdout.
* If requested via a web browser: Redirects HTTP traffic to the interactive web terminal.

Deployable to Cloudflare Workers free tier via:
```bash
npx wrangler deploy worker/curl-resume.js --name amar-curl-resume
```

---

## 10. License

MIT License © 2026 Amar Pratap Singh. Free to inspect, fork, and adapt.
