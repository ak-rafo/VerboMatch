# Verbo Match · how the files fit together

Both languages now share **one codebase**. Fix or add something once and it works in Portuguese and Spanish.

| File | What it is | Edit it when… |
|---|---|---|
| `index.html` / `es.html` | Tiny start pages (title, colors, icons) | almost never |
| `boot.js` | Loader that assembles the app | almost never |
| `app.js` | **All shared app logic** (games, settings, stats, XP…) | adding features or fixing bugs |
| `app.css` | **All shared styles**, including dark mode | changing the look |
| `app-body.html` | Shared page layout (header, tabs, pop-ups) | changing the layout |
| `theme-es.css` | Spanish red/orange colors | Spanish colors only |
| `lang-pt.txt` / `lang-es.txt` | Language packs: verbs, vocab, stories, slang, grammar text | changing words or content |
| `sw.js` | Offline cache | **bump `VERSION` on every upload** |

`app.js` and `app-body.html` contain markers like `/*@@H12@@*/`. Each marker is filled from the matching `@@@H12 …@@@` block in the language pack. Don't delete or rename markers.

The app needs a web address to run (GitHub Pages). Opening `index.html` straight from your computer's files won't work.

To get help with an update, attach all the files above, or the latest zip.
