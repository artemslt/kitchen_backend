const orderStatus = require("../constants/orderStatus");
const orderContactType = require("../constants/orderContactType");

const result = (items, lang = "en") => {
    return items.map(item => {
        item.status = orderStatus[item.status][lang];
        item.connection_type = orderContactType[item.connection_type][lang];
        return item;
    });
};

module.exports = result;
