import { test } from 'vitest';
import './slider-img.component';
import '../slider-img/slider-img.component';
import { data } from '../../lib/data-test';
import { store } from '../../store';

test('renders banner with correct content', async () => {

  const mappedData = {};

  data.forEach(item => {
    item.categories.forEach(category => {
      mappedData[category] ? mappedData[category].push(item) : (mappedData[category] = [item]);
    });
  });
  store.dispatch("setSponsoredRecommendations", [mappedData]);

  const component = document.createElement('slider-img');
  component.setAttribute("category", 'fr');
  component.setAttribute("amount", '3');
  
  for (let i = 0; i < 3; i++) {
    let list = store.sponsoredRecommendations[0]['fr'];
    if (!list.length) break;

    const componentBanner = document.createElement('banner-img');
    componentBanner.setAttribute("category", 'fr');

    const title = componentBanner.shadowRoot.querySelector('.title');
    const img = componentBanner.shadowRoot.querySelector(".img");
    const link = componentBanner.shadowRoot.querySelector(".link");
    const origin = componentBanner.shadowRoot.querySelector(".origin");
    const branding = componentBanner.shadowRoot.querySelector(".branding");

    expect(title.textContent).toBe(list[0].name);
    expect(img.getAttribute("src")).toBe(list[0].thumbnail[0].url);
    expect(link.getAttribute("href")).toBe(list[0].url);
    expect(origin.textContent).toBe(list[0].origin);
    expect(branding.textContent).toBe(list[0].branding);
  }
});
