import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

function Menu(props) {
  let goToIndex = () => props.dispatch(replace('/'));
  let goToArticles = () => props.dispatch(replace('/articles'));
  let goToAbout = () => props.dispatch(replace('/about'));

  return (<div className="nav-wrapper">
    <div className="menu animated fadeInDown">
      <h3 onClick={goToIndex}>Quentin Pré</h3>

      <ul>
        <li onClick={goToArticles}>Articles</li>
        <li onClick={goToAbout}>About</li>
      </ul>
    </div>
  </div>);
}


function mapState(state) {
  return state;
}

export default connect(mapState)(Menu);
