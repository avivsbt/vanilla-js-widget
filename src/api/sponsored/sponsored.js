import { store } from '../../store/index.js';
import { data } from '../../lib/data.js';
import { fetchRequest } from '../../services/api/api.js';

const DEFAULT_PARAMETERS = {
  publisher_id: 'taboola-templates',
  app_type: 'desktop',
  app_apikey: 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4',
  source_id: ''
};

// The function getSponsoredRecommendations fetches sponsored recommendations from the Taboola API,
// organizes them by category, and sends them to a store for storage,
// while also handling any potential errors.

export async function getSponsoredRecommendations(parameters = {}) {
  const { publisher_id, app_type, app_apikey, source_id } = { ...DEFAULT_PARAMETERS, ...parameters };

  const url = `http://api.taboola.com/1.0/json/${publisher_id}/recommendations.get?app.type=${app_type}&app.apikey=${app_apikey}&count=100&source.type=video&source.id=${source_id}`;

  try {
    const response = await fetchRequest(url);

    if (response.list.length) {
      const mappedData = {};

      response.list.forEach(item => {
        item.categories.forEach(category => {
          mappedData[category] ? mappedData[category].push(item) : (mappedData[category] = [item]);
        });
      });

      store.dispatch("setSponsoredRecommendations", [mappedData]);
    }
    else {
      console.log("Not found sponsored recommendations");
    }

  } catch (error) {
    console.error("Error fetching sponsored recommendations:", error);
  }
}
