# AI Chat Application

This is a simple AI chat application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It integrates with the **Vercel AI SDK** to communicate with OpenAI models (like **GPT-3.5** and **GPT-4**) to generate dynamic AI responses.

## Features

- **Interactive Chat**: Communicate with the AI using a chat interface.
- **Streamed Responses**: Get instant AI responses with streaming, providing a more natural conversation flow.
- **Error Handling**: Graceful error display with retry functionality in case of failures.
- **Responsive Design**: Fully responsive UI that works well on both desktop and mobile devices.
- **Tailwind CSS**: Provides a modern, customizable design.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Vercel AI SDK, Next.js API routes
- **AI Integration**: OpenAI models (GPT-3.5, GPT-4)
- **Deployment**: Vercel

## Setup

### Prerequisites

1. **Node.js** (version 14 or above)
2. **Vercel Account** (for deployment on Vercel)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Saurav02022/chat-ai-app.git
    cd ai-chat-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:

    ```bash
    OPENAI_API_KEY=your-openai-api-key
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

    The app will be available at `http://localhost:3000`.

---

<!-- AUTO-UPDATE-START -->
**Last Updated:** 2025-11-15 08:58:25 IST

*This section is automatically updated daily at 8:30 AM IST by GitHub Actions.*
<!-- AUTO-UPDATE-END -->
