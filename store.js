import { State } from './state.js';

var store = new State();
store.organicRecommendations = [];
store.sponsoredRecommendations = [];

store.setSponsoredRecommendations = function (data) {
    this.sponsoredRecommendations.push(data)
}

store.setOrganicRecommendations = function (data) {
    this.organicRecommendations.push(data)
}

export { store };
