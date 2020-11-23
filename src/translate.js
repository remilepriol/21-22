export function getLanguage() {
    const language = navigator.languages
        ? navigator.languages[0]
        : navigator.language || navigator.userLanguage;

    if (typeof language === "string" && language.slice(0, 2).toLowerCase() === "fr") {
        return "fr";
    }
    return "en";
}

const TRANSLATIONS = {
    en: {
        "Facilitation graphique": "Graphic facilitation",
        Illustration: "Illustration",
        Facilitation: "Scribing",
        Corporate: "Corporate",
        Jeunesse: "Children",
    },
    fr: {
        "Facilitation graphique": "Facilitation graphique",
        Illustration: "Illustration",
        Facilitation: "Scribing",
        Corporate: "Corporate",
        Jeunesse: "Jeunesse",
    },
};

export function getTranslations() {
    return TRANSLATIONS[getLanguage()];
}
