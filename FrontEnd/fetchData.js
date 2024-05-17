const url = 'http://localhost:5678/api/works';
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    addProjects(data);
  });
const gallery = document.querySelector('.gallery');
const figure = document.createElement('figure');

function addProjects(data) {
  console.log(data);
  makeFigure(data);
  appendFigureToGallery(figure);
}

function makeFigure(data) {
  const img = document.createElement('img');
  const figCaption = document.createElement('figcaption');
  const title = data[0].title;
  const imageUrl = data[0].imageUrl;

  figure.appendChild(img);
  img.src = imageUrl;
  img.alt = title;
  figure.appendChild(figCaption);
  figCaption.innerHTML = title;

  console.log(figure);
}

function appendFigureToGallery(figure) {
  console.log(gallery);
  gallery.appendChild(figure);
}
