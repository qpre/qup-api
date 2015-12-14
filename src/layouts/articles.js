import {articles} from '../data/articles';
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
    let goToArticle = (id) => {
      return () => {
        Router.navigate(`article/${id}`);
      };
    };

    let odd = true;

    return <div className='wrapper'>
      <ul className='articles'>
        {articles.map((article) => {
          let liClass = 'article-item animated ';

          odd = !odd;
          liClass += (odd) ? 'fadeInRight' : 'fadeInLeft';

          return <li className={liClass} onClick={goToArticle(article.id)}>
            <div className='mask'></div>
            <h2>{article.title}</h2>
            <div className='cover-photo' style={{backgroundImage: `url(${article.cover})`}}></div>
          </li>;
        })}
      </ul>
    </div>;
  }
}
