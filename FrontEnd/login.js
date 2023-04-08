// on récupère les éléments du DOM
const loginForm = document.querySelector('.login_form');
const loginBtn = document.querySelector('.btn');

const userLogin = () => {
    loginBtn.addEventListener('click', (e) => {
    // on met en place un évènement pour empêcher le comportement par défaut du bouton
    e.preventDefault();
    // on récupère les valeurs des champs email et password
    const email = document.querySelector('.input_email').value;
    const password = document.querySelector('.input_password').value;

    // on crée un objet qui contient les données à envoyer à l'API
    const dataUser = {
        email: email,
        password: password,
    };

    // on vérifie que les donnés sont bien renseignées
    const emailValidate = "sophie.bluel@test.tld";
    const passwordValidate = "S0phie";
    const error = document.querySelector('.error_message');
    
    if (email === '' && password === '') {
        error.textContent = "Veuillez saisir tous les champs !"
    } else if (email !== emailValidate) {
        error.textContent = "Email incorrect"
    } else if (password !== passwordValidate) {
        error.textContent = "Mot de passe incorrect"
    } else {
        error.textContent = '';
    }
    
    // on envoie les données à l'API
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // on transforme les données en JSON
        body: JSON.stringify(dataUser),
    }).then((response) => response.json())
      .then((data) => {
        // on vérifie si le token est présent dans les données reçues
        if (data.token !== undefined) {
            // on stocke le token dans le localStorage
            localStorage.setItem('token', data.token);
            // on redirige l'utilisateur vers la page d'accueil
            document.location.href = 'index.html';
        }
    }).catch(error => {
        console.error(error);
    });
});
};

userLogin();

/*
// Event qui déconnecte l'admin lorsqu'il ferme la page sans logout
window.addEventListener('beforeunload', () => {
    if(localStorage.getItem('token')) {
        localStorage.removeItem('token');
    }
});
*/