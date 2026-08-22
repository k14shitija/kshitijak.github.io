# CalorieCapture

Phone-and-desktop fitness MVP from the ISE 588 Team Red deck: one-tap meal photos, gym-machine tutorials, a calories-in-vs-out dashboard, habit reminders, and a beginner routine generator.

Live path on this GitHub Pages site: [calorie-capture/](https://kshitijak.github.io/calorie-capture/)

## What you can do

- Set a daily calorie target from age, size, and goal (John-style busy-professional demo included)
- Photograph a meal, pick plate size, and get an on-device estimate you can edit
- Search gym machines and follow short form tutorials, then log minutes burned
- Generate a 20–60 minute beginner routine for gym or home
- Track water, streaks, badges, and a friend challenge board
- Install it on a phone (Add to Home Screen). Dark and light themes

Estimates stay in the browser. They are educational, not medical advice, and they are not a 95% lab-grade nutrition model.

## Run locally

Open `calorie-capture/index.html`, or from the repo root:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080/calorie-capture/`.

## Tests

```bash
node calorie-capture/tests/test_engine.js
```

## Deploy

This folder is static. After merge to `main`, GitHub Pages serves it next to the portfolio. No build step.
