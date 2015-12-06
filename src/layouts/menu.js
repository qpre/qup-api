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
    var goToIndex = () => {
      Router.navigate('');
    };

    var goToArticles = () => {
      Router.navigate('articles');
    };

    return <div className='wrapper animated fadeInDown'>
      <div className='menu'>
        <h3 onClick={goToIndex}>Quentin Pré</h3>

        <ul>
          <li onClick={goToArticles}>Articles</li>
          <li>About</li>
        </ul>
      </div>
    </div>;
  }
}
