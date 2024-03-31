// This service facilitates efficient event handling and state management by 
// create a State object, which includes methods for subscribing to actions and dispatching them 
// with associated data to registered subscribers.

export function State() {
    this.subscriptions = new Map();
}

State.prototype.subscribe = function (element, action, callback) {
    if (!this.subscriptions.has(action)) {
        this.subscriptions.set(action, []);
    }
    this.subscriptions.get(action).push(function (data) {
        callback.call(element, ...data);
    });
}

State.prototype.dispatch = function (action, data) {
    data = data || [];
    
    // Check if the action is a function
    if (typeof this[action] === 'function') {
        this[action].call(this, ...data);
    }

    // Add the action and state as final arguments
    data.push(action);
    data.push(this);

    // Call subscribers
    const subscriptions = this.subscriptions.get(action);
    if (subscriptions) {
        subscriptions.forEach(subscription => {
            subscription(data);
        });
    }
}