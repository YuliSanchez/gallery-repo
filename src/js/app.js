// Importar Bootstrap desde node_modules
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import { paintings } from "./data/paintings";
import { fer } from "./data/paintings";
// Tu propio código JS
var modal; 
document.addEventListener("DOMContentLoaded", () => {
    onFilterPaintings();
    renderGallery(paintings);
    initModal();
});

function initModal(){
    modal = new Modal('#gallery-modal', {
        keyboard: false,
        backdrop: true
    })
    
    let elementModal = document.getElementById("gallery-modal");
    elementModal.addEventListener('hidden.bs.modal', event => {
  // do something...
        modal._dialog.querySelector(".modal-body").innerHTML = "";
    });
}

function renderGallery(pictures){
let gallery = document.getElementById('gallery');
    gallery.innerHTML = " "; //always ensure clean the content.
    pictures.forEach((painting) => {
        let divColumn = document.createElement('div');
        divColumn.classList.add('col-md-3');

        let div = document.createElement('div');
        div.classList.add('card', 'shadow-sm', 'h-100', 'main-gallery');
        let div2 = document.createElement('div');
        div.appendChild(div2);

        let image = document.createElement('img');
        image.setAttribute("src", painting.img);
        image.classList.add('card-img-top')
        div2.appendChild(image);
        div2.classList.add('card-body');

        let title = document.createElement('h5');
        title.innerText = painting.title;
        title.classList.add('card-title');
        div2.appendChild(title);

        let author =document.createElement('p'); 
        author.innerText = painting.author;
        author.classList.add('card-text');
        div2.appendChild(author); 

         let year =document.createElement('p'); 
        year.innerText = painting.year;
        div2.appendChild(year);

        divColumn.appendChild(div);
        gallery.appendChild(divColumn);

        //Subscripción a evento click
        div.addEventListener("click",function(event){
            onSelectPainting(painting); 
        })
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

function onFilterPaintings(){
    let filterPainting = document.getElementById("searchInput");
    filterPainting.addEventListener("change",function(event){
        let text = event.target.value.toLowerCase();

        let paintingFilter = paintings.filter((painting)=>{
            return painting.title.toLowerCase().includes(text)
            || painting.author.toLowerCase().includes(text)
            || painting.year.toString().includes(text)
            || painting.description.toLowerCase().includes(text)
        });
        renderGallery(paintingFilter);
    })
}