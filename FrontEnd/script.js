const url = 'http://localhost:5678/api/works';
fetch(url)
  .then((response) => response.json())
  .then((data) => addProjects(data));

//Cette fonction va boucler l'Array d'items et créer une balise figure pour chaque item
function addProjects(data) {
  data.forEach((item) => {
    makeProject(item);
    const figure = makeProject(item);
    appendFigureToGallery(figure);
  });
}
// Cette fonction crée une balise html correspondant à l'item projet
function makeProject(data) {
  const baliseFigure = document.createElement('figure');
  const img = document.createElement('img');
  const figCaption = document.createElement('figcaption');
  const { id, title, imageUrl } = data;
  img.src = imageUrl;
  img.alt = title;
  figCaption.innerHTML = title;

  baliseFigure.appendChild(img);
  baliseFigure.appendChild(figCaption);

  return baliseFigure;
}

//Cette fonction ajoute la balise créée à la galerie
function appendFigureToGallery(figure) {
  const gallery = document.querySelector('.gallery');
  gallery.appendChild(figure);
}

// Création des boutons dans

const portfolioSection = document.getElementById('portfolio');

const filterMenu = document.createElement('div');
filterMenu.className = 'filter-menu';

function createButton(id, text) {
  const button = document.createElement('button');
  button.id = id;
  button.textContent = text;
  button.className = 'btn';
  return button;
}

const buttons = [
  createButton('Tous', 'Tous'),
  createButton('Objets', 'Objets'),
  createButton('Appartements', 'Appartements'),
  createButton('Hotels', 'Hotels & Restaurants'),
];

buttons.forEach((button) => filterMenu.appendChild(button));

const galleryDiv = portfolioSection.querySelector('.gallery');
portfolioSection.insertBefore(filterMenu, galleryDiv);

console.log(filterMenu);
