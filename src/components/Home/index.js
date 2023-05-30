import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "./logo-0.png";
import bookmark from "../Assets/bmallwhite.png"
import search from "../Assets/search.png"
import "./style.css";

const Home = () => {
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedWord = word.trim().toLowerCase();
    if (!trimmedWord || trimmedWord.split(" ").length > 1) return;
    navigate(`/search/${trimmedWord}`);
  }

  return (
    <div className="container">
      <div className="overlay">
      <div className="items">
        <img src={logo} alt="LOGO" className="logo" />
        <p className="caption">
          Find a word's meaning, synonym, and antonym <br />all at once and save it for future reference
        </p>
          <form onSubmit={handleSubmit} className="form">
            <input
              value={word}
              onChange={(event) => setWord(event.target.value)}
              className="searchinput"
              disableUnderline
              placeholder="Search Word"
              autoComplete="off"
            ></input>
            <button type="submit" className="search__btn">
                <img src={search} className="search_icon" alt="seabutton"/>
            </button>
          </form>
        <Link to="/bookmarks">
            <img src={bookmark} className="bmicon" alt="bookmark" to="/bookmarks" component={Link}/>
          
        </Link><br />
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

export default Home;
