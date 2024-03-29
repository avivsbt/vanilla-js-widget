import './style.css';
import { getRecommendations } from './api';
import { store } from './store';
import './components';

const sponsored = document.querySelectorAll('.recommendations[type="sponsored"]');

store.subscribe(sponsored, "updateSponsoredRecommendations", function (recommendations, action, store) {
  sponsored.forEach(element => {
    var component = element.getAttribute("component");
    var item = document.createElement(component);

    var textNode = document.createTextNode("Text for the slot");
    var slot = item.shadowRoot.querySelector('slot[name="title"]');
    slot.appendChild(textNode);

    element.appendChild(item);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  getRecommendations();
});


