# Salt Island

Children with heart conditions often need to monitor and limit their sodium intake. Salt Island is a web app that helps kids understand different levels of daily sodium intake in a fun, interactive way. Users type in a food name, and the app fetches nutrition data in real time to dynamically update a tree’s coconuts and lean angle.


🔗 **Live Demo:** https://sodium-tracker.vercel.app


## Goal
Salt Island demonstrates the sodium content of foods visually, through a leaning coconut tree: 

- Each food added puts a coconut in the tree
- Coconut size reflects how much sodium the food contains
- As total sodium increases, the tree leans further
- At the sodium limit (default 2,000 mg), the tree falls over with a 'crash' animation

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
- Search for foods and retrieve real nutrition data
- One coconut per food entry, scaled by sodium content
- Leaning tree visualization tied to total intake
- Visual alert when crossing the 2,000 mg daily threshold
- Running total of daily sodium
- Reset button to start a new day

## Tech Stack
- **Frontend:** React
- **Build Tool:** Vite
- **Language:** JavaScript
- **Styling:** CSS
- **Deployment:** Vercel

## Author
Built end-to-end by Georgia Thomas as a personal and portfolio project exploring user-centered design, React state management, animation-driven UI feedback, and frontend deployment.

## Getting Started (Run Locally)

Clone the repository and start the development server:

```bash
git clone https://github.com/georgiatttt/sodium_tracker.git
cd sodium_tracker
npm install
npm run dev

