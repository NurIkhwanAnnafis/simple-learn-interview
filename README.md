# 🎤 Learn Your Speaking and Answering

A lightweight, browser-based tool for simulating HR interview practice sessions. Build your own question list, craft your ideal answers, and rehearse with real text-to-speech playback — all without leaving the browser.

## Purpose

Preparing for an HR interview can be nerve-wracking. This app lets you:

- **Write custom HR interview questions** tailored to the specific role or company you're applying to
- **Draft and refine your answers** directly alongside each question
- **Listen to each question read aloud** using the browser's built-in speech synthesis engine, so you can practice responding naturally in a real interview setting
- **Choose a voice and language** that matches your target interview context

No accounts, no servers — everything runs locally in your browser.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Build Tool | [Vite 8](https://vite.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Text-to-Speech | [react-say 2](https://github.com/compulim/react-say) (Web Speech API) |
| Icons | [Lucide React](https://lucide.dev/) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (bundled with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/learn-presentation.git
cd learn-presentation

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

The app will start at **http://localhost:5173** (or the next available port). It supports Hot Module Replacement (HMR) — changes in source files reflect immediately in the browser.

### Other Commands

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview

# Run ESLint
npm run lint
```

---

## How to Use

1. **Write a question** — Type an interview question into the question field (e.g. *"Tell me about yourself"*)
2. **Select a voice** — Use the dropdown below the question to pick a TTS voice and language
3. **Play the question** — Click the ▶ button to hear the question spoken aloud
4. **Write your answer** — Type your prepared answer in the answer box below
5. **Add more questions** — Click **Add New Question** to add additional question/answer pairs
6. **Practice** — Play each question one by one and respond out loud as if in a real interview

---

## Project Structure

```
src/
├── components/
│   ├── Header.tsx           # Top navigation bar
│   ├── ScriptSegmentCard.tsx # Question + answer card with TTS controls
│   └── AddFieldButton.tsx   # Button to add a new question
├── hooks/
│   ├── useComposition.ts    # Manages the list of question segments
│   └── useTTS.ts            # Text-to-speech state and Web Speech API integration
├── types/                   # Shared TypeScript types
├── App.tsx                  # Root component and voice provider
└── main.tsx                 # Entry point
```

---

## Browser Compatibility

This app relies on the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API), which is supported in:

| Browser | Support |
|---|---|
| Chrome / Edge | ✅ Full support |
| Firefox | ⚠️ Partial (no voices on some OS) |
| Safari | ✅ Full support |

> **Note:** Voice availability depends on your operating system. Windows typically provides several voices; macOS and Android offer the widest selection.

---

## License

MIT
