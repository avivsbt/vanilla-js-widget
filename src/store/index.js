import { State } from '../services/state.js';

var store = new State();
store.organicRecommendations = [];
store.sponsoredRecommendations = [];

store.updateSponsoredRecommendations = function (data) {
    this.sponsoredRecommendations.push(data)
}

export { store };
