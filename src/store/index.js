import { State } from '../services/state.js';

var store = new State();
store.organicRecommendations = [];
store.sponsoredRecommendations = [];

store.setSponsoredRecommendations = function (data) {
    this.sponsoredRecommendations.push(data)
}

store.updateSponsoredRecommendations = function (data, category) {
    this.sponsoredRecommendations[0][category] = this.sponsoredRecommendations[0][category].filter(e => e.id !== data.id);
}

export { store };
