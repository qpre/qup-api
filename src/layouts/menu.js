import * as Router from '../lib/router';
import * as React from 'react';

export class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    let goToIndex = () => {
      Router.navigate('');
    };

    let goToArticles = () => {
      Router.navigate('articles');
    };

    let goToAbout = () => {
      Router.navigate('about');
    };

    return <div className='nav-wrapper'>
      <div className='menu animated fadeInDown'>
        <h3 onClick={goToIndex}>Quentin Pré</h3>

        <ul>
          <li onClick={goToArticles}>Articles</li>
          <li onClick={goToAbout}>About</li>
        </ul>
      </div>
    </div>;
  }
}
