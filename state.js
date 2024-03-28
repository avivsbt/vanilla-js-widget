export function State() {
    this.subscriptions = [];
}

State.prototype.subscribe = function (element, action, callback) {
    this.subscriptions[action] = this.subscriptions[action] || [];
    this.subscriptions[action].push(function (data) {
        callback.apply(element, data);
    });
}

State.prototype.dispatch = function (action, data) {
    
    data = data;

    // Call action reducers
    if ("function" === typeof this[action]) {
        this[action].apply(this, data);
    }

    // Add the action and state as final arguments
    data.push(action);
    data.push(this);

    // Call subscribers
    this.subscriptions[action] = this.subscriptions[action] || [];
    this.subscriptions[action].forEach(
        function (subscription) {
            subscription(data);
        }
    );
}