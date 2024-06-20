const renameKey = (obj, oldKey, newKey) => {
    if (obj.hasOwnProperty(oldKey)) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }
    return obj;
};

const renameDesc = (data, lang) => {
    const newData = data.toObject();

    newData.orderItems.forEach(function (item) {
        renameKey(item.product, `desc_${lang}`, "desc");
    });

    return newData;
};

module.exports = renameDesc;
