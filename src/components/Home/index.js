import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "./logo-0.png"
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

  function handleSearchClick() {
    const trimmedWord = word.trim().toLowerCase();
    if (!trimmedWord || trimmedWord.split(" ").length > 1) return;
    navigate(`/search/${trimmedWord}`);
  }

  return (
    <div className="container">
      <div className="items">
        <img src={logo} alt="LOGO" className="logo" />
        <p className="caption">
          Find a word's meaning, synonym, and antonym all at once and save it for future reference
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
                <img src="#" className="search_icon" />
            </button>
          </form>
        <Link to="/bookmarks">
          <button to="/bookmarks" component={Link}>
            <img src="" className="bmicon" />
          </button>
        </Link><br />
        <p>UpToU Group - <Link className="toabout" to={"/aboutus"}>About Us</Link></p>
      </div>
    </div>
  );
};

export default Home;
