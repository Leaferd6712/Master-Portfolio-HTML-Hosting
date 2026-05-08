# Fragments Context

## Project Overview

Fragments is a single-page browser narrative game built with only HTML, CSS, and JavaScript. The player is forced to decide how much of their life they are willing to sell in a city where memories are legal currency.

## Core Systems

- `money`: increases through work or memory sales
- `debt`: target amount the player is trying to cover
- `identity`: drops when self-defining memories are sold and drives atmosphere changes
- `relationships`: separate scores for Alex, Mara, and Jonah
- `memories`: dictionary of sold memory ids
- `soldMemories`: ordered list used for ledger display and scene reactions
- `flags`: boolean story switches that unlock dialogue changes and endings

## Narrative Structure

- Act I introduces the debt, the exchange, and the first compromise
- Act II shows relationships and selfhood beginning to erode through longer interstitial scenes and new sellable memories
- Act III presents premium memory sales, extra late-game decision points, and the final moral choice

## Expanded Flow

- `alex_checkin` fixes the earlier outside-exchange honesty branch and adds more Alex-driven options
- `landlord_portal`, `night_streets`, `collection_notice`, and `clinic_waiting_room` lengthen the route between the first sale and the identity pivot
- `memory_drift` is a dynamic reflection scene with repeatable choices that disappear once used
- `late_platform` adds more late-game relational memory sales before the premium ending scene

## Endings

- `redemption`
- `fractured`
- `hollow_victory`
- `amnesias_gift`
- `second_chance`

Endings are determined by a mix of money, identity, relationships, and whether the player refused the final sale.

## UI Notes

- The ledger shows the most recently sold memories
- Relationship bars update live
- The screen uses glitch and fade effects when identity drops or important memories are sold
- The game is responsive and designed to work on mobile widths

## Save System

- Save key: `fragments_save_main`
- State auto-saves after every choice
- Manual save button is available during play
- Continue and clear-save buttons appear on the title screen when a save exists

## Optional AI Route

AI scene generation is not built into the default project because the game is designed to run by opening `index.html` directly and browser-side API keys would be unsafe.

Safe approach if you want endless generated prompts later:

- Add a backend endpoint such as `POST /api/scene`
- Keep the API key server-side
- Send summarized game state, not raw DOM state
- Require the model to return strict scene JSON
- Validate and sanitize the response before merging it into the game flow

## Files

- `index.html`: main structure and screens
- `style.css`: visual theme and responsive layout
- `script.js`: game content and logic

## Important Constraint

The game is intentionally self-contained with no frameworks, build tools, or external libraries.