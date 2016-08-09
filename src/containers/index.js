import * as React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

function Index(props) {
  const goToArticle = (id) => () => {
    props.dispatch(replace(`/article/${id}`));
  };

  return (<div className="wrapper">
    <div className="index">
      <div className="row">
        <ul className="column left animated fadeInLeft">
          <li>
            <h3>Bonjour, I&rsquo;m Quentin.</h3>
            { /* eslint-disable */ }
            <p>
              I&rsquo;m a Software Engineer at <a target="_blank" href="//adikteev.com">Adikteev</a> in Paris.<br />
              I write about my experiments at coding and cooking.
            </p>
            { /* eslint-enable */ }
          </li>
          <li>
            <h3>We are in 2016</h3>
            { /* eslint-disable */ }
            <p>Did you know <a href="//youmightnotneedjquery.com" target="_blank">You Might Not Need jQuery</a> ?</p>
            { /* eslint-enable */ }
          </li>
        </ul>
        <ul className="column right animated fadeInUp">
          {props.articles.map(
            (article) => <li className="article-item" onClick={goToArticle(article.id)}>
              <div className="card">
                <div
                  className="cover-photo"
                  style={{ backgroundImage: `url(${article.cover})` }}
                />
                <h4>{article.title}</h4>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  </div>);
}

export default connect(state => state)(Index);
