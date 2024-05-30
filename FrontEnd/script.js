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
  button.className = 'btn btn-select';
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
  document.querySelectorAll('.btn-select').forEach((button) => {
    button.className = 'btn btn-select';
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

// //Comportement de l'état "Logged in"

// const token = localStorage.getItem('authToken');
// if (token) {
//   setUpLoggedInState();
// }

// function setUpLoggedInState() {
//   const modifyButton = createModifyButton();
//   wrapHeaderAndAddModifyButton(modifyButton);
//   setupLogout();
// }

// function wrapHeaderAndAddModifyButton(modifyButton) {
//   const header = document.querySelector('#portfolio > h2');
//   const wrapper = document.createElement('div');
//   wrapper.className = 'header-wrapper';
//   header.parentNode.insertBefore(wrapper, header);
//   wrapper.appendChild(header);
//   wrapper.appendChild(modifyButton);
// }

// function setupLogout() {
//   const login = document.getElementById('login-button');
//   login.innerHTML = 'logout';
//   login.onclick = () => {
//     localStorage.removeItem('authToken');
//     window.location.href = '/FrontEnd/index.html';
//   };
// }

// function createModifyButton() {
//   const button = createButtonwithIcon(
//     'btn btn-modify',
//     'fa-regular fa-pen-to-square',
//     ' modifier'
//   );

//   // const modal = createModal('modal');
//   // button.addEventListener('click', function () {
//   //   modal.style.display = 'block';
//   // });

//   return button;
// }

// function createButtonwithIcon(btnClass, iconClass, textContent) {
//   const button = document.createElement('button');
//   button.className = btnClass;
//   const icon = document.createElement('i');
//   icon.className = iconClass;
//   button.appendChild(icon);
//   const text = document.createTextNode(textContent);
//   button.appendChild(text);
//   return button;
// }

// //Création de la fenêtre modale

// function getOrCreateModal(modalId, contentSetupFunction) {
//   let modal = document.getElementById('modal');
//   if (!modal) {
//     modal = createModal(modalId, contentSetupFunction);
//     document.body.appendChild(modal);
//   }
//   return modal;
// }

// function createModal(modalId, contentSetupFunction) {
//   const modal = document.createElement('div');
//   modal.id = modalId;
//   modal.className = 'modal';

//   const modalContent = document.createElement('div');
//   modalContent.className = 'modal-content';
//   modal.appendChild(modalContent);
//   document.body.appendChild(modal);

//   const closeBtn = createCloseButton(modal);
//   modalContent.appendChild(closeBtn);

//   if (contentSetupFunction) {
//     contentSetupFunction(modalContent);
//   }

//   return modal;
// }

// function createCloseButton(modalId) {
//   const closeBtn = document.createElement('span');
//   closeBtn.className = 'close';
//   closeBtn.textContent = '×';

//   closeBtn.onclick = function () {
//     modalId.style.display = 'none';
//   };
//   return closeBtn;
// }

// // personaliser la gallerie de la modale

// function setupPhotoGalleryModal(data) {
//   const modal = getOrCreateModal('photoGalleryModal');
//   const modalContent = modal.querySelector('.modal-content');
//   const galleryContainer = document.createElement('div');
//   galleryContainer.className = 'gallery-container';
//   modalContent.appendChild(galleryContainer);

//   const title = document.createElement('h2');
//   title.textContent = 'Galerie Photo';
//   galleryContainer.appendChild(title);

//   const imageContainer = document.createElement('div');
//   imageContainer.className = 'image-container';
//   displayImagesInModal(data, imageContainer);
//   galleryContainer.appendChild(imageContainer);

//   const addButton = document.createElement('button');
//   addButton.textContent = 'Ajouter une photo';
//   addButton.className = 'btn btn-primary';
//   addButton.id = 'addPhotoButton';
//   galleryContainer.appendChild(addButton);
//   addButton.addEventListener('click', function () {
//     const addPhotoModal = createModal(
//       'addPhotoModal',
//       setupAddPhotoModalContent
//     );
//     console.log(addPhotoModal);
//     addPhotoModal.style.display = 'block';
//     modal.style.display = 'none';
//   });

//   return modal;
// }

// function displayImagesInModal(data, container) {
//   data.forEach((item) => {
//     const imgWrapper = document.createElement('div');
//     imgWrapper.className = 'img-wrapper';
//     imgWrapper.setAttribute('data-id', item.id);

//     const img = document.createElement('img');
//     img.src = item.imageUrl;
//     img.alt = item.title;
//     img.className = 'gallery-img';

//     const deleteIcon = document.createElement('i');
//     deleteIcon.className = 'fa-solid fa-trash-can delete-icon';
//     deleteIcon.onclick = () => deleteProject(item.id, container, event);

//     imgWrapper.appendChild(img);
//     imgWrapper.appendChild(deleteIcon);
//     container.appendChild(imgWrapper);
//   });
// }

// async function deleteProject(id, container, event) {
//   event.preventDefault();
//   const authToken = localStorage.getItem('authToken');
//   const headers = new Headers();

//   if (authToken) {
//     headers.append('Authorization', `Bearer ${authToken}`);
//   }

//   try {
//     const response = await fetch(`http://localhost:5678/api/works/${id}`, {
//       method: 'DELETE',
//       headers: headers,
//     });

//     if (response.ok) {
//       const elementToRemove = document.querySelector(
//         `.img-wrapper[data-id="${id}]`
//       );
//       if (elementToRemove) {
//         container.removeChild(elementToRemove);
//       }
//       console.log('Projet supprimé avec succès');
//     } else {
//       throw new Error('Échec de la suppression du projet');
//     }
//   } catch (error) {
//     console.error('Erreur lors de la suppression du projet:', error);
//     alert('Impossible de supprimer le projet. Veuillez réessayer.');
//   }
// }

// function setupAddPhotoModalContent(modalContent) {
//   const addPhotoModal = getOrCreateModal('photoGalleryModal');
//   const returnBtn = document.createElement('span');
//   returnBtn.className = 'return-btn fa-solid fa-arrow-left';
//   modalContent.appendChild(addPhotoModal);
//   modalContent.appendChild(returnBtn);
//   returnBtn.addEventListener('click', () => {
//     (addPhotoModal.style.display = 'none'), (modal.style.display = 'block');
//   });

//   const formContainer = document.createElement('div');
//   formContainer.className = 'form-container';
//   modalContent.appendChild(formContainer);

//   const title = document.createElement('h2');
//   title.textContent = 'Ajout photo';
//   formContainer.appendChild(title);
// }

// Initialisation de l'application
setupFilterButtons();
main();

export { storedData };
