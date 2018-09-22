import * as types from './mutation-types'

const mutations = {
  [types.USERID] (state, id) {
    state.userId = id
  }
}

export default mutations
