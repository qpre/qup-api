import  React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

function Articles(props) {
  const goToArticle = (id) => () => props.dispatch(replace(`article/${id}`));

  let odd = true;

  return (
    <div className="wrapper">
      <ul className="articles">
        {props.articles.map((article) => {
          let liClass = 'article-item animated ';

          odd = !odd;
          liClass += (odd) ? 'fadeInRight' : 'fadeInLeft';

          return (<li className={liClass} onClick={goToArticle(article.id)}>
            <div className="mask" />
            <h2>{article.title}</h2>
            <div className="cover-photo" style={{ backgroundImage: `url(${article.cover})` }} />
          </li>);
        })}
      </ul>
    </div>
  );
}

export default connect(state => state)(Articles);
