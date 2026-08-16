const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const message = document.getElementById("loginMessage");

    try {

        const response = await fetch("/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (!response.ok) {

            message.textContent =
                data.message || "Connexion refusée.";

            return;
        }

        localStorage.setItem(
            "kyl_admin_token",
            data.token
        );

        window.location.href = "/admin.html";

    } catch (error) {

        console.error(error);

        message.textContent =
            "Impossible de contacter le serveur.";

    }

});
