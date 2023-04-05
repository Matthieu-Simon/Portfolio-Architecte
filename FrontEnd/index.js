const getWorks = async () => {
    const dataApi = await fetch('http://localhost:5678/api/works');
    const works = await dataApi.json();
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    for (const work of works) {
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

getWorks();