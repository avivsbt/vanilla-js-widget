import './style.css';
import { getRecommendations } from './api';
import { store } from './store'

var sponsored = document.querySelector(".sponsored");

store.subscribe(sponsored, "updateSponsoredRecommendations", function(sponsored, action, store) {  
  console.log(sponsored)
  var item = document.createElement('div');
  var h1 = document.createElement('h1');

  h1.textContent = "Hello!";
  item.appendChild(h1);
  this.appendChild(item);

});

document.addEventListener("DOMContentLoaded", function() {
  getRecommendations();
});


