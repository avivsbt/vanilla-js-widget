import { test, expect } from 'vitest';
import './banner-img.component';
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
    
    const component = document.createElement('banner-img');
    component.setAttribute("category", 'fr');
    
    const title = component.shadowRoot.querySelector('.title');
    const img = component.shadowRoot.querySelector(".img");
    const link = component.shadowRoot.querySelector(".link");
    const origin = component.shadowRoot.querySelector(".origin");
    const branding = component.shadowRoot.querySelector(".branding");
    
    expect(title.textContent).toBe("15 desserts gourmands sans gluten - Elle à Table");
    expect(img.getAttribute("src")).toBe("https://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/http%3A%2F%2Fcdn-elle.ladmedia.fr%2Fvar%2Fplain_site%2Fstorage%2Fimages%2Felle-a-table%2Fles-dossiers-de-la-redaction%2Fdossier-de-la-redac%2F15-desserts-gourmands-sans-gluten%2F46720503-1-fre-FR%2F15-desserts-gourmands-sans-gluten_reference.jpg");
    expect(link.getAttribute("href")).toBe("https://api.taboola.com/1.0/json/taboola-templates/recommendations.notify-click?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&response.id=__649067a3077c7439a18a0558ac82e236__4947f098f2bf960000480f1dfbfb46aa&response.session=v2_eaefc9521490e8fcae58b0152513771f_885e5feb-0241-4968-ae87-992ca22f2202-tuctd02a52c_1711873964_1711873964_CNawjgYQswsYo_GOnekxIAEoATBmOIjrCkCvkBBI9dLYA1D___________8BWABgAGjGx7Pdg7-4oF5wAQ&item.id=%7E%7EV1%7E%7E-2751163851008755593%7E%7E5khWG3r4qdI2H7O_KccoPngEqsl8ynEPWU6g_gQg9GWKANNcaafC-0QP27WPePej_D75KE7fubJO0yBBV-Kjn3NvVRSOQU3KG74h40zV1xE3Jpvz87tKk9szttPlHlQ16geeKmBzsC8tOXDDFySaFY8XwLbI--WZuj80gUuMjckv-g3BPZqv3IrMOsHf8vWe&item.type=video&sig=0575bc42f420a8b407fda1c2851929c8254488fa0355&redir=http%3A%2F%2Fwww.elle.fr%2FElle-a-Table%2FLes-dossiers-de-la-redaction%2FDossier-de-la-redac%2F15-desserts-gourmands-sans-gluten%3Futm_source%3Dtaboola%26utm_medium%3Dreferral%26tblci%3DGiB1KvG0XTeUHUfSNVP51GjnsPXnVVziULSVv2WLZSMvmiC5BCjbuZ2QgbCdgCo%23tblciGiB1KvG0XTeUHUfSNVP51GjnsPXnVVziULSVv2WLZSMvmiC5BCjbuZ2QgbCdgCo&ui=885e5feb-0241-4968-ae87-992ca22f2202-tuctd02a52c&cpb=GIkFIJz__________wEqFnRhYm9vbGFzeW5kaWNhdGlvbi5jb20yCHRyYzAwMjI3OICElKcFQIjrCkivkBBQ9dLYA1j___________8BYwjTVxDHcxgwZGMIt10QzHoYMmRjCP4WEIogGBNkYwjXFhDVHxgjZGMI4k8Q8WkYNmRjCNIDEOAGGAhkYwiWFBCXHBgYZGMIh10QmXoYPWRjCIBVELJwGD5kYwj0FBCeHRgfZGMIhUIQqVcYD2RjCKQnEIo1GC9keAGAAaxNiAHJu7PqAZABF5gBo_GOnekx2wEQAdwB");
    expect(origin.textContent).toBe("sponsored");
    expect(branding.textContent).toBe("Cuisine");
});
