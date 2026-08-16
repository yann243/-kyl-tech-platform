const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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
            alert(data.message || "Connexion refusée");
            return;
        }

        if (data.success && data.token) {
            localStorage.setItem("kyl_admin_token", data.token);
            window.location.href = "/admin.html";
            return;
        }

        alert("Connexion impossible.");

    } catch (error) {
        console.error(error);
        alert("Impossible de contacter le serveur.");
    }
});
