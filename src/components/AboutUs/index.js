import './style.css';
import franz from './assets/anz.png';
import azizah from './assets/jijeh.png';
import daffa from './assets/atap.jpg';
import victor from './assets/tor.jpg';
import back from '../Assets/back.png';
import { useNavigate, Link } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  return (
    <div className='about'>
      <div className='overlay'>
          <img src={back} alt='back' className='auback' onClick={() => navigate(-1)}/>
        <div className="row">
          <h1>Our Team</h1>
        </div>
        <div className="row">
          <div className="column">
            <div className="card">
              <div className="img-container">
                <img src={franz} alt="Team Member" />
              </div>
              <h3><b>M. Affransyah Bayulaksana</b></h3>
              <p>Leader</p>
              <p>00000077007</p>
              <p>GitHub: @achteave</p>
              <p></p>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="img-container">
                <img src={azizah} alt="Team Member" />
              </div>
              <h3><b>Nurul Azizah</b></h3>
              <p>Member</p>
              <p>00000076022</p>
              <p>GitHub: @butzh</p>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="img-container">
                <img src={victor} alt="Team Member" />
              </div>
              <h3><b>Victorich Alber</b>t</h3>
              <p>Member</p>
              <p>00000077525</p>
              <p>Github: @v_h_a_t</p>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="img-container">
                <img src={daffa} alt="Team Member" />
              </div>
              <h3><b>Daffa Althaf Maulana</b></h3>
              <p>Member</p>
              <p>00000076981</p>
              <p>GitHub: @Altap115</p>
            </div>
          </div>
        </div>
        <footer class="footer-distributed">

        <div class="footer-left">

          <p class="footer-links">
            <Link className="tohome" to={"/"}>Home</Link>
            <Link className="toabout" to={"/aboutus"}>About Us</Link>
          </p>
          <p>UpToU Group &copy; 2023</p>
        </div>

      </footer>
      </div>
    </div>
  );
};

export default App;
