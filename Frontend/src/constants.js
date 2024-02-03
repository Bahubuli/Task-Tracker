export const ITEMS_PER_PAGE = 10;
export const API = "http://localhost:5000/api/"
export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric',hour: 'numeric', minute: 'numeric', second: 'numeric'};

    // Create a Date object from the input string
    const date = new Date(dateString);

    // Format the date using toLocaleString()
    return date.toLocaleString('en-US', options);
}
