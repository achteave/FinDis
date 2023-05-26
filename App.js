import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, Grid, Container, Typography } from "@material-ui/core";
import theme from "./theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Bookmarks from "./components/Bookmarks";
import Definition from "./components/Definition";
import AboutUs from "./components/AboutUs";

const App = () => {
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || {}
  );

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (word, definitions) =>
    setBookmarks((oldBookmarks) => ({ ...oldBookmarks, [word]: definitions }));

  const removeBookmark = (word) =>
    setBookmarks((oldBookmarks) => {
      const temp = { ...oldBookmarks };
      delete temp[word];
      return temp;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/Bookmarks" element={<Bookmarks bookmarks={bookmarks} />}
              ></Route>
              <Route path="/search/:word" element={<Definition bookmarks={bookmarks} addBookmark={addBookmark} removeBookmark={removeBookmark} />}
              ></Route>
              <Route path="/aboutus" element={<AboutUs />}></Route>
            </Routes>
          </Router>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
