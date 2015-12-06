import {articles} from '../data/articles';
import showdown   from 'showdown';
import * as React from 'react';
import ReactDisqusThread from 'react-disqus-thread';

let converter = new showdown.Converter();

export class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articleId: props.id,
      metaData:  null,
      content:   null,
    };
  }

  componentWillMount() {
    let fetchContent = (article) => {
      // fetch body content
      // creating request handler
      let xhr = new XMLHttpRequest();

      // opening socket
      xhr.open('GET', article.body, true);

      // setting handlers
      xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) { return; }

        if (xhr.status == 200) {
          this.setState({content: xhr.responseText});
        } else {
          debugger;
        }
      }

      // starting transaction
      xhr.send();
    };

    // retreive current article before doing anything else
    if (this.state.article == null) {
      for (let art of articles) {
        if (art.id == this.state.articleId) {
          this.setState({article: art});
          fetchContent(art);
          break;
        }
      }
    }
  }

  componentDidMount() {
  }

  render() {
    return <div className='wrapper'>
      <div className='article'>
      <h1 className='animated fadeInLeft'>{this.state.article && this.state.article.title}</h1>
      <p className='content animated fadeInRight' dangerouslySetInnerHTML={{__html: converter.makeHtml(this.state.content)}}></p>
      <ReactDisqusThread shortname='qpre' identifier={`qup-article-${this.state.article.id}`} title={this.state.article && this.state.article.title} url={window.location.href} />
      </div>
    </div>;
  }
}
