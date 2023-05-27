import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Bookmark = ({ bookmarks }) => {
  const navigate = useNavigate();
  
  return (
    <div className="definition">
      <div className="overlay">
        <div className="pagebm">
          <div className="bookmark">
            <div className="list">
              <button onClick={() => navigate(-1)}>
                <img src="#" className="bmback" alt="back"/>
              </button>
              <div className="title">
                <h6>Bookmarks</h6>
              </div>
            </div>
              <div className="bmlist">
                {Object.keys(bookmarks).length ? (
                  Object.keys(bookmarks).map((b) => (
                    <button
                      className="listitem"
                      key={b}
                      onClick={() => navigate(`/search/${b}`)} // Updated onClick handler
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
    </div>
  );
};

export default Bookmark;
