import * as React from 'react';
import { connect } from 'react-redux';

/* eslint-disable */
function About() {
  return (<div className="wrapper">
    <div className="about animated fadeIn">
      <h1>Bonjour, I&rsquo;m Quentin.</h1>
      <p>
        I&rsquo;m a Software Engineer at <a target="_blank" rel="noreferrer noopener" href="//adikteev.com">Adikteev</a> in Paris.
        Where I&rsquo;m in charge of the development of the company&rsquo;s 'SDK': a massively distributed script managing the lifetime of multiple ad formats in the browser.
      </p>
      <br />
      <h3>Work Experiences</h3>
      <hr />
      <ul>
        <li>
          <h3>JOUL</h3>
          <p>Six-months internship as a front-end developper taking part in a 5 developers team. JOUL is a start-up building innovative geolocalization solutions. I mainly worked on their mobile applications (such as ZenBus on iOS and Android).</p>
          <p>Technologies: Javascript (Vanilla), HTML5, CSS3, Swift</p>
        </li>
        <li>
          <h3>Mojaro</h3>
          <p>Junior Developer at a small video game studio based in Vancouver, BC. The studio was newly created when I joined this team of highly experienced veterans from the industry.</p>
          <p>I worked for VI on the 3D engine, the gameplay system and the audio engine for their first product, KnightScape (Available on iOS). Although, the size of the company (10->15 people) allowed me to get involved in an extremely various set of tasks outside: Creation of a streaming system for the artists to test their work directly on devices, setting up a continuous integration system, putting the basis for an online store service...</p>
          <p>Technologies: C/C++/Objective-C, OpenGL/DirectX, Python, FMOD, Jenkins CI, TestFlight, Google App Engine</p>
        </li>
      </ul>
      <h3>Education</h3>
      <hr />
      <ul>
        <li>EPITA</li>
        <li>SJTU</li>
      </ul>
    </div>
  </div>);
}
/* eslint-enable */

export default connect(state => state)(About);
