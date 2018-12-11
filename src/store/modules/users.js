
const state = {
  users: [],
  gridConfig: '',
};

const getters = {
    allUsers: state => state.users,
    gridConfig: state => state.gridConfig,
};

const actions = {  
    fetchUsers:({ rootState }) => {
	//	commit('setUsers', response.data.data)
	},
};

const mutations = {
  setUsers: (state, users) => {
	state.users = users;
  },
  setGridConfig: (state, gridConfig) => {
	state.gridConfig = gridConfig;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};