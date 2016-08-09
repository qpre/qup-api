import React from 'react';
import { connect } from 'react-redux';
import Menu from '../components/menu';
import Footer from '../components/footer';

function Application(props) {
  return (<div className="application">
    <Menu />
    {props.children}
    <Footer />
  </div>);
}

export default connect(state => state)(Application);
