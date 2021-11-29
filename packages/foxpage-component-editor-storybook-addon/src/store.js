let store = null;
let inited = false;

class Store {
  props = null;

  editor = null;

  set(props) {
    this.props = props;
  }

  get() {
    return this.props;
  }

  reset() {
    this.props = null;
  }
}

const api = {
  init() {
    if (inited) {
      return;
    }
    store = new Store();
    inited = true;
  },

  getStore() {
    return store;
  },
};

api.init();

export default api;
