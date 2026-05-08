# Fragments

Fragments is a self-contained browser narrative game built with plain HTML, CSS, and JavaScript.

## Run

Open `index.html` in any modern browser.

## What It Includes

- A title screen with new game and continue options
- A longer multi-act branching story about selling memories for money
- Relationship, identity, coherence, and money tracking
- Extra interstitial scenes, more sellable memories, and a reflection loop that adds replayable mid-game choices
- Multiple endings based on what the player sold and protected
- Local save/load using `localStorage`
- Procedural `Market Pulse` offers that refresh as days pass
- Memory synthesis (`Fuse Last Two`) that generates synthetic memories
- Distorted narration when coherence falls (unreliable narrator effect)
- 120 generated long-run scenarios in an `Extended Runtime Protocol` loop
- A hard gate of 100 completed scenarios before endings unlock
- Scenario looping that repeats after 120 (cursor wraps and keeps going)
- Meta progression (`runs`, `endings unlocked`, `sold total`, `synthesized`)
- Archive echoes that persist between runs
- Optional adaptive ambience toggle (`Enable Audio` / `Mute Audio`)

## Files

- `index.html` contains the layout
- `style.css` contains the responsive dark atmospheric styling
- `script.js` contains the story data, state tracking, procedural market/synthesis systems, save/meta systems, and scene logic

## New Controls

- Use `Market Pulse` in the right sidebar to sell dynamic generated memories.
- Use `Fuse Last Two` after selling at least two memories to synthesize a new fragment.
- Use `Enable Audio` in the scene header to start adaptive ambience.

## Optional AI Expansion

The current version does not use AI at runtime on purpose. It is meant to work by opening `index.html` directly, and putting an AI API key in browser JavaScript would expose that key to anyone who opens DevTools.

If you want effectively endless AI-generated scenes, the safe approach is:

1. Add a small backend endpoint such as `POST /api/scene` using a serverless function or a tiny Node server.
2. Keep the model API key on that backend only.
3. Send a compact state summary from the browser, for example: current scene, money, identity, relationships, sold memories, and important flags.
4. Ask the model to return strict JSON only, such as:

```json
{
	"title": "Generated Scene",
	"subtitle": "A late-night choice",
	"text": ["Paragraph 1", "Paragraph 2"],
	"choices": [
		{
			"text": "Choice label",
			"note": "Why it matters",
			"effects": {
				"money": 0,
				"identity": -2,
				"relationships": { "alex": 1 },
				"flags": { "generatedSceneUsed": true }
			},
			"next": "relationship_choice"
		}
	]
}
```

5. In `script.js`, add an async function such as `generateAIScene(state)` and call it from a special scene like `memory_drift` or from a new "endless archive" branch.
6. Validate the returned JSON before rendering it so the game only accepts safe fields you expect.

If you want, the next step after this is to add a minimal backend example for that API flow.