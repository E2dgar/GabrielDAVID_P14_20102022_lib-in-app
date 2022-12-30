export const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const formatted = `${day}/${month}/${year}`;

    return formatted.toString();
};
