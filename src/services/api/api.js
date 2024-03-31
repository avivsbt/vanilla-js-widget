// The fetchRequest function simplifies HTTP requests using fetch,
// with built-in error handling and JSON parsing for data retrieval.

export async function fetchRequest(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to fetch: ${error.message}`);
    }
}
