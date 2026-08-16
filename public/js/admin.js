const token = localStorage.getItem("kyl_admin_token");

const response = await fetch("/api/quotes", {
    headers: {
        "Authorization": `Bearer ${token}`
    }
});
const token = localStorage.getItem("kyl_admin_token");

if (!token) {
    window.location.href = "/login.html";
}
    try {
        const response = await fetch("/api/quotes");

        const data = await response.json();

        if (!response.ok || !data.success) {
            console.error("Erreur devis :", data.message);
            return;
        }

        console.log("Demandes de devis :", data.quotes);

    } catch (error) {
        console.error("Impossible de récupérer les devis :", error);
    }
}

loadQuotes();
async function loadQuotes() {

    try {

        const response = await fetch("/api/quotes");

        const data = await response.json();

        const quotes = data.quotes || [];

        document.getElementById("totalQuotes").textContent =
            quotes.length;

        document.getElementById("newQuotes").textContent =
            quotes.filter(q => q.status === "nouvelle").length;

        document.getElementById("progressQuotes").textContent =
            quotes.filter(q => q.status === "en cours").length;

        document.getElementById("doneQuotes").textContent =
            quotes.filter(q => q.status === "terminée").length;

        const container = document.getElementById("quotesList");

        if (quotes.length === 0) {

            container.innerHTML =
                "<p>Aucune demande de devis.</p>";

            return;
        }

        container.innerHTML = quotes.map(quote => `

            <div class="quote-card">

                <h3>${quote.name}</h3>

                <p>
                    <strong>Email :</strong>
                    ${quote.email}
                </p>

                <p>
                    <strong>Téléphone :</strong>
                    ${quote.phone || "Non renseigné"}
                </p>

                <p>
                    <strong>Entreprise :</strong>
                    ${quote.company || "Non renseignée"}
                </p>

                <p>
                    <strong>Service :</strong>
                    ${quote.service}
                </p>

                <p>
                    <strong>Budget :</strong>
                    ${quote.budget || "Non renseigné"}
                </p>

                <p>
                    <strong>Message :</strong>
                    ${quote.message}
                </p>

                <p>
                    <strong>Statut :</strong>
                    ${quote.status}
                </p>

            </div>

        `).join("");

    } catch (error) {

        console.error(error);

        document.getElementById("quotesList").innerHTML =
            "<p>Impossible de charger les demandes.</p>";
    }
}

loadQuotes();
