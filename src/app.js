import React, { Component } from 'react';
import { Modal, Layout } from 'antd';

class App extends Component {
  render() {
    return (
      <Layout>
        <Layout.Content>
          <Modal
            visible
            closable={false}
          >
            coucou
          </Modal>
        </Layout.Content>
      </Layout>
    );
  }
}

export default App;
