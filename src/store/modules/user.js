import { userLogin } from '~api';

const user = {
  state: {},
  mutations: {},
  actions: {
    login: async ({commit}) => {
      let data = await userLogin();
    }
  }
};

export default user;
