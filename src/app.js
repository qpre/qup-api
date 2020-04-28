import React, { Component } from "react";
import { Icon, Divider, Modal, Layout } from "antd";
import backgroundImage from "./background.jpg";
import { css } from "glamor";

import "./App.css";

const linksStyle = css({
  color: "#999",
  ":hover": {
    color: "#2592FC",
  },
});

class App extends Component {
  render() {
    return (
      <div
        style={{
          width: "calc(100vw)",
          height: "calc(100vh)",
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Layout>
          <Layout.Content>
            <Modal
              wrapClassName="vertical-center-modal"
              visible
              closable={false}
              footer={null}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: "90px",
                    height: "90px",
                    backgroundImage: `url(https://avatars1.githubusercontent.com/u/2156263?s=460&v=4)`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    borderRadius: "50%",
                    overflow: "hidden",
                    marginBottom: "20px",
                    marginTop: "20px",
                  }}
                />
                <h2>Quentin Pré</h2>
                <div style={{ marginTop: "20px" }}>
                  Head of Engineering @{" "}
                  <a href="https://www.emoteev.io">eMoteev</a>
                  <br />
                  JavaScript Teacher @ <a href="https://epita.fr">EPITA</a>
                  <br />
                </div>
              </div>
              <Divider />
              <div style={{ textAlign: "center" }}>
                Feel free to send me an{" "}
                <a href="mailto:pre.quentin+website@gmail.com">email</a>
              </div>
              <Divider />
              <div style={{ fontSize: 25, textAlign: "center" }}>
                <a style={{ margin: "10px" }} href="https://github.com/qpre">
                  <Icon {...linksStyle} type="github" />
                </a>
                <a
                  style={{ margin: "10px" }}
                  href="https://www.linkedin.com/in/quentinpre"
                >
                  <Icon {...linksStyle} type="linkedin" />
                </a>
                <a
                  style={{ margin: "10px" }}
                  href="https://twitter.com/quentinpre"
                >
                  <Icon {...linksStyle} type="twitter" />
                </a>
              </div>
            </Modal>
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}

export default App;
