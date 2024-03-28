import './style.css';
import { getRecommendations } from './api.js';
import { store } from './store.js'

var recommendations = document.getElementById("recommendations");

store.subscribe(recommendations, "setSponsoredRecommendations", function(sponsored, action, store) {  

  var item = document.createElement('div');
  var h1 = document.createElement('h1');

  h1.textContent = "Hello!";
  item.appendChild(h1);
  this.appendChild(item);

});

getRecommendations();
