// Detect if user is on IE browser
const isIE = !!window.MSInputMethodContext && !!document.documentMode;

export function getRecommendations(
  publisher_id = 'taboola-templates',
  app_type = 'desktop',
  app_apikey = 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4',
  source_id = ''
) {
  const url = `http://api.taboola.com/1.0/json/${publisher_id}/recommendations.get?app.type=${app_type}&app.apikey=${app_apikey}&count=100&source.type=video&source.id=${source_id}`;

  // Check if the browser is Internet Explorer
  if (isIE) {
    httpRequest(url, (response) => {
      return JSON.parse(response)
    });
  } else {
    // If the browser is not Internet Explorer, simply run the fetch function with the provided URL
    return fetchRequest(url);
  }
}

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

/**
 * Sends an HTTP request to the specified URL using XMLHttpRequest with optional configurations.
 * @param {string} url - The URL to send the request to.
 * @param {function} callback - The callback function to execute upon completion of the request. 
 * @param {Object} options - Optional configurations for the request such as method, headers, body, etc.
 */
function httpRequest(url, callback, options = {}) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Set up event handler to execute when the state of the request changes
  xhr.onreadystatechange = () => {
    // Check if the request is done (readyState 4)
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // If the request is successful (status code 200), execute the callback with the response text
      if (xhr.status === 200) {
        callback(xhr.responseText);
      } else {
        // If there's an error (status code other than 200), throw an error
        throw new Error("HTTP request failed with status: " + xhr.status);
      }
    }
  };

  // Open the HTTP request with the specified method (default is "GET") and URL
  xhr.open(options.method || "GET", url);

  // Set request headers based on options.headers
  for (const header in options.headers) {
    xhr.setRequestHeader(header, options.headers[header]);
  }

  // Send the request with optional request body
  xhr.send(options.body);
}
