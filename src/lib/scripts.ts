export function numberWithCommas(number: number | undefined) {
    if (number == undefined) return '';
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
export function formatISODate(isoDateString: string): { formattedDate: string; formattedTime: string } {
    const dateObject = new Date(isoDateString);

    const year = dateObject.getUTCFullYear();
    const month = dateObject.getUTCMonth() + 1;
    const day = dateObject.getUTCDate();

    const hours = dateObject.getUTCHours() + 7;
    const minutes = dateObject.getUTCMinutes();
    const seconds = dateObject.getUTCSeconds();

    const formattedDate = formatDateString(`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`);
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
        seconds < 10 ? '0' : ''
    }${seconds}`;

    return { formattedDate, formattedTime };
}
export function formatDateString(inputDateString: string): string {
    const dateParts = inputDateString.split('-');
    if (dateParts.length === 3) {
        const [year, month, day] = dateParts;
        return `${day}-${month}-${year}`;
    } else {
        // Handle invalid input gracefully
        console.error('Invalid date format');
        return inputDateString;
    }
}
