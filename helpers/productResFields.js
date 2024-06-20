const productResFields = (item, lang="en") => {
    return {
        desc: item[`desc_${lang}`],
        urls: item.imgUrls,
        id: item._id,
        isAvailable: item.isAvailable,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    };
};
module.exports = productResFields;
