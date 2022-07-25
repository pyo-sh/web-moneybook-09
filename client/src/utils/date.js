export const changeDateMonth = (currentDate, amount) => {
    const movedDate = new Date(currentDate.getTime());
    movedDate.setMonth(currentDate.getMonth() + amount);
    return movedDate;
};
