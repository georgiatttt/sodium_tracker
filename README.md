# Sodium Sidekick 🌴🥥

Sodium Sidekick is a playful web app that helps users understand daily sodium intake through a visual, story-like metaphor instead of clinical nutrition tables.

🔗 **Live Demo:** https://sodium-tracker.vercel.app


## Problem Statement
Monitoring sodium intake is important for many people, especially children with heart conditions, but most nutrition-tracking apps feel adult-oriented, text-heavy, and intimidating. A simple question like *“How salty was that meal?”* often leads to overwhelming charts and numbers.

## Solution
Sodium Sidekick turns sodium tracking into a visual experience centered around a **leaning coconut tree**:

- Each food added places a **coconut 🥥** in the tree
- The **size of the coconut** reflects how much sodium the food contains
- As total sodium increases, the **tree leans further**
- At **2,000 mg**, the tree tips dramatically with a 💥 visual cue

Instead of scolding or warning messages, users can *see* when their intake is approaching the daily limit.

## How It Works
1. The user types in a food (e.g., “mac and cheese”)
2. The app fetches nutrition data from Open Food Facts
3. Sodium content is converted to milligrams
4. A coconut is added to the tree canopy
5. The tree leans proportionally as sodium accumulates
6. When intake crosses 2,000 mg, a brief explosion animation appears

## API Used
**Open Food Facts API**  
📄 Documentation: https://world.openfoodfacts.org/data

**Usage Details:**
- The app sends a search query for the entered food
- Retrieves product data in JSON format
- Reads the `sodium_100g` field
- Converts sodium values to milligrams
- Uses this value to:
  - Update total sodium
  - Size each coconut
  - Control the tree’s lean animation

## Features
- 🔍 Search for foods and retrieve real nutrition data
- 🥥 One coconut per food entry, scaled by sodium content
- 🌴 Leaning tree visualization tied to total intake
- 💥 Visual alert when crossing the 2,000 mg daily threshold
- 🧂 Running total of daily sodium
- 🚫 Reset button to start a new day

## Tech Stack
- **Frontend:** React
- **Build Tool:** Vite
- **Language:** JavaScript
- **Styling:** CSS
- **Deployment:** Vercel

## Getting Started (Run Locally)

Clone the repository and start the development server:

```bash
git clone https://github.com/georgiatttt/sodium_tracker.git
cd sodium_tracker
npm install
npm run dev

## Author
Built end-to-end by Georgia Thomas as a personal and portfolio project exploring user-centered design, React state management, animation-driven UI feedback, and frontend deployment.