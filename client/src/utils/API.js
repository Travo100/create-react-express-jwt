import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: function(id) {
    return axios.get(`/user/${id}`);
  }
};
