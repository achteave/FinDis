import './style.css';
import franz from './assets/anz.png';
import azizah from './assets/jijeh.png'
import daffa from './assets/atap.jpg'
import victor from './assets/tor.jpg';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  return (
    <div>
      <buutton className="" onClick={() => navigate(-1)}>
        <img src='' className='' />
      </buutton>
      <div className="row">
        <h1>Our Team</h1>
      </div>
      <div className="row">
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img src={franz} alt="Team Member" />
            </div>
            <h3>M. Affransyah Bayulaksana</h3>
            <p>Leader</p>
            <div className="icons">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
              <a href="#">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img src={azizah} alt="Team Member" />
            </div>
            <h3>Nurul Azizah</h3>
            <p>Member</p>
            <div className="icons">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
              <a href="#">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img src={victor} alt="Team Member" />
            </div>
            <h3>Victorich Albert</h3>
            <p>Member</p>
            <div className="icons">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
              <a href="#">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img src={daffa} alt="Team Member" />
            </div>
            <h3>Daffa Althaf Maulana</h3>
            <p>Member</p>
            <div className="icons">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
              <a href="#">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
