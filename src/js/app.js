// Importar Bootstrap desde node_modules
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { paintings } from "./data/paintings";
import { fer } from "./data/paintings";
// Tu propio código JS
document.addEventListener("DOMContentLoaded", () => {
    console.log(paintings);
    console.log(fer);
    /**
     * <div class="card shadow-sm h-100">
            <img src="..." class="card-img-top" alt="paint image">
            <div class="card-body">
                <h5 class="card-title">painting.title</h5>
                <p class="card-text mb-1"><strong>Autor:</strong> painting.author</p>
                <p class="card-text"><strong>Año:</strong> painting.year</p>
            </div>
        </div>
     */
    let gallery = document.getElementById('gallery');
    console.log(gallery);
    paintings.forEach((painting) => {
        
        console.log(painting);
        let div = document.createElement('div');
        div.classList.add('card', 'shadow-sm', 'h-100', 'main-gallery');
        let div2 = document.createElement('div');
        div2.classList.add('card-body');

        div.appendChild(div2);

        let title = document.createElement('h5');
        title.innerText = painting.title;
        div2.appendChild(title);
        console.log(div);
        console.log(div2);
        console.log(title);
        gallery.appendChild(div);

        

    });
});