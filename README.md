# Interactive Product Inventory & Analytics Dashboard

JavaScript capstone mini project (static site: HTML + CSS + JS, no build step).

## Files
- `index.html` – page layout
- `style.css`  – styling
- `script.js`  – all project logic (prompt(), if/else, switch, loops with break/continue,
                 regular + arrow functions, forEach, filter, map)
- `render.yaml` – Render Static Site config (optional)

## Run locally
Just double-click `index.html`, or run `npx serve .`

## Deploy on Render (get a web link)
1. Create a free GitHub account and a new repository.
2. Upload ALL files in this folder to the repository (drag & drop on github.com works).
3. Go to https://render.com -> **New +** -> **Static Site** -> connect your repository.
4. Settings:
   - Build Command: *(leave empty)*
   - Publish Directory: `.`
5. Click **Create Static Site**. After about a minute Render gives you a link like
   `https://inventory-dashboard.onrender.com`.

## Expected output (demo: Monitor, $150)
```
--- Initializing Inventory System ---
[Prompt executed: User adds "Monitor" at "$150"]

--- Processing Inventory Roster (forEach) ---
* Item: Laptop ($800) -> Category: Premium
* Item: Mouse ($25) -> Category: Budget
* Item: Monitor ($150) -> Category: Standard

--- Financial Analytics ---
Total Inventory Value: $975
Filtered Affordable Items (Under $200): ["Mouse", "Monitor"]
Formatted Report List: ["LAPTOP: $800", "MOUSE: $25", "MONITOR: $150"]
```
