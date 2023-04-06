const modale = document.querySelector('.modale');
const openModale = document.querySelector('.open-modale');
const closeModale = document.querySelector('.fa-xmark');
const btnAddPhoto = document.querySelector('.btnAdd-photo');
const modaleProjets = document.querySelector('.modale-container');
const openModaleAddProject = document.querySelector('.modale-add');
const closeModaleApp = document.querySelector('.close-modale-add');


// Fonction qui va générer les éléments html pour chaque projet de la galerie
const generateWorks = async () => {
    const dataApi = await fetch('http://localhost:5678/api/works');
    const works = await dataApi.json();
    const galleryModale = document.querySelector('.gallery-modale');
    galleryModale.innerHTML = '';
    for (const work of works) {
        // on crée les éléments html
        let figure = document.createElement("figure");
        galleryModale.appendChild(figure);
        // on crée les images et ajoute les attributs 
        let imgWorks = document.createElement("img");
        imgWorks.src = work.imageUrl;
        imgWorks.setAttribute("alt", work.title);
        figure.appendChild(imgWorks);
        // on crée la div qui contiendra l'icone de déplacement
        let iconMove = document.createElement("div");
        iconMove.classList.add("move");
        figure.appendChild(iconMove);
        //  on crée l'icone de déplacement
        let iconArrow = document.createElement("i");
        iconArrow.classList.add("fas", "fa-arrows-alt", "icon-arrow");
        iconMove.appendChild(iconArrow);
        // on crée la div qui contiendra l'icone de suppression
        let iconDelete = document.createElement("div");
        iconDelete.classList.add("delete");
        iconDelete.setAttribute("data-id", work.id);
        figure.appendChild(iconDelete);
        // on crée l'icone de suppression
        let iconTrash = document.createElement("i");
        iconTrash.classList.add("fas", "fa-trash-alt", "icon-trash");
        iconTrash.setAttribute("data-id", work.id);
        iconDelete.appendChild(iconTrash);
        
        // on crée les titres des images
        let figcaption = document.createElement("figcaption");
        figcaption.innerHTML = "éditer";
        figure.appendChild(figcaption);
    };
};

generateWorks();

// Style des éléments à afficher ou non
const CLASS_FLEX = 'flex';
const CLASS_NONE = 'none';

// Event pour afficher la modale au clic sur le bouton "modifier"
openModale.addEventListener('click', () => {
    modale.style.display = CLASS_FLEX;
    modaleProjets.style.display = CLASS_FLEX;
    // openModaleAddProject.style.display = CLASS_NONE;
});
// Event pour fermer la modale au clic sur la croix
closeModale.addEventListener('click', () => {
    modale.style.display = CLASS_NONE;
});
// Event pour fermer la modale lorsqu'on clique en dehors de la modale
window.addEventListener('click', (e) => {
    if (e.target === modale) {
        modale.style.display = CLASS_NONE;
    }
});