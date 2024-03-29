/**
 * Asynchronously fetches data from the specified URL using the fetch API with optional configurations.
 * @param {string} url - The URL to fetch data from.
 * @param {Object} options - Optional configurations for the fetch request such as method, headers, body, etc.
 * @returns {Promise} A promise that resolves to the fetched data.
 * @throws {Error} If an error occurs during the fetching process.
 */
export async function fetchRequest(url, options) {
    try {
        // Fetch data from the specified URL using the provided options
        const response = await fetch(url, options);

        // Parse the response body as JSON
        const data = await response.json();

        // Return the fetched data
        return data;
    } catch (error) {
        // If an error occurs during fetching or parsing, throw the error
        throw error;
    }
}
