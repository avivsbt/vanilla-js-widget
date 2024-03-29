import { store } from '../store/index.js'
import { data } from '../lib/data.js'
import { fetchRequest } from '../services/api.js';

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
        item = {...item, isViewed: false}
        mappedData[category] ? mappedData[category].push(item) : mappedData[category] = [item];
      });
    });

    store.dispatch("updateSponsoredRecommendations", [mappedData]);
  });
}