import React from 'react';
import { connect } from "react-redux"
import { actionCreators } from "../store";
import { Link } from "react-router-dom"

function ToDo({text, deleteBtn, id}) {
  return (
    <li>
      <Link to={`/${id}`}>
        {text}
      </Link>
      <button onClick={deleteBtn}>DELETE</button> 
    </li>
  )
}

// 스토어에서 버튼삭제액션 가져오기
function mapDispatchToProps(dispatch, ownProps) {
  return {
    deleteBtn: () => dispatch(actionCreators.deleteToDo(ownProps.id))
  };
}

export default connect(null, mapDispatchToProps) (ToDo);