import showdown from 'showdown';
import React from 'react';
import { connect } from 'react-redux';
import ReactDisqusThread from 'react-disqus-thread';

import { fetchContentIfNeeded } from '../actions/article';

const converter = new showdown.Converter();

class Article extends React.Component {
  componentDidUpdate() {
    const codeNodes = document.querySelectorAll('pre code');

    for (const node of codeNodes) {
      window.hljs.highlightBlock(node);
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="article animated fadeIn">
          <h2>{this.props.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.props.content) }} />
          <ReactDisqusThread
            shortname="qpre"
            identifier={`qup-article-${this.props.id}`}
            title={this.props.title}
            url={window.location.href}
          />
        </div>
      </div>
    );
  }
}

function mapState(state, ownProps) {
  const articles = state.articles.filter(a => a.id === parseInt(ownProps.params.id, 10));

  fetchContentIfNeeded(articles[0]);

  return {
    ...articles[0],
  };
}

export default connect(mapState)(Article);
