import Alt from '../'
import { assert } from 'chai'
import isPromise from 'is-promise'

const alt = new Alt()

class AsyncAction {

  get() {
    return (dispatch) => {
      dispatch();
    }
  }

}

const actions = alt.createActions(class Actions extends AsyncAction {
  static displayName = 'Actions';

  fetch() {
    return this.get();
  }
})

const store = alt.createStore(class FooStore {
  static displayName = 'FooStore';
  constructor() {
    this.dispatched = false
    this.bindActions(actions)
  }
  onFetch() {
    this.dispatched = true
  }
})

export default {
  'async actions': {
    afterEach() {
      alt.recycle(store)
    },

    'are not dispatched automatically'() {
      actions.fetch()
      assert(store.state.dispatched === true, 'inherited async action should be dispatched');
    }

  },
}
