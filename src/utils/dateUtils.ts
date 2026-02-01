export const formatDateToKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getRelativeDate = (offset: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date;
};

export const getRelativeDateString = (offset: number): string => {
    return formatDateToKey(getRelativeDate(offset));
};
