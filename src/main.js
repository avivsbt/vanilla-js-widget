import './style.css';
import { getRecommendations } from './api';
import { store } from './store';

import { OneImg } from './components/one-img';

var sponsored = document.querySelector(".sponsored");

store.subscribe(sponsored, "updateSponsoredRecommendations", function(recommendations, action, store) {  

  var item = document.createElement('one-img');
  // Create a text node
  var textNode = document.createTextNode("Text for the slot");
  // Get the slot element
  var slot = item.shadowRoot.querySelector('slot[name="title"]');
  // Append the text node to the slot
  slot.appendChild(textNode);
  this.appendChild(item);
});

document.addEventListener("DOMContentLoaded", function() {
  getRecommendations();
});


