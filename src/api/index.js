import { store } from '../store/index.js'
import { data } from '../lib/data.js'

/**
 * Asynchronously fetches data from the specified URL using the fetch API with optional configurations.
 * @param {string} url - The URL to fetch data from.
 * @param {Object} options - Optional configurations for the fetch request such as method, headers, body, etc.
 * @returns {Promise} A promise that resolves to the fetched data.
 * @throws {Error} If an error occurs during the fetching process.
 */
async function fetchRequest(url, options) {
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

export function getRecommendations(
  publisher_id = 'taboola-templates',
  app_type = 'desktop',
  app_apikey = 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4',
  source_id = ''
) {
  const url = `http://api.taboola.com/1.0/json/${publisher_id}/recommendations.get?app.type=${app_type}&app.apikey=${app_apikey}&count=100&source.type=video&source.id=${source_id}`;

  fetchRequest(url).then(response => {

    const mappedData = {};

    data.forEach(item => {
      item.categories.forEach(category => {
        mappedData[category] ? mappedData[category].push(item) : mappedData[category] = [item];
      });
    });

    store.dispatch("updateSponsoredRecommendations", [mappedData]);
  });
}