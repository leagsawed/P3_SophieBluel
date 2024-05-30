//Création de la fenêtre modale

export { createModal, setupContentGalleryModal };
import { storedData } from './script.js';

function createModal() {
  const modal = document.createElement('div');
  modal.id = 'modalId';
  modal.className = 'modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const closeBtn = createCloseButton();
  modalContent.appendChild(closeBtn);
  closeBtn.addEventListener('click', () => {
    deleteModal('modalId');
  });

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  return modal;
}

function createCloseButton() {
  const closeBtn = document.createElement('span');
  closeBtn.className = 'close';
  closeBtn.textContent = '×';

  return closeBtn;
}

function deleteModal(modalId) {
  const modalToRemove = document.getElementById(modalId);
  modalToRemove.remove();
}

function setupContentGalleryModal(data) {
  const modal = document.getElementById('modalId');
  const modalContent = modal.querySelector('.modal-content');

  const galleryContainer = document.createElement('div');
  galleryContainer.className = 'gallery-container';
  modalContent.appendChild(galleryContainer);

  const title = document.createElement('h2');
  title.textContent = 'Galerie Photo';
  galleryContainer.appendChild(title);

  const imageContainer = document.createElement('div');
  imageContainer.className = 'image-container';
  displayImagesInModal(data, imageContainer);
  galleryContainer.appendChild(imageContainer);

  const addButton = document.createElement('button');
  addButton.textContent = 'Ajouter une photo';
  addButton.className = 'btn btn-primary';
  addButton.id = 'addPhotoButton';
  galleryContainer.appendChild(addButton);

  addButton.addEventListener('click', () => {
    modalContent.removeChild(galleryContainer);
    setupContentAddPhoto();
  });
}

function displayImagesInModal(data, container) {
  data.forEach((item) => {
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'img-wrapper';
    imgWrapper.setAttribute('data-id', item.id);

    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.title;
    img.className = 'gallery-img';

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa-solid fa-trash-can delete-icon';
    deleteIcon.onclick = () => deleteProject(item.id, container, event);

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(deleteIcon);
    container.appendChild(imgWrapper);
  });
}

async function deleteProject(id, container, event) {
  event.preventDefault();
  const authToken = localStorage.getItem('authToken');
  const headers = new Headers();

  if (authToken) {
    headers.append('Authorization', `Bearer ${authToken}`);
  }

  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: headers,
    });

    if (response.ok) {
      const elementToRemove = document.querySelector(
        `.img-wrapper[data-id="${id}]`
      );
      if (elementToRemove) {
        container.removeChild(elementToRemove);
        console.log(elementToRemove);
      }
      console.log('Projet supprimé avec succès');
    } else {
      throw new Error('Échec de la suppression du projet');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    alert('Impossible de supprimer le projet. Veuillez réessayer.');
  }
}

function setupContentAddPhoto() {
  const modal = document.getElementById('modalId');
  const modalContent = modal.querySelector('.modal-content');

  const mainContainer = document.createElement('div');
  mainContainer.className = 'main-container';
  modalContent.appendChild(mainContainer);

  const returnBtn = document.createElement('span');
  returnBtn.className = 'return-btn fa-solid fa-arrow-left';
  mainContainer.appendChild(returnBtn);
  returnBtn.addEventListener('click', () => {
    modalContent.removeChild(mainContainer);
    setupContentGalleryModal(storedData);
  });

  const formContainer = document.createElement('div');
  formContainer.className = 'form-container';
  mainContainer.appendChild(formContainer);

  const title = document.createElement('h2');
  title.textContent = 'Ajout Photo';
  mainContainer.appendChild(title);
}
