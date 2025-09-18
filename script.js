document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    form.parentNode.insertBefore(errorDiv, form);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        errorDiv.textContent = '';

        const formData = new FormData(form);
        const values = {};
        let hasEmpty = false;

        // Vérifier que tous les champs sont remplis
        for (let [key, value] of formData.entries()) {
            if (!value.trim()) {
                hasEmpty = true;
            }
            values[key] = value;
        }
        if (hasEmpty) {
            errorDiv.textContent = 'Veuillez remplir tous les champs.';
            return;
        }

        // Vérifier que l’email est valide
        const email = values.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorDiv.textContent = 'Veuillez entrer une adresse email valide.';
            return;
        }

        // Vérifier que le mot de passe et la confirmation correspondent
        if (values.password !== values.confirmation) {
            errorDiv.textContent = 'Les mots de passe ne correspondent pas.';
            return;
        }

        // Si tout est correct, masquer le formulaire et afficher le récapitulatif
        form.style.display = 'none';
        errorDiv.style.display = 'none';

        const recapDiv = document.createElement('div');
        recapDiv.innerHTML = '<div class = "recapDiv"><h2>Récapitulatif</h2><ul></ul></div>';
        const ul = recapDiv.querySelector('ul');
        for (let key in values) {
            if (key !== 'password' && key !== 'confirmation') {
                const li = document.createElement('li');
                li.textContent = `${key}: ${values[key]}`;
                ul.appendChild(li);
            }
        }
        form.parentNode.appendChild(recapDiv);
    });
});