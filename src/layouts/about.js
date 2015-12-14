import showdown   from 'showdown';
import * as React from 'react';
import ReactDisqusThread from 'react-disqus-thread';

let converter = new showdown.Converter();

export class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return <div className='wrapper'>
      <div className='about animated fadeIn'>
        <h1>Bonjour, I&rsquo;m Quentin.</h1>
        <p>
          I&rsquo;m a Software Engineer at <a target='_blank' href='//adikteev.com'>Adikteev</a> in Paris.
          Where I&rsquo;m in charge of the development of the company&rsquo;s 'SDK': a massively distributed script managing the lifetime of multiple ad formats in the browser.
        </p>
        <br/>
        <h2>Work Experiences</h2>
        <hr/>
        <ul>
          <li>JOUL</li>
          <li>Mojaro</li>
        </ul>
        <h2>Education</h2>
        <hr/>
        <ul>
          <li>EPITA</li>
          <li>SJTU</li>
        </ul>
      </div>
    </div>;
  }
}
