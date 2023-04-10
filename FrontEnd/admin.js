const modale = document.querySelector('.modale');
const openModale = document.querySelector('.open-modale');
const closeModale = document.querySelector('.fa-xmark');
const btnAddPhoto = document.querySelector('.btnAdd-photo');
const modaleProjets = document.querySelector('.modale-container');
const openModaleAddProject = document.querySelector('.modale-add');
const closeModaleApp = document.querySelector('.close-modale-add');

// Fonction pour récupérer les projets et les afficher dans la modale
const generateWorks = async () => fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        const galleryModale = document.querySelector('.gallery-modale');
        galleryModale.innerHTML = '';
        for (const work of data) {
            let figure = document.createElement('figure');
            galleryModale.appendChild(figure);

            let imgWorks = document.createElement('img');
            imgWorks.src = work.imageUrl;
            imgWorks.setAttribute('alt', work.title);
            figure.appendChild(imgWorks);

            let iconMove = document.createElement('div');
            iconMove.classList.add('move');
            iconMove.style.display = "none";
            figure.appendChild(iconMove);

            let iconArrow = document.createElement('i');
            iconArrow.classList.add('fas', 'fa-arrows-alt', 'icon-arrow');
            iconMove.appendChild(iconArrow);

            let iconDelete = document.createElement('div');
            iconDelete.classList.add('delete');
            iconDelete.setAttribute('data-id', work.id);
            figure.appendChild(iconDelete);

            let iconTrash = document.createElement('i');
            iconTrash.classList.add('fas', 'fa-trash-alt', 'icon-trash');
            iconTrash.setAttribute('data-id', work.id);
            iconDelete.appendChild(iconTrash);

            let figcaption = document.createElement('figcaption');
            figcaption.textContent = "éditer";
            figure.appendChild(figcaption);
        }
        deleteProject();       
    });

generateWorks();

// Style des éléments à afficher ou non
const CLASS_FLEX = 'flex';
const CLASS_NONE = 'none';

const form = document.querySelector('.container-add-photo');

// Event pour afficher la modale au clic sur le bouton "modifier"
openModale.addEventListener('click', () => {
    modale.style.display = CLASS_FLEX;
    modaleProjets.style.display = CLASS_FLEX;
    openModaleAddProject.style.display = CLASS_NONE;
});
// Event pour fermer la modale au clic sur la croix
closeModale.addEventListener('click', () => {
    modale.style.display = CLASS_NONE;
});
// Event pour fermer la modale lorsqu'on clique en dehors de la modale
window.addEventListener('click', (e) => {
    if (e.target === modale) {
        modale.style.display = CLASS_NONE;
        clearForm();
    }
});

// Event pour afficher une seconde modale pour éditer un nouveau projet
btnAddPhoto.addEventListener('click', () => {
    modaleProjets.style.display = CLASS_NONE;
    openModaleAddProject.style.display = CLASS_FLEX;
});

closeModaleApp.addEventListener('click', () => {
    modale.style.display = CLASS_NONE;
    clearForm();
});

// Event sur l'icone pour revenir sur la modale "Galerie"
const arrowBack = document.querySelector('.fa-arrow-left');
arrowBack.addEventListener('click', () => {
    document.querySelector('.modale-container').style.display = CLASS_FLEX;
    openModaleAddProject.style.display = CLASS_NONE;
    clearForm();
});

// Event pour masquer l'icone de déplacement sur les images
const galleryModale = document.querySelector('.gallery-modale');

galleryModale.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.nextElementSibling.style.display = CLASS_FLEX;
    }
});

galleryModale.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.nextElementSibling.style.display = CLASS_NONE;
    }
});

// Suppression d'un projet
const deleteProject = () => {
    const iconTrash = document.querySelectorAll('.icon-trash');
    iconTrash.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            const token = localStorage.getItem('token');
            fetch(`http://localhost:5678/api/works/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                const galleryModale = document.querySelector('.gallery-modale');
                galleryModale.innerHTML = '';
            })
            .catch((error) => {
                console.error('Error Message:', error);
            });
        });
    });
};

deleteProject();

// Récupération des catégories et affichage dans le select
const selectCategory = document.querySelector(".select-category");

fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((categories) => {
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            selectCategory.append(option);
        });
    })
    .catch((error) => console.error('Error Message:', error));

// Fonction pour afficher l'image dans le formulaire
const inputFile = document.querySelector('.inputAdd-photo');
const inputAddPhoto = document.querySelector('.input-file-container');
const textModaleAdd = document.querySelector('.text-modale-add');
const iconModaleAdd = document.querySelector('.icon-modale-add');
const inputTitle = document.querySelector('.inputTitle-add');
const inputCategory = document.querySelector('.select-category');

const createImgAdd = document.createElement('img');
createImgAdd.classList.add('img-add');
form.appendChild(createImgAdd);

const createOption = document.createElement('option');
inputCategory.appendChild(createOption);

const imgAddPhoto = document.querySelector('.img-add');

const displayImage = (e) => {
    if (e.target.files[0]) {
        // On crée un objet FileReader
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            imgAddPhoto.setAttribute("src", reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
    }
    // On cache les éléments du formulaire
    inputAddPhoto.style.display = CLASS_NONE;
    textModaleAdd.style.display = CLASS_NONE;
    iconModaleAdd.style.display = CLASS_NONE;
    imgAddPhoto.style.display = CLASS_FLEX;
    
};
// Event pour afficher l'image dans le formulaire
inputFile.addEventListener('change', displayImage);

// Fonction si tous les champs sont remplis
const validateForm = () => {
    if (inputTitle.value && inputFile.value && inputCategory.value) {
        btnSubmit.style.backgroundColor = '#1D6154';
    } else {
        btnSubmit.style.backgroundColor = '';
    }
};


inputTitle.addEventListener('input', validateForm);
inputCategory.addEventListener('input', validateForm);
inputFile.addEventListener('input', validateForm);

// Event pour ajouter un projet
const btnSubmit = document.querySelector(".btnAdd-validate");
btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', inputFile.files[0]);
    formData.append('title', inputTitle.value);
    formData.append('category', +inputCategory.value);
    if (
        formData.get('title') &&
        formData.get('image') &&
        formData.get('category')
    ) {
        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            const project = document.createElement("figure");
            const image = document.createElement("img");
            const title = document.createElement("figcaption");

            const newProject = data.id;
            image.src = data.imageUrl;
            image.setAttribute = data.title;
            title.textContent = data.title;

            project.appendChild(image);
            project.appendChild(title);
            project.setAttribute('data-id', newProject);

            const gallery = document.querySelector('.gallery');
            gallery.appendChild(project);

        })
        .catch((error) => console.error('Error Message:', error));
    } else {
        // alert('Veuillez remplir tous les champs');
        const error = document.querySelector('.error_message');
        error.textContent = 'Veuillez remplir tous les champs';
    }
});

// Fonction pour vider le formulaire si on quitte la modale sans ajouter de projet
const clearForm = () => {
    inputTitle.value = '';
    inputCategory.value = '';
    inputFile.value = '';
    imgAddPhoto.style.display = CLASS_NONE;
    inputAddPhoto.style.display = "inline";
    textModaleAdd.style.display = CLASS_FLEX;
    iconModaleAdd.style.display = CLASS_FLEX;
};
