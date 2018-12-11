import qs from 'qs';
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
}