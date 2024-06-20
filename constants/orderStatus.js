const orderStatus = Object.freeze({
    new: { en: "New", uk: "Нове" },
    completed: { en: "Completed", uk: "Виконано" },
    cancelled: { en: "Cancelled", uk: "Скасовано" },
    processing: { en: "Processing", uk: "В роботі" },
});

module.exports = orderStatus;
