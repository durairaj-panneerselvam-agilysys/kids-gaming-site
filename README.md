# Kids Gaming Site

A fun, interactive, and educational gaming site for kids ages 10–15. This project is designed for learning web development, branding, and theming.

## How Branding Works
- Site branding is driven by `data/branding.json`:
  - `logo`, `favicon`, `slogan`, `contact`, and `socialMedia` fields are injected into the UI.
  - Update `branding.json` to instantly change the logo, favicon, slogan, contact info, and social links.
- Colors and fonts are set in `data/theme.json`.
- All content and styles update automatically when you edit these files and refresh the page.

## Customizing Branding
1. Edit `data/branding.json` to change organization name, logo, favicon, slogan, contact, or social links.
2. Place new icon images in `assets/icons/` if you add new social links.
3. Update `data/theme.json` for colors and font.
4. Refresh `index.html` in your browser to see changes.

## Learning Checkpoints
- Look for `TODO: student exercise` comments in code for extension ideas.
- Try adding a new game, changing the theme, or updating branding.
- Add a chatbot avatar or new social link using `branding.json`.

## Project Structure
```
kids-gaming-site/
  index.html
  styles.css
  scripts.js
  data/
    branding.json
    theme.json
    games.json
  assets/
    images/
    icons/
  README.md
  .gitignore
```

## License
MIT
