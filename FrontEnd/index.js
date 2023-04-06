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

// On vérifie si l'admin est connecté, qui affichera le bouton de déconnexion
const login = document.querySelector('.login');
const token = localStorage.getItem('token');

if (token) {
    login.innerHTML = '<a href="index.html">logout</a>';

    // Elements du DOM à faire apparaitre au login/retirer du DOM au login
    const banner = document.querySelector('.banner');
    const contentProfil = document.querySelector('.content-profil');
    const contentIntro = document.querySelector('.content-intro');
    const contentPortfolio = document.querySelector('.content-portfolio');
    const headerPortfolio = document.querySelector('.header-portfolio');
    const categories = document.querySelector('.categories');

    banner.style.display = 'block';
    contentIntro.style.display = 'flex';
    contentProfil.style.display = 'flex';
    contentPortfolio.style.display = 'block';
    // categories.style.visibility = 'hidden';
    categories.style.display = 'none';
    headerPortfolio.style.marginBottom = '30px';

}

if(!token) {

    // Elements du DOM à faire apparaitre au login/retirer du DOM au logout
    const banner = document.querySelector('.banner');
    const contentProfil = document.querySelector('.content-profil');
    const contentIntro = document.querySelector('.content-intro');
    const contentPortfolio = document.querySelector('.content-portfolio');
    const categories = document.querySelector('.categories');

    banner.style.display = 'none';
    contentIntro.style.display = 'none';
    contentProfil.style.display = 'none';
    contentPortfolio.style.display = 'none';
    categories.style.visibility = 'visible';
}

// Event pour se déconnecter
login.addEventListener('click', () => {
    // on supprime le token du localStorage
    if(token) {
        localStorage.removeItem('token');
    }   
});
