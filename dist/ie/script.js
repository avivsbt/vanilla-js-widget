var sponsoredRecommendations = {};
var sponsoredsElements = [];
var i = 0

function getSponsoredRecommendations() {
  var url = "http://api.taboola.com/1.0/json/taboola-templates/recommendations.get?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&count=100&source.type=video&source.id="

  httpRequest(url, function (response) {

    var res = JSON.parse(response);
    var resLength = res.list.length;

    if (resLength) {
      var imagesLoaded = 0;
      var totalImages = res.list.length;

      res.list.forEach(function (item, index) {
        var img = new Image();
        img.src = item.thumbnail[0].url;

        img.onload = function () {
          imagesLoaded++;
          item.categories.forEach(function (category) {
            if (sponsoredRecommendations[category]) {
              sponsoredRecommendations[category].push(item);
            } else {
              sponsoredRecommendations[category] = [item];
            }
          });

          if (imagesLoaded === totalImages) {
            generateBanners();
          }
        };

        img.onerror = function () {
          imagesLoaded++;
          console.log('Error loading image');
          if (imagesLoaded === totalImages) {
            generateBanners();
          }
        };
      });
    }
    else {
      console.log("Not found sponsored recommendations");
      getSponsoredRecommendations();
    }
  });
}

function httpRequest(url, callback, options) {

  if (options === undefined) {
    options = { headers: {}, body: {} };
  }

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        callback(xhr.responseText);
      }
    }
  };

  xhr.open('GET', url);

  if (options && options.headers) {
    for (var header in options.headers) {
      if (options.headers.hasOwnProperty(header)) {
        xhr.setRequestHeader(header, options.headers[header]);
      }
    }
  } else {
    console.error("Options or options.headers is not defined.");
  }

  if (options && options.body) {
    xhr.send(options.body);
  } else {
    console.error("Options or options.body is not defined.");
  }

}

function generateBanners() {
  for (var i = 0; i < sponsoredsElements.length; i++) {
    var element = sponsoredsElements[i];

    var attrCategory = element.getAttribute('category');
    var attrComponent = element.getAttribute('component');
    var attrAmount = element.getAttribute('amount');

    if (attrComponent === 'banner-img') {
      if (sponsoredRecommendations[attrCategory] && sponsoredRecommendations[attrCategory].length === 0) break;
      var component = bannerImgComponent(sponsoredRecommendations[attrCategory][0]);
      sponsoredRecommendations[attrCategory].shift();
      element.appendChild(component);
    }

    if (attrComponent === 'slider-img') {
      var component = bannerSliderImgComponent(attrCategory, attrAmount);
      element.appendChild(component);
    }
  }
}

function bannerImgComponent(data) {
  var container = document.createElement('div');
  var template = document.createElement("template");

  template.innerHTML =
    '<div id="root-banner-img">' +
    '   <a target="_blank" class="link">' +
    '       <div class="wrapper-img"><img class="img"/></div>' +
    '       <h1 class="title"></h1>' +
    '   </a>' +
    '   <div class="type">' +
    '       <span class="branding"></span> | ' +
    '       <span class="origin"></span>' +
    '   </div>' +
    '</div>';

  var link = template.querySelector('.link');
  var img = template.querySelector('.img');
  var title = template.querySelector('.title');
  var origin = template.querySelector('.origin');
  var branding = template.querySelector('.branding');

  title.textContent = data.name;
  img.src = data.thumbnail[0].url;
  link.href = data.url;
  origin.textContent = data.origin;
  branding.textContent = data.branding;

  container.appendChild(template);

  return container;
}

function bannerSliderImgComponent(category, amount) {
  var container = document.createElement('div');
  var template = document.createElement("template");

  template.innerHTML =
    '<div id="root-slider-img">' +
    '   <div class="slider"></div>' +
    '</div>';

  var slider = template.querySelector('.slider');

  for (var i = 0; i < amount; i++) {
    if (sponsoredRecommendations[category].length === 0) break;
    var component = bannerImgComponent(sponsoredRecommendations[category][0]);
    sponsoredRecommendations[category].shift();
    slider.appendChild(component);
  }

  container.appendChild(template);

  return container;
}

document.addEventListener("DOMContentLoaded", function () {
  sponsoredsElements = document.getElementsByClassName('rwt');
  getSponsoredRecommendations();
});