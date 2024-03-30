import { State } from '../services/state.js';

var store = new State();
store.organicRecommendations = [];
store.sponsoredRecommendations = [];

store.setSponsoredRecommendations = function (data) {
    this.sponsoredRecommendations.push(data)
}

store.removeItemSponsoredRecommendations = function (id, category) {
    this.sponsoredRecommendations[0][category] = this.sponsoredRecommendations[0][category].filter(item => item.id !== id);
}

export { store };
