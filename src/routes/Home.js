import React, { useState } from "react";
import { connect } from 'react-redux';
import { actionCreators } from "../store";
import ToDo from "../components/ToDo"

function Home({ toDos, addToDo }) {
  const [text,  setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    addToDo(text);
    setText("");
  }
  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input types="text" value={text} onChange={onChange}/>
        <button>ADD</button>
      </form>
      <ul>
        {toDos.map(toDo => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </div>
  );
}

// store랑 컴포넌트 상태-프롭스연결
function mapStateToProps(state) {
  return { toDos: state }
}
function mapDispatchToProps(dispatch) {
  return {
    addToDo: text => dispatch(actionCreators.addToDo(text))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);