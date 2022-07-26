export const changeDateMonth = (currentDate, amount) => {
    const movedDate = new Date(currentDate.getTime());
    movedDate.setMonth(currentDate.getMonth() + amount);
    return movedDate;
};

export const getYearMonth = (currentDate) => {
    return `${currentDate.getFullYear()}.${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
};
