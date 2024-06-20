const reversOrderFields = (obj, value, lang) => {
    for (let key in obj) {
        if (obj[key][lang] === value) {
            return key;
        }
    }
    return null;
};

module.exports = reversOrderFields;
