
function getRecommendations() {
  var url = "http://api.taboola.com/1.0/json/taboola-templates/recommendations.get?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&count=100&source.type=video&source.id="

  httpRequest(url, function (response) {
    store.dispatch('setSponsoredRecommendations', [response.list]);
    console.log('httpRequest', response);
  });

}

function httpRequest(url, callback, options) {

  var options = {
    headers: {},
    body: {}
  };

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

function State() {
  this.subscriptions = {};
}

State.prototype.subscribe = function (element, action, callback) {
  this.subscriptions[action] = this.subscriptions[action] || [];
  this.subscriptions[action].push(function (data) {
    callback.apply(element, data);
  });
};

State.prototype.dispatch = function (action, data) {
  data = data || [];

  if (typeof this[action] === "function") {
    this[action].apply(this, data);
  }

  data.push(action);
  data.push(this);

  this.subscriptions[action] = this.subscriptions[action] || [];
  var subscriptions = this.subscriptions[action];
  for (var i = 0; i < subscriptions.length; i++) {
    subscriptions[i](data);
  }
};

var store = new State();
store.sponsoredRecommendations = [];

store.setSponsoredRecommendations = function (data) {
  this.sponsoredRecommendations.push(data);
};

store.removeItemSponsoredRecommendations = function (id, category) {
  var self = this;
  this.sponsoredRecommendations[0][category] = this.sponsoredRecommendations[0][category].filter(function (item) {
    return item.id !== id;
  });
};

var sponsoreds = document.querySelectorAll('.rwt');

var sponsoredsFiltered = [];
for (var i = 0; i < sponsoreds.length; i++) {
  var element = sponsoreds[i];
  if (element.getAttribute('type') === 'sponsored') {
    sponsoredsFiltered.push(element);
  }
}

store.subscribe(sponsoredsFiltered, "setSponsoredRecommendations", function (recommendations, action, store) {
  console.log(recommendations);
});

document.addEventListener("DOMContentLoaded", function () {
  getSponsoredRecommendations();
});