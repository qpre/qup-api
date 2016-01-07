import * as Menu from './menu';
import * as Footer from './footer';
import * as React from 'react';

class ApplicationComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      yield: null,
    };
  }

  yield(view, params=null) {
    this.setState({yield: view, params});
  }

  renderYield() {
    if (!this.state.yield) { return 'Not Found'; }

    return React.createElement(this.state.yield, this.state.params);
  }

  render() {
    return <div className='application'>
      <Menu.Layout />
      {this.renderYield()}
      <Footer.Layout />
    </div>;
  }
};

export var ApplicationLayout = React.createElement(ApplicationComponent);
