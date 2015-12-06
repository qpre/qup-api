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
    }

    return <div className='wrapper'>
      <div className='index'>
        <ul className='column left animated fadeInLeft'>
          <li>
            <h3>Bonjour, I&rsquo;m Quentin.</h3>
            <span className='subtitle'>
              I&rsquo;m a Software Engineer at <a target='_blank' href='//adikteev.com'>Adikteev</a> in Paris.
            </span>
            <p>
              I write about my experiments at coding and cooking.
            </p>
          </li>
          <li>
            <h3>We are in 2015</h3>
            <p>Did you know <a href='//youmightnotneedjquery.com' target='_blank'>You Might Not Need jQuery</a> ?</p>
          </li>
        </ul>
        <ul className='column right animated fadeInUp'>
          {articles.map((article) => {
            return <li className='article-item' onClick={goToArticle(article.id)}>
              <h2>{article.title}</h2>
              <div className='cover-photo' style={{backgroundImage: `url(${article.cover})`}}></div>
            </li>;
          })}
        </ul>
      </div>
    </div>;
  }
}