import { IconButton, Typography, Box } from "@material-ui/core";
import { ArrowBack as BackIcon } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Bookmark = ({ bookmarks }) => {
  const navigate = useNavigate();
  
  return (
    <div className="definition">
      <div className="overlay">
        <div className="pagebm">
          <div className="bookmark">
              <IconButton onClick={() => navigate(-1)}>
                <BackIcon className="bmback" />
              </IconButton>
              <div className="title">
                <Typography variant="h6">Bookmarks</Typography>
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
                  <Typography>No Bookmarks</Typography>
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
