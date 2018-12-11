// import api from '../../api/users';
const state = {
  users: [],
  columnDefs: []
};

const getters = {
    allUsers: state => state.users,
    columnDefs: state => state.columnDefs,
};

const actions = {  
    fetchUsers:({ rootState }) => {
	//	commit('setUsers', response.data.data)
  },
 fetchUserGrid({ commit })  {
  fetch('./static/users.json')
  .then(result => result.json())
  .then(data => {
    console.log(data);
    commit('setUsers', data.rowData);
    commit('setColumnDefs', data.gridProperties.columnDefs);
  });
  },
};

const mutations = {
  setUsers: (state, users) => {
	state.users = users;
  },
  setColumnDefs: (state, columnDefs) => {
  state.columnDefs = columnDefs;
  console.log(state);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};