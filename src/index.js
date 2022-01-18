import { createStore } from 'redux';

// counter 기능
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD"
const MINUS = "MINUS"

const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1
    case MINUS:
      return count - 1
    default:
      return count
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

add.addEventListener("click", () => countStore.dispatch({type: ADD}))
minus.addEventListener("click", () => countStore.dispatch({type: MINUS}))


// To-do-list 기능
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'

const addToDo = (text) => {
  return { type: ADD_TODO, text }
}
const deleteToDo = (id) => {
  return { type: DELETE_TODO, id }
}

// 여기서 절대 MUTABLE STATE를 쓰면 안된다!!(ex_push();)
// store을 수정하는 건 action을 통해서만 할 수 있다.
const reducer = (state = [], action) => {
  // console.log(action)
  switch(action.type) {
    case ADD_TODO:
      const newToDoObj = { text:action.text, id: Date.now() }
      return [...state, newToDoObj];
      // 절대 Mutate하게 push()하면 안되고 action을 통해 새로운 배열을 반환한다.
    case DELETE_TODO:
      const deleteToDoObj = state.filter(toDo => toDo.id !== action.id);
      return deleteToDoObj;
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()))

//action을 dispatch하기 위한 함수
const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
}

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id))
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL"
    btn.addEventListener("click", dispatchDeleteToDo)
    li.id = toDo.id
    li.innerText = toDo.text;
    li.appendChild(btn)
    ul.appendChild(li)
  })

}
store.subscribe(paintToDos)


const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
