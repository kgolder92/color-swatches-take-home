# 🎨 Distinct Color Explorer

An interactive app to explore named colors based on HSL (Hue, Saturation, Lightness) values using [TheColorAPI](https://www.thecolorapi.com/). Built with React, this app emphasizes performance, progressive rendering, and visual feedback.

---

## 🚀 Running the Project Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/kgolder92/color-swatches-take-home.git
   cd color-swatches-take-home
2. **Install dependencies and Start the development server**
   ```bash
    npm install
    npm start
3. **Open your browser and navigate to http://localhost:3000**

## 📕 Overview
The goal of this project was to build a performant and user-friendly interface if HSL color swatches that takes in user inputs for saturation (s) and lightness(l), and renders a single swatch for each of the distinct hue names for the given S and L values from the API.
A key part of this challenge was avoiding unecessary API requests

## 🧠 Technologies Used
- React (with hooks)
- SCSS Modules
- TheColorAPI
- lodash.debounce for input debouncing

## ✨ Design Decisions
When building this project, I focused on creating a smooth and satisfying user experience while keeping performance top of mind. As users tweak the saturation and lightness values, a custom debounced hook ensures we don’t overload the API with unnecessary calls. Behind the scenes, I used a binary search over the hue spectrum, jumping only to points likely to have distinct named colors which cuts down on redundant requests.
Visually, I wanted the interface to feel alive and responsive. Colors render progressively as they’re fetched, giving immediate feedback rather than making users wait. To keep things polished, I added skeleton cards as placeholders to maintain layout consistency and signal that more is loading. A color counter updates in real time, even changing its color to match the latest fetched swatch. And once the loading is complete, a cheerful toast lets users know they’re all set. All of these details come together to make exploring color feel quick, intuitive, and a little delightful.

## 📂 File Structure
```text
    src/
    ├── api/
    │   └── fetchColors.js
    ├── components/
    │   ├── App.jsx
    │   ├── Controls.jsx
    │   ├── SwatchGrid.jsx
    │   └── ColorSwatch.jsx
    ├── helpers/
    │   └── generateDistinctColors.js
    ├── hooks/
    │   └── useDebouncedEffect.js
    ├── styles/
    │   └── SwatchGrid.module.scss
    └── App.scss 
```
## 🧠 Future Improvements
cacheing to reduce api calls even more
optimization like cleaning up unused dependencies and such
Allow exporting or saving color palettes (would be fun)

### Other
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- I ended up doing most of the take-home in one go and didn’t make intermediate commits — something I absolutely avoid on a production team. In hindsight, I should have broken things up more clearly. If it’s helpful, I’d be happy to walk through my thinking

