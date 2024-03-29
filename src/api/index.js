import { store } from '../store/index.js'
import { data } from '../lib/data.js'
import { fetchRequest } from '../services/api.js';

export async function getSponsoredRecommendations(
  publisher_id = 'taboola-templates',
  app_type = 'desktop',
  app_apikey = 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4',
  source_id = ''
) {
  const url = `http://api.taboola.com/1.0/json/${publisher_id}/recommendations.get?app.type=${app_type}&app.apikey=${app_apikey}&count=100&source.type=video&source.id=${source_id}`;

  try {
    const response = await fetchRequest(url);
    
    const mappedData = {};

    data.forEach(item => {
      item.categories.forEach(category => {
        mappedData[category] ? mappedData[category].push(item) : mappedData[category] = [item];
      });
    });

    store.dispatch("setSponsoredRecommendations", [mappedData]);
    
  } catch (error) {
    throw error
  }

}