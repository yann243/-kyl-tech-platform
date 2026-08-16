console.log("KYL Tech Premium chargé 🚀");


const serviceData = {

    cybersecurite: {
        icon: "🔐",
        title: "Cybersécurité",
        description:
            "Nous aidons les entreprises à identifier et réduire leurs risques numériques.",
        services: [
            "Audit de sécurité",
            "Tests d'intrusion autorisés",
            "Sécurisation des réseaux",
            "Protection des données"
        ]
    },

    developpement: {
        icon: "💻",
        title: "Développement Web & Mobile",
        description:
            "Nous concevons des plateformes modernes adaptées à vos besoins.",
        services: [
            "Sites web professionnels",
            "Applications web",
            "Applications mobiles",
            "Logiciels sur mesure"
        ]
    },

    marketing: {
        icon: "📈",
        title: "Marketing Digital",
        description:
            "Développez votre présence numérique et atteignez davantage de clients.",
        services: [
            "Gestion des réseaux sociaux",
            "Création de contenu",
            "Référencement SEO",
            "Publicité digitale"
        ]
    },

    maintenance: {
        icon: "🖥️",
        title: "Maintenance Informatique",
        description:
            "Maintenez vos équipements et systèmes informatiques performants.",
        services: [
            "Maintenance préventive",
            "Dépannage informatique",
            "Optimisation des systèmes",
            "Assistance technique"
        ]
    },

    reseaux: {
        icon: "🌐",
        title: "Réseaux & Infrastructure",
        description:
            "Nous concevons et sécurisons vos infrastructures réseau.",
        services: [
            "Installation réseau",
            "Configuration",
            "Sécurisation",
            "Administration réseau"
        ]
    },

    numerisation: {
        icon: "📄",
        title: "Numérisation",
        description:
            "Transformez vos processus traditionnels grâce au numérique.",
        services: [
            "Digitalisation des documents",
            "Automatisation",
            "Gestion électronique",
            "Transformation numérique"
        ]
    },

    entreprise: {
        icon: "🏢",
        title: "Solutions pour entreprises",
        description:
            "Des plateformes professionnelles pour améliorer votre activité.",
        services: [
            "ERP",
            "CRM",
            "Automatisation",
            "Plateformes métiers"
        ]
    }

};


const modal = document.getElementById("serviceModal");

const modalIcon =
    document.getElementById("modalIcon");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalServices =
    document.getElementById("modalServices");

const closeModal =
    document.getElementById("closeModal");


document.querySelectorAll(".service-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        const service =
            serviceData[button.dataset.service];

        if (!service) return;

        modalIcon.textContent = service.icon;

        modalTitle.textContent = service.title;

        modalDescription.textContent =
            service.description;

        modalServices.innerHTML =
            service.services
            .map(item => `<p>✓ ${item}</p>`)
            .join("");

        modal.classList.add("active");

    });

});


closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});


modal.addEventListener("click", event => {

    if (event.target === modal) {

        modal.classList.remove("active");

    }

});


/* FORMULAIRE */

const quoteForm =
    document.getElementById("quoteForm");

const formMessage =
    document.getElementById("formMessage");


quoteForm.addEventListener("submit", async event => {

    event.preventDefault();

    const formData =
        new FormData(quoteForm);

    const data =
        Object.fromEntries(formData.entries());


    formMessage.textContent =
        "⏳ Envoi de votre demande...";


    try {

        const response = await fetch(
            "/api/quotes",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Erreur lors de l'envoi"
            );

        }


        formMessage.textContent =
            "✅ Votre demande a bien été envoyée !";

        quoteForm.reset();


    } catch (error) {

        console.error(error);

        formMessage.textContent =
            "❌ Le serveur ne peut pas encore recevoir les demandes.";

    }

});console.log("Bienvenue sur KYL Tech Technologies 🚀");
