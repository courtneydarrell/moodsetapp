const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export class DateService {
    longDate(date: Date) {
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return `${day} ${monthNames[monthIndex]} ${year}`;
    }

    shortDate(date: Date) {
        const day = date.getDate();
        const monthIndex = date.getMonth();
        return `${day} ${monthNames[monthIndex]}`;

    }

}
