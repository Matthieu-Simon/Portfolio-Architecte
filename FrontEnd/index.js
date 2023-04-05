// Fonction pour récupérer les projets et les afficher
const getWorks = async () => {
    const dataApi = await fetch('http://localhost:5678/api/works');
    const data = await dataApi.json();
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    for (const work of data) {
        let figure = document.createElement('figure');
        gallery.appendChild(figure);
        let img = document.createElement('img');
        img.src = work.imageUrl;
        img.setAttribute('alt', work.title);
        figure.appendChild(img);
        let figcaption = document.createElement('figcaption');
        figcaption.innerHTML = work.title;
        figure.appendChild(figcaption);
    }
};

getWorks();

// Création du bouton "Tous"
const categories = document.querySelector('.categories');
const btnAll = document.createElement('button');
btnAll.classList.add("btn", "allCategories");
btnAll.style.background = '#1D6154';
btnAll.style.color = '#fff';
btnAll.innerText = 'Tous';
categories.appendChild(btnAll);


// Event sur le bouton "Tous" pour afficher tous les projets
btnAll.addEventListener('click', () => {
    getWorks();
});
// Fonction pour récupérer les catégories et créer les boutons
const allCategories = async () => fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(categories => {
        for (const category of categories) {
            const data = fetch('http://localhost:5678/api/works').then(response => response.json());
            const categories = document.querySelector('.categories');
            let btn = document.createElement('button');
            btn.classList.add('btn', category.id.toString());
            btn.textContent = category.name;
            categories.appendChild(btn);
            // Event pour filtrer les projets par catégorie
            btn.addEventListener('click', () => {
                data.then(works => {
                    const gallery = document.querySelector('.gallery');
                    gallery.innerHTML = '';
                    for (const work of works) {
                        if (work.categoryId === category.id) {
                            let figure = document.createElement('figure');
                            gallery.appendChild(figure);
                            let img = document.createElement('img');
                            img.src = work.imageUrl;
                            img.setAttribute('alt', work.title);
                            figure.appendChild(img);
                            let figcaption = document.createElement('figcaption');
                            figcaption.innerHTML = work.title;
                            figure.appendChild(figcaption);
                        }
                    }
                }
                );
            });
        }
    });

allCategories();


// Event sur les boutons changer le style
categories.addEventListener('click', (e) => {
    const btns = document.querySelectorAll('.btn');
    for (const btn of btns) {
        btn.style.background = '#fff';
        btn.style.color = '#1D6154';
    }
    e.target.style.background = '#1D6154';
    e.target.style.color = '#fff';
});


