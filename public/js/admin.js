const token = localStorage.getItem("kyl_admin_token");

if (!token) {
    window.location.href = "/login.html";
}

async function loadQuotes() {
    try {
        const response = await fetch("/api/quotes", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("kyl_admin_token");
            window.location.href = "/login.html";
            return;
        }

        const data = await response.json();

        if (!response.ok || !data.success) {
            console.error(
                "Erreur devis :",
                data.message || "Erreur inconnue"
            );
            return;
        }

        const quotes = data.quotes || [];

        const total = document.getElementById("totalQuotes");
        const nouveau = document.getElementById("newQuotes");
        const progress = document.getElementById("progressQuotes");
        const done = document.getElementById("doneQuotes");
        const container = document.getElementById("quotesList");

        if (total) {
            total.textContent = quotes.length;
        }

        if (nouveau) {
            nouveau.textContent =
                quotes.filter(q => q.status === "nouvelle").length;
        }

        if (progress) {
            progress.textContent =
                quotes.filter(q => q.status === "en cours").length;
        }

        if (done) {
            done.textContent =
                quotes.filter(q => q.status === "terminée").length;
        }

        if (!container) {
            console.error("quotesList introuvable.");
            return;
        }

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

                <p>
                    <strong>Date :</strong>
                    ${new Date(quote.createdAt).toLocaleString("fr-FR")}
                </p>

            </div>
        `).join("");

    } catch (error) {
        console.error("Erreur :", error);

        const container = document.getElementById("quotesList");

        if (container) {
            container.innerHTML =
                "<p>Impossible de charger les demandes.</p>";
        }
    }
}

loadQuotes();
