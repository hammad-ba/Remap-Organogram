# Human + AI Operating Model

An interactive organogram showing how humans and AI work side by side in each
function. Humans lead and decide; AI assists, executes, monitors and amplifies.

Open `index.html` in a browser. There is no build step and no server needed.

## Reusing it for another organisation

The design and the organisation data are separate:

| Path | What it is | Organisation-specific? |
|---|---|---|
| `index.html` | Page shell | No |
| `src/styles.css` | Visual design, light and dark themes, print | No |
| `src/app.js` | Renders the page from the data | No |
| `data/remap.js` | REMAP's seats, functions, flows | **Yes** |

To build one for a client, copy `data/remap.js` to `data/<client>.js`, replace
the content, and change the `<script src="data/remap.js">` line in `index.html`.

## Data schema

`window.ORG_DATA` holds:

- `meta`: `organisation`, `title`, `subtitle`, `asOf`, `version`, `classification`.
- `brand`: `human` and `ai` colours. Human uses the organisation's primary colour;
  AI uses a contrasting technology accent.
- `legend`: entries of `{ mode, label }`.
- `leadership`: Tier 1 seats `{ id, name, status, interim?, summary }`.
- `strategicLayer`: `{ title, aiName, human: [item], ai: [item] }`.
- `functions`: `{ id, name, metric, status, interim?, note?, human: [item], ai: [item], handoffs: [{ to, what }] }`.
  Keep `human` and `ai` to the 3–5 most important items each.
- `sharedAI`: `{ name, detail, usedBy: [functionId] | ["all"] }`.
- `workflows`: `{ id, title, steps: [{ actor, text, mode }] }`, written as Human → AI → Human.
- `seats`: every seat or responsibility for the detail view:
  `{ id, name, function, execution: "human" | "agent", status: "filled" | "vacant" | "fractional", reportsTo?, dotted?, reviewers?, interim?, heldBy?, summary }`.
- `pending`: `{ key: assumption }` for anything awaiting confirmation. Any item or
  seat can carry `pending: "key"` to show a small marker.

An `item` is `{ text, mode, pending? }`, where `mode` is:

- `human`: Human-led (decisions, relationships, approvals, accountability)
- `assisted`: AI-assisted (analysis, drafting, decision support). Use only where a source says so.
- `led`: AI-led (repetitive, rule-based, monitored work).

Vacancy counts and team sizes on each function card are worked out from `seats`.

## Status

- Level 1 overview: built.
- Level 2 (click a function to see its seats, reporting lines, handoffs, decision
  rights and seat illustrations): next.
