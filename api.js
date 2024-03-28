// Detect if user is on IE browser
const isIE = !!window.MSInputMethodContext && !!document.documentMode;

// Array to store script Polyfill URLs
var scriptUrlsPolyfill = [
  'https://cdn.jsdelivr.net/npm/promise-polyfill@8.3.0/dist/polyfill.min.js',
  'https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.20/dist/fetch.umd.min.js',
];

export function getData(
  publisher_id = 'taboola-templates',
  app_type = 'desktop',
  app_apikey = 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4',
  source_id = ''
) {
  const url = `http://api.taboola.com/1.0/json/${publisher_id}/recommendations.get?app.type=${app_type}&app.apikey=${app_apikey}&count=100&source.type=video&source.id=${source_id}`;

  // Check if the browser is Internet Explorer
  if (isIE) {
    // Initialize a counter to keep track of loaded scripts
    let loadedScripts = 0;

    // Load each script from the provided URLs array
    scriptUrlsPolyfill.forEach((url) => {
      // Create a script element for each URL
      var script = document.createElement('script');
      // Set the type of the script to JavaScript
      script.type = 'text/javascript';
      // Set the source URL of the script
      script.src = url;

      // Set the onload event handler for each script
      script.onload = checkAllScriptsLoaded;

      // Append each script to the document head
      document.head.appendChild(script);

      // Increment the counter for loaded scripts
      loadedScripts++;
    });

    // Once all scripts are loaded, check if all expected scripts are loaded
    if (loadedScripts === scriptUrlsPolyfill.length) {
      // If all scripts are loaded, proceed to fetch data using the provided URL
      return fetchData(url, true);
    }
  } else {
    // If the browser is not Internet Explorer, simply run the fetch function with the provided URL
    return fetchData(url);
  }
}

/**
 * Asynchronously fetches data from the specified URL.
 * @param {string} url - The URL to fetch data from.
 * @param {boolean} polyfill - Optional parameter specifying whether to use a polyfill for older browsers.
 * @returns {Promise} A promise that resolves to the fetched data.
 */
async function fetchData(url, polyfill = false) {
  try {
    const response = polyfill ? await window.fetch(url) : await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
