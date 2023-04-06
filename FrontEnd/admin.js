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