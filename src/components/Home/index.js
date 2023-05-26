import { Typography, FilledInput, IconButton, useTheme, Container, colors } from "@material-ui/core";
import { Search as SearchIcon, Bookmark as BookmarkIcon } from "@material-ui/icons";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "./book.png"
import "./style.css";

const Home = () => {
  const [word, setWord] = useState("");
  const theme = useTheme();
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
        <Typography className="caption">
          Find a word's meaning, synonym, and antonym all at once and save it for future reference
        </Typography>
          <form onSubmit={handleSubmit} className="form">
            <input
              value={word}
              onChange={(event) => setWord(event.target.value)}
              className="searchinput"
              disableUnderline
              placeholder="Search Word"
              autoComplete="off"
            ></input>
            <button class="search__btn" onClick={handleSearchClick}>
            <SearchIcon className="search_icon"/>
            </button>
          </form>
        <Link to="/bookmarks">
          <IconButton to="/bookmarks" component={Link}>
            <BookmarkIcon className="bmicon" />
          </IconButton>
        </Link><br />
        <p>UpToU Group - <Link className="toabout" to={"/aboutus"}>About Us</Link></p>
      </div>
    </div>
  );
};

export default Home;
