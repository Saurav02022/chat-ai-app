# chat-ai-app

A single-page chat UI over OpenAI, streamed token by token. It is four source files: a page, two components, and one API route. There is no database, no auth, and no session persistence — reload the page and the conversation is gone.

I built it to get the streaming path right end to end: how a server route hands back a readable stream, how the client hook consumes it, and where validation belongs when the only thing between the browser and a paid API is one route handler.

Next.js 15 (App Router) · React 19 RC · TypeScript · Tailwind CSS · Vercel AI SDK v3

Live: <https://chat-ai-app-saurav02022.vercel.app> · Source: <https://github.com/Saurav02022/chat-ai-app>

## What it does

Type a message, it appears immediately as a user bubble, and the assistant's reply renders progressively as tokens arrive rather than after the full response completes. The message list is capped in height and scrolls; an "AI is thinking..." line shows while a request is in flight, and the input and send button are both disabled for that window so a second request can't start mid-stream.

The model is `gpt-3.5-turbo`, hardcoded in `app/api/chat/route.ts`. It is not user-selectable, and GPT-4 is not wired up — switching models is a one-line edit to that file.

## Where things live

```
app/
  page.tsx                 centers <Chat /> on a gradient background; that's all it does
  layout.tsx               fonts (Geist), Vercel Analytics + Speed Insights
  components/Chat.tsx      the whole client: useChat(), message list, error banner, input form
  components/Message.tsx   one bubble — right/blue for user, left/grey for everything else
  api/chat/route.ts        POST handler: validate, then streamText() back to the client
```

## How a message round-trips

`Chat.tsx` calls `useChat()` from `ai/react` with no arguments, so it posts to the hook's default endpoint, `/api/chat`, carrying the full message array — the entire visible conversation, every turn. There is no server-side memory; context exists only because the client resends it.

The route pulls `messages` off the JSON body and rejects three things before spending a token: a missing or empty array (400), any message whose `content` is empty or whitespace-only (400), and a conversation longer than `MAX_MESSAGE_COUNT = 20` (400). That cap is the cost control — since the whole history is resent on every turn, it bounds how large a prompt a single client can force.

Valid input goes to `streamText({ model: openai("gpt-3.5-turbo"), messages })` and comes back via `result.toDataStreamResponse()`. That is the AI SDK's own wire format, not raw SSE or plain text, which is why the client has to be the SDK's `useChat` rather than a hand-rolled `fetch` — the hook knows how to parse the framing and append deltas onto the in-progress assistant message. Anything thrown inside the handler is caught, logged server-side, and returned as `{ error }` with a 500; when it's an `Error` the message text is passed through, so upstream OpenAI failures surface in the UI instead of dying silently.

Before rendering, `Chat.tsx` filters the hook's messages down to the `user` and `assistant` roles, so `system`, `tool`, `function`, and `data` entries never reach the DOM even though the SDK's type union allows them.

## Design notes

- **Validation lives in the route, not the client.** The client checks nothing. The route is the only trust boundary that matters — it holds the API key and it's what a script would hit directly. Duplicating the checks in `Chat.tsx` would improve the error UX slightly and protect nothing.
- **`useChat` instead of driving the stream by hand.** Reading the response body reader, buffering partial chunks, and reconciling them into React state is real work, and the SDK's wire format would need reimplementing to do it. The cost is that both ends are now coupled to the SDK.
- **The API key stays server-side.** `OPENAI_API_KEY` is read from the environment by `@ai-sdk/openai` inside the route handler. It is never prefixed `NEXT_PUBLIC_` and never reaches the bundle.
- **No conversation persistence.** Storing history means a database and an identity for every visitor — most of the work of a real app, for a demo of a streaming path.

## Run it

Requires Node 18.18 or newer, which is Next 15's floor.

```bash
git clone https://github.com/Saurav02022/chat-ai-app.git
cd chat-ai-app
npm install
echo "OPENAI_API_KEY=sk-..." > .env.local
npm run dev          # http://localhost:3000
```

`npm run build` / `npm start` for production, `npm run lint` for ESLint.

## Known limitations

- **The Retry button doesn't retry.** It calls `handleSubmit` directly, which resubmits the *input field* — empty after a send — rather than replaying the failed request. Recovering properly means holding onto the last outbound message and calling `reload()`.
- **No tests.**
- **The 20-message cap is per-request, not per-user.** Nothing rate-limits a client that reloads the page repeatedly; a public deployment on a real key wants a rate limiter in front of the route.
- **`zod`, `date-fns`, and `dotenv` are dependencies but unused** — nothing under `app/` imports them. They should be dropped.
- **`layout.tsx` still carries the `create-next-app` metadata** (`title: "Create Next App"`), so the browser tab and any link preview are wrong.
- **React is pinned to a 19 RC build**, not a stable release.
