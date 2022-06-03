export const daysToMonth = (days) => {
    if (days <= 0) {
        return 0;
    }
    return Math.floor(days / 30);
};