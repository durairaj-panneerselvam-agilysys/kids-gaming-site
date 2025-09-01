// Fetch and apply branding, theme, and games data
async function loadData() {
  const [branding, theme, games] = await Promise.all([
    fetch('data/branding.json').then(r => r.json()),
    fetch('data/theme.json').then(r => r.json()),
    fetch('data/games.json').then(r => r.json())
  ]);
  applyFavicon(branding.brand.logo.favicon);
  applyBranding(branding);
  applyTheme(theme);
  populateGames(games.games);
  setSlogan(branding.brand.slogan);
  setContact(branding.brand);
  setSocialLinks(branding.brand.socialMedia);
  setCountdown(games.countdownTarget);
}

// Dynamically set favicon
function applyFavicon(faviconUrl) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = faviconUrl;
}

function applyBranding(branding) {
  document.getElementById('site-logo').src = branding.brand.logo.title;
  document.getElementById('site-title').textContent = branding.brand.organizationName;
}

function setSlogan(slogan) {
  document.getElementById('site-slogan').textContent = slogan;
}

function setContact(brand) {
  document.querySelector('#contact-info a').textContent = brand.email;
  document.querySelector('#contact-info a').href = 'mailto:' + brand.email;
  document.querySelector('#contact-info p:nth-child(2)').textContent = 'Phone: ' + brand.mobile;
}

function setSocialLinks(social) {
  const container = document.getElementById('social-links');
  container.innerHTML = '';
  for (const [key, url] of Object.entries(social)) {
    const img = document.createElement('img');
    // Use fallback favicon for blog, else use icon from assets/icons
    if (key === 'blog') {
      img.src = 'https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/favicon-logo-with-name.png';
    } else {
      img.src = `assets/icons/${key}.png`;
    }
    img.alt = key;
    img.title = key.charAt(0).toUpperCase() + key.slice(1);
    img.style.width = '32px';
    img.style.height = '32px';
    img.style.borderRadius = '50%';
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.setAttribute('aria-label', key.charAt(0).toUpperCase() + key.slice(1));
    a.appendChild(img);
    container.appendChild(a);
  }
}

function applyTheme(theme) {
  for (const [k, v] of Object.entries(theme.colors)) {
    document.documentElement.style.setProperty(`--${k}`, v);
  }
  document.body.style.fontFamily = theme.font;
}

function populateGames(games) {
  const container = document.getElementById('games-container');
  container.innerHTML = '';
  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${game.thumb}" alt="${game.name} thumbnail" style="width:100%;border-radius:8px;">
      <h4>${game.name}</h4>
      <p>${game.description}</p>
      <a href="${game.url}" target="_blank">Play Now</a>
    `;
    container.appendChild(card);
  });
}

function setCountdown(target) {
  function update() {
    const now = new Date();
    const end = new Date(target);
    let diff = Math.max(0, end - now);
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    document.getElementById('timer').textContent = `${h}:${m}:${s}`;
  }
  update();
  setInterval(update, 1000);
}

document.getElementById('year').textContent = new Date().getFullYear();


// TODO: student exercise - Add search/filter for games
// TODO: student exercise - Add dark mode toggle
// TODO: student exercise - Add chatbot avatar from branding.json

window.addEventListener('DOMContentLoaded', loadData);
