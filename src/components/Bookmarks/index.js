import { Link, useNavigate } from "react-router-dom";
import back from "../Assets/back.png";
import "./style.css";

const Bookmark = ({ bookmarks, isBookmarked }) => {
  const navigate = useNavigate();
  
  return (
    <div className="definition">
      <div className="overlay">
        <div className="pagebm">
          <div className="bookmark">
            <div className="list">
              <img src={back} className="bmback" alt="back" onClick={() => navigate(-1)} />
              <div className="title">
                <h2 className="titlebm">Bookmarks</h2>
              </div>
            </div>
            <div className="bmlist">
              {Object.keys(bookmarks).length ? (
                Object.keys(bookmarks).map((b) => (
                  <button
                    className="listitem"
                    key={b}
                    onClick={() => navigate(`/search/${b}`)}
                  >
                    <Link to={`/search/${b}`} className="bmword">
                      {b}
                    </Link>
                  </button>
                ))
              ) : (
                <p>No Bookmarks</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer class="footer-distributed">
        <div class="footer-left">
          <p class="footer-links">
            <Link className="tohome" to={"/"}>
              Home
            </Link>
            <Link className="toabout" to={"/aboutus"}>
              About Us
            </Link>
          </p>
          <p>UpToU Group &copy; 2023</p>
        </div>
      </footer>
      {isBookmarked && (
        <p style={{ textAlign: "center" }}>No synonyms/antonyms available.</p>
      )}
    </div>
  );
};

export default Bookmark;
