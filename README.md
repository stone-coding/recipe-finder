# Recipe Finder – AI Generated Prototype

## Project Description

This project is an AI-assisted interactive prototype of a Recipe Finder web application. The goal of the prototype is to explore how AI can accelerate UI prototyping and early usability testing.

Users can search for recipes based on ingredients, filter recipes by dietary preferences such as vegetarian or gluten-free, browse recipe cards, and view full recipe details through a modal interface.

The prototype was initially generated using Claude based on a natural language prompt describing the required features and UI layout. The generated code was then reviewed and slightly refined into a working interactive prototype built with React.

The focus of this project is not production-ready functionality but rather rapid interface exploration and user interaction testing.

---

## Overview

Recipe Finder is a lightweight web prototype that allows users to discover recipes based on ingredients they already have.

The project demonstrates how generative AI can support rapid UI prototyping and interaction design for early-stage product ideas.

---

## Features

- Ingredient-based recipe search
- Dietary filters
  - Vegetarian
  - Vegan
  - Gluten-Free
  - Dairy-Free
- Recipe card grid interface
- Recipe detail modal
- "Show More" progressive loading

---

## Technologies

- React
- JavaScript
- Tailwind CSS
- Client-side filtering logic

---

## AI Usage

The initial version of this application was generated using Claude with a prompt describing the functional and design requirements of a recipe finder application.

Claude generated the base React interface including recipe cards, filtering logic, modal interaction, and layout structure.

The generated code was then reviewed and slightly adjusted for usability testing.

---

## Limitations

This prototype is frontend-only and intended for interaction testing.

Current limitations include:

- No backend server
- No database
- Hardcoded recipe dataset
- No persistent storage after page refresh

---

## Future Improvements

Potential future improvements include:

- persistent favorites using localStorage
- more advanced ingredient matching
- improved search feedback
- backend integration with a real recipe database