import './style.css';
import { getSponsoredRecommendations } from './api/sponsored/sponsored';
import { store } from './store';
import './components';
import { checkImage } from './lib/util';

const sponsoreds = document.querySelectorAll('.rwt[type="sponsored"]');

// Subscribe to store changes and create the component element
store.subscribe(sponsoreds, "setSponsoredRecommendations", async function (recommendations, action, store) {

  for (const sponsoredElement of sponsoreds) {

    const category = sponsoredElement.getAttribute("category") || "en";
    const componentType = sponsoredElement.getAttribute("component");
    const amount = sponsoredElement.getAttribute("amount") || 1;
    const credit = sponsoredElement.getAttribute("credit") || false;

    const data = store.sponsoredRecommendations[0]?.[category];

    if (!data?.length) continue;

    for (let index = 0; index < data.length; index++) {

      let item = data[index];

      const isValidImage = await checkImage(item.thumbnail[0].url);

      if (isValidImage && index === amount) break;

      if (!isValidImage) {
        store.dispatch("removeItemSponsoredRecommendations", [item.id, category]);
      }

    }

    const component = document.createElement(componentType);
    component.setAttribute("category", category);
    component.setAttribute("amount", amount);

    if (credit) {
      console.log(recommendations);
      const creditImg = document.createElement("img");
      creditImg.setAttribute("src", credit);
      const creditSlot = component.shadowRoot.querySelector('slot[name="credit"]');
      creditSlot.appendChild(creditImg);
    }

    sponsoredElement.appendChild(component);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  getSponsoredRecommendations();
});


