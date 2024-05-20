// const url = 'http://localhost:5678/api/works';
// let storedData = null;

// async function fetchData(url) {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching data', error);
//   }
// }

// async function main() {
//   try {
//     storedData = await fetchData(url);
//     if (storedData) {
//       displayProjects(storedData);
//     }
//   } catch (error) {
//     console.error('Failed to load projects:', error);
//     showErrorMessage('Failed to load projects. Please try again later.');
//   }
// }

// function displayProjects(data) {
//   const displayedProjectIds = new Set();
//   data.forEach((item) => {
//     if (!displayedProjectIds.has(item.id)) {
//       const project = makeProject(item);
//       appendProjectToGallery(project);
//       displayedProjectIds.add(item.id);
//     }
//   });
// }

// function makeProject(item) {
//   const { categoryId, title, imageUrl } = item;
//   const figure = document.createElement('figure');
//   const img = document.createElement('img');
//   const figCaption = document.createElement('figcaption');

//   img.src = imageUrl;
//   img.alt = title;
//   figCaption.textContent = title;
//   figure.className = categoryId;
//   figure.append(img, figCaption);

//   return figure;
// }

// function appendProjectToGallery(figure) {
//   const gallery = document.querySelector('.gallery');
//   gallery.appendChild(figure);
// }

// function setupFilterButtons() {
//   const portfolioSection = document.getElementById('portfolio');
//   const gallery = portfolioSection.querySelector('.gallery');
//   const filterMenu = document.createElement('div');
//   filterMenu.className = 'filter-menu';
//   portfolioSection.insertBefore(filterMenu, gallery);

//   const filterButtons = setButtonParams();
//   filterButtons.forEach((itemButton) => {
//     const button = createButton(itemButton.id, itemButton.text);
//     button.addEventListener('click', () =>
//       handleButtonClick(button, itemButton)
//     );
//     filterMenu.appendChild(button);
//   });
// }

// function createButton(id, text) {
//   const button = document.createElement('button');
//   button.id = id;
//   button.textContent = text;
//   button.className = 'btn';
//   return button;
// }

// function setButtonParams() {
//   return [
//     { id: 'Tous', text: 'Tous', categoryId: null },
//     { id: 'Objets', text: 'Objets', categoryId: 1 },
//     { id: 'Appartements', text: 'Appartements', categoryId: 2 },
//     { id: 'Hotels', text: 'Hotels & Restaurants', categoryId: 3 },
//   ];
// }

// function handleButtonClick(button, itemButton) {
//   resetButtonStyle();
//   button.classList.add('active-button');
//   clearGallery();
//   const filteredData = itemButton.categoryId
//     ? filterData(storedData, itemButton.categoryId)
//     : storedData;
//   displayProjects(filteredData);
// }

// function resetButtonStyle() {
//   document.querySelectorAll('.btn').forEach((button) => {
//     button.className = 'btn';
//   });
// }

// function clearGallery() {
//   document.querySelectorAll('figure').forEach((figure) => figure.remove());
// }

// function filterData(data, categoryId) {
//   if (categoryId === null) return data;
//   return data.filter((item) => item.categoryId === categoryId);
// }

// setupFilterButtons();
// main();

// Définition de l'URL de l'API
const url = 'http://localhost:5678/api/works';
let storedData = null;

// Fonction asynchrone pour récupérer les données de l'API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
  }
}

// Fonction principale pour lancer l'application
async function main() {
  try {
    storedData = await fetchData(url);
    if (storedData) {
      displayProjects(storedData);
    }
  } catch (error) {
    console.error('Échec du chargement des projets :', error);
    showErrorMessage(
      'Échec du chargement des projets. Veuillez réessayer plus tard.'
    );
  }
}

// Affichage des projets dans la galerie
function displayProjects(data) {
  const displayedProjectIds = new Set();
  data.forEach((item) => {
    if (!displayedProjectIds.has(item.id)) {
      const project = makeProject(item);
      appendProjectToGallery(project);
      displayedProjectIds.add(item.id);
    }
  });
}

// Création d'un élément de projet pour l'affichage
function makeProject(item) {
  const { categoryId, title, imageUrl } = item;
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const figCaption = document.createElement('figcaption');

  img.src = imageUrl;
  img.alt = title;
  figCaption.textContent = title;
  figure.className = categoryId;
  figure.append(img, figCaption);

  return figure;
}

// Ajout du projet à la galerie
function appendProjectToGallery(figure) {
  const gallery = document.querySelector('.gallery');
  gallery.appendChild(figure);
}

// Configuration des boutons de filtre
function setupFilterButtons() {
  const portfolioSection = document.getElementById('portfolio');
  const gallery = portfolioSection.querySelector('.gallery');
  const filterMenu = document.createElement('div');
  filterMenu.className = 'filter-menu';
  portfolioSection.insertBefore(filterMenu, gallery);

  const filterButtons = setButtonParams();
  filterButtons.forEach((itemButton) => {
    const button = createButton(itemButton.id, itemButton.text);
    button.addEventListener('click', () =>
      handleButtonClick(button, itemButton)
    );
    filterMenu.appendChild(button);
  });
}

// Création d'un bouton
function createButton(id, text) {
  const button = document.createElement('button');
  button.id = id;
  button.textContent = text;
  button.className = 'btn';
  return button;
}

// Définition des paramètres des boutons
function setButtonParams() {
  return [
    { id: 'Tous', text: 'Tous', categoryId: null },
    { id: 'Objets', text: 'Objets', categoryId: 1 },
    { id: 'Appartements', text: 'Appartements', categoryId: 2 },
    { id: 'Hotels', text: 'Hotels & Restaurants', categoryId: 3 },
  ];
}

// Gestion du clic sur les boutons
function handleButtonClick(button, itemButton) {
  resetButtonStyle();
  button.classList.add('active-button');
  clearGallery();
  const filteredData = itemButton.categoryId
    ? filterData(storedData, itemButton.categoryId)
    : storedData;
  displayProjects(filteredData);
}

// Réinitialisation du style des boutons
function resetButtonStyle() {
  document.querySelectorAll('.btn').forEach((button) => {
    button.className = 'btn';
  });
}

// Nettoyage de la galerie
function clearGallery() {
  document.querySelectorAll('figure').forEach((figure) => figure.remove());
}

// Filtrage des données selon la catégorie
function filterData(data, categoryId) {
  return categoryId === null
    ? data
    : data.filter((item) => item.categoryId === categoryId);
}

// Initialisation de l'application
setupFilterButtons();
main();
