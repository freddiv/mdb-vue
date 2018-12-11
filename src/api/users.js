import axios from 'axios';

const ROOT_URL = '/static/';

export default {
    fetchUsers(token) {
      return axios.get(`${ROOT_URL}/users.json`, {
         headers: {
             Authorization: `Bearer ${token}`
          } 
       });
    },
    fetchUserGrid(){
      fetch('./static/users.json')
      .then(result => result.json())
      .then(data => {
        console.log(data);
        return data;
      });
    },
};