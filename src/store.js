import {createStore} from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
  return {
    type: ADD,
    text
  };
};

const deleteToDo = id => {
  return {
    type: DELETE,
    id
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case ADD:
      // 여기서 새로운 객체를 앞에 넣을 건지 뒤로 넣을 건지
      return [...state, {text: action.text, id: Date.now()}];
    case DELETE:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  deleteToDo
};

export default store;