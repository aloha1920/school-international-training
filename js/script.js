function setLanguage(language) {
    document.documentElement.lang = language;

    document.querySelectorAll("[data-en][data-fr]").forEach((element) => {
        element.textContent = element.getAttribute(`data-${language}`);
    });

    const placeholders = {
        firstName: { en: "First name", fr: "Prénom" },
        lastName: { en: "Last name", fr: "Nom" },
        country: { en: "Country", fr: "Pays" }
    };

    Object.entries(placeholders).forEach(([id, translations]) => {
        const field = document.getElementById(id);
        if (field) {
            field.placeholder = translations[language];
        }
    });
}

function trackApplication(event) {
    event.preventDefault();

    const reference = document
        .getElementById("applicationReference")
        .value.trim().toUpperCase();

    const result = document.getElementById("trackingResult");
    const language = document.documentElement.lang;

    const applications = {
        "SIT-2027-001": {
            en: "Pending",
            fr: "En attente"
        },
        "SIT-2027-002": {
            en: "Under Review",
            fr: "En cours d'examen"
        },
        "SIT-2027-003": {
            en: "Accepted",
            fr: "Acceptée"
        },
        "SIT-2027-004": {
            en: "Rejected",
            fr: "Refusée"
        }
    };

    if (applications[reference]) {
        const status = applications[reference][language] || applications[reference].en;

        result.textContent = language === "fr"
            ? "Statut de votre candidature : " + status
            : "Your application status: " + status;

        result.className = "tracking-result success";
    } else {
        result.textContent = language === "fr"
            ? "Référence introuvable. Vérifiez votre numéro."
            : "Reference not found. Please check your number.";

        result.className = "tracking-result error";
    }
}
