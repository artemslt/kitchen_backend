const selectLang = lang => {
    if (!lang) {
        return;
    }
    return lang === "uk" ? { desc_en: 0 } : { desc_uk: 0 };
};

module.exports = selectLang;
