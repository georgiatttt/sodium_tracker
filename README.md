# Sodium Sidekick 🧂

## Problem Statement
Children with heart conditions often need to carefully limit their daily sodium intake, but most nutrition or health-tracking apps are designed for adults and feel intimidating, text-heavy, or clinical. A kid who just wants to know “how salty was that mac and cheese?” shouldn’t need to wade through dense nutrition tables.  

**Sodium Sidekick** makes sodium awareness playful and visual: a beach scene where every 1000 mg of sodium becomes a sand pile, starting with a bottle washed up on shore. It turns health tracking into a simple, story-like experience kids can actually enjoy.

---

## Solution
The app lets users type in any food (for example, *pretzels* or *tomato soup*). It fetches real nutrition data and displays how much sodium the food contains.  

- The **first 1000 mg** fills a **bottle** with sand.  
- Every **additional 1000 mg** creates a **new sand pile** around the bottle.  
- A friendly **mermaid 🧜‍♀️** floats nearby as a cheerful visual companion.  

This playful metaphor helps kids understand sodium limits in a tangible way — seeing when their “beach” starts to overflow encourages healthy choices without scolding.

---

## API Used
- **API Name:** Open Food Facts API  
- **API Documentation:** [https://world.openfoodfacts.org/data](https://world.openfoodfacts.org/data)  
- **How it's used:**  
  The app sends a query (e.g. “mac and cheese”) to Open Food Facts and retrieves the product’s nutrition data in JSON format. It reads the `sodium_100g` field and converts it to milligrams. This sodium value updates the running total and drives the visual animation of the bottle and sand piles.

---

## Features
- 🔍 Search for any food and instantly see its sodium content  
- 🧴 Visual “bottle + beach” metaphor that fills as sodium increases  
- 🧜‍♀️ Animated mermaid companion to make tracking fun  
- 🧂 Automatic running total with clear daily-limit visualization  
- 🚫 Reset button to start a new day’s tracking  

---

## Setup Instructions
1. Clone this repository  
   ```bash
   git clone https://github.com/yourusername/sodium-sidekick.git
   cd sodium-sidekick
