// Importar Bootstrap desde node_modules
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import { paintings } from "./data/paintings";
import { fer } from "./data/paintings";

const items = document.querySelectorAll('.coverflow-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
// Tu propio código JS
var modal;
document.addEventListener("DOMContentLoaded", () => {
  onFilterPaintings();
  renderGallery(paintings);
  renderGalleryList(paintings); 
  renderGalleryCoverflow(paintings); 
  initModal();
});

function initModal() {
  modal = new Modal("#gallery-modal", {
    keyboard: false,
    backdrop: true,
  });

  let elementModal = document.getElementById("gallery-modal");
  elementModal.addEventListener("hidden.bs.modal", (event) => {
    // do something...
    modal._dialog.querySelector(".modal-body").innerHTML = "";
  });
}

function renderGallery(pictures) {
  let columnClass;
  if (pictures.length === 1) {
    columnClass = "col-12"; // ocupa toda la fila
  } else if (pictures.length === 2) {
    columnClass = "col-md-6"; // cada una ocupa la mitad
  } else {
    columnClass = "col-md-4"; // 3 por fila
  }
  let gallery = document.getElementById("gallery");
  gallery.innerHTML = " "; //always ensure clean the content.
  pictures.forEach((painting) => {
    let divColumn = document.createElement("div");
    divColumn.classList.add(columnClass, "mb-4");

    let div = document.createElement("div");
    div.classList.add("card", "shadow-sm", "h-100", "main-gallery");
    let div2 = document.createElement("div");
    div.appendChild(div2);

    let image = document.createElement("img");
    image.setAttribute("src", painting.img);
    image.classList.add("card-img-top", "img-fluid", "rounded");
    div2.appendChild(image);
    div2.classList.add("card-body");

    let title = document.createElement("h5");
    title.innerText = painting.title;
    title.classList.add("card-title");
    div2.appendChild(title);

    let author = document.createElement("p");
    author.innerText = painting.author;
    author.classList.add("card-text");
    div2.appendChild(author);

    let year = document.createElement("p");
    year.innerText = painting.year;
    div2.appendChild(year);

    divColumn.appendChild(div);
    gallery.appendChild(divColumn);

    //Subscripción a evento click
    div.addEventListener("click", function (event) {
      onSelectPainting(painting);
    });
  });
}

function renderGalleryList(pictures) {

    let galleryList = document.getElementById("gallery-list-ul");
    galleryList.innerHTML = "";
    pictures.forEach((picture) => {
        const paintingList = document.createElement("li");
        paintingList.className = "list-group-item d-flex align-items-center m-3";
        paintingList.innerHTML = `<img src="${picture.img}" alt="titulo de la pintura" class="rounded me-3">
                                    <div>
                                        <h6 class="mb-1">${picture.title}</h6>
                                        <small class="text-muted">${picture.description}</small>
                                    </div>`;
        paintingList.addEventListener("click", function (event) { onSelectPainting(picture); });                            
        galleryList.appendChild(paintingList);
    });
}

function renderGalleryCoverflow(pictures) {
    let galleryListDiv = document.getElementById("coverflow");
    galleryListDiv.innerHTML = "";
    pictures.forEach((picture) => {
        const paintingCoverflowDiv = document.createElement("div");
        paintingCoverflowDiv.className = "coverflow-item active";
        paintingCoverflowDiv.innerHTML = `<img src="${picture.img}" class="img-fluid rounded shadow">
                                        <h6 class="mt-2 text-center">${picture.title}
                                        <br><small>${picture.author}</small></h6>`;
        paintingCoverflowDiv.addEventListener("click", function(event){onSelectPainting(picture);});
        galleryListDiv.appendChild(paintingCoverflowDiv);

    });
}

function onSelectPainting(painting) {
  modal.show();
  let modalBody = modal._dialog.querySelector(".modal-body");
  modalBody.innerHTML = "";
  const paintingCard = document.createElement("div");
  paintingCard.className = "card mb-3";
  paintingCard.innerHTML = `
        <img src="${painting.img}" class="card-img-top" alt="${painting.title}">
        <div class="card-body">
          <h5 class="card-title">${painting.title}</h5>
          <p class="card-text mb-1"><strong>Autor:</strong> ${painting.author}</p>
          <p class="card-text mb-1"><strong>Description:</strong> ${painting.description}</p>
          <p class="card-text"><strong>Año:</strong> ${painting.year}</p>
        </div>
    `;
  modalBody.appendChild(paintingCard);
}

function onFilterPaintings() {
  let filterPainting = document.getElementById("searchInput");
  filterPainting.addEventListener("change", function (event) {
    let text = event.target.value.toLowerCase();

    let paintingFilter = paintings.filter((painting) => {
      return (
        painting.title.toLowerCase().includes(text) ||
        painting.author.toLowerCase().includes(text) ||
        painting.year.toString().includes(text) ||
        painting.description.toLowerCase().includes(text)
      );
    });
    renderGallery(paintingFilter);
    renderGalleryList(paintingFilter);
    renderGalleryCoverflow(paintingFilter); 
  });
}


