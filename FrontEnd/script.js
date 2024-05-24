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

//Rediriger vers la section Login

const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', function () {
  window.location.href = './login.html';
});

document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.getElementById('login-button');
  if (window.location.pathname === '/FrontEnd/login.html') {
    loginButton.style.fontWeight = 'bold';
  }
});

// Initialisation de l'application
setupFilterButtons();
main();

//Comportement de l'état "Logged in"

const token = localStorage.getItem('authToken');
if (token) {
  setUpLoggedInState();
}

function setUpLoggedInState() {
  const modifyButton = createModifyButton();
  wrapHeaderAndAddModifyButton(modifyButton);
  setupLogout();
}

function wrapHeaderAndAddModifyButton(modifyButton) {
  const header = document.querySelector('#portfolio > h2');
  const wrapper = document.createElement('div');
  wrapper.className = 'header-wrapper';
  header.parentNode.insertBefore(wrapper, header);
  wrapper.appendChild(header);
  wrapper.appendChild(modifyButton);
}

function createModifyButton() {
  const button = createButtonwithIcon(
    'btn-modify',
    'fa-regular fa-pen-to-square',
    ' modifier'
  );

  const modal = createModal();
  addContentToModal(modal, '<h2>Modifier le Projet</h2>');

  button.addEventListener('click', function () {
    modal.style.display = 'block';
  });

  return button;
}

function createButtonwithIcon(btnClass, iconClass, textContent) {
  const button = document.createElement('button');
  button.className = btnClass;
  const icon = document.createElement('i');
  icon.className = iconClass;
  button.appendChild(icon);
  const text = document.createTextNode(textContent);
  button.appendChild(text);
  return button;
}

function setupLogout() {
  const login = document.getElementById('login-button');
  login.innerHTML = 'logout';
  login.onclick = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/FrontEnd/index.html';
  };
}

//Création de la fenêtre modale

function getOrCreateModal() {
  let modal = document.getElementById(MODAL_ID);
  if (!modal) {
    modal = createModal();
    document.body.appendChild(modal);
  }
  return modal;
}

function createModal() {
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.className = 'modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const closeBtn = createCloseButton();

  modalContent.appendChild(closeBtn);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  return modal;
}

function createCloseButton() {
  const closeBtn = document.createElement('span');
  closeBtn.className = 'close';
  closeBtn.textContent = '×';

  closeBtn.onclick = function () {
    modal.style.display = 'none';
  };
  return closeBtn;
}

// Ajouter du contenu à la modale
function addContentToModal(modal, content) {
  const modalContent = modal.querySelector('.modal-content');
  const contentElement = document.createElement('div');
  contentElement.innerHTML = content;
  modalContent.appendChild(contentElement);
}
