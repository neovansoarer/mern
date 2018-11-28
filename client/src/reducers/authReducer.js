import { FETCH_USER } from '../actions/types';

const auth = (state=null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload.data || false;
    default:
      return state;
  }
};

export default auth;