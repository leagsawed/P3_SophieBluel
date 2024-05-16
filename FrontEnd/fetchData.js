const url = 'http://localhost:5678/api/works';
fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data));

const gallery = document.querySelector('.gallery');
