import { useState, useEffect, Fragment } from "react";
import { Container, Typography, Box, IconButton, Divider, CircularProgress } from "@material-ui/core";
import { ArrowBack as BackIcon, BookmarkBorder as BookmarkIcon, Bookmark as BookmarkedIcon, PlayArrow as PlayIcon } from "@material-ui/icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Definition = ({ bookmarks, addBookmark, removeBookmark }) => {
  const { word } = useParams();
  const navigate = useNavigate();
  const [definitions, setDefinitions] = useState([]);
  const [meanings, setMeanings] = useState([]);
  const [exist, setExist] = useState(true);
  const [audio, setAudio] = useState(null);
  const [showMeanings, setShowMeanings] = useState(false);
  const [showSynonyms, setShowSynonyms] = useState(false);
  const [showAntonyms, setShowAntonyms] = useState(false);

  const isBookmarked = Object.keys(bookmarks).includes(word);

  const updateState = (data) => {
    setDefinitions(data);
    const phonetics = data[0].phonetics;
    if (!phonetics.length) return;
    const url = phonetics[0].audio.replace("//ssl", "https://ssl");
    setAudio(new Audio(url));
  };

  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        setDefinitions(resp.data);
        const phonetics = resp.data[0].phonetics;
        if (!phonetics.length) return;
        const url = phonetics[0].audio.replace("//ssl", "https://ssl");
        setAudio(new Audio(url));
      } catch (err) {
        setExist(false);
      }
    };

    if (!isBookmarked) fetchDefinition();
    else updateState(bookmarks[word]);
  }, []);

  if (!exist)
    return (
      <>
        <Typography>Word not found</Typography>
        <IconButton onClick={() => navigate(-1)}>Go Back</IconButton>
      </>
    );
  //if (!definitions.length) return <><div className="loading"><CircularProgress /></div></>

  return (
    <div className="definition">
      <div className="overlay">
      <Container className="defcontainer">
        <Container>
          <Container>
            <IconButton onClick={() => navigate(-1)}>
              <BackIcon className="defback" />
            </IconButton>
            <IconButton
              onClick={() =>
                isBookmarked ? removeBookmark(word) : addBookmark(word, definitions)
              }
            >
              {isBookmarked ? <BookmarkedIcon className="defbookm"/> : <BookmarkIcon className="defbookm"/>}
            </IconButton>
          </Container>
        </Container>
        <Container className="contents">
          <Container className="">
            <Typography variant="h4" className="word">
              {word}
              {audio && (
                <IconButton className="playaudio" onClick={() => audio.play()}>
                  <PlayIcon className="play" />
                </IconButton>
              )}
            </Typography>
          </Container>
        </Container>

        <Container className="details">
          <Container className="detail0">
            <Typography variant="h6" onClick={() => setShowMeanings(!showMeanings)}>
              Meanings  <span style={{ fontStyle: "italic", fontSize: "0.5em", marginLeft: "55px" }}>
                        {showMeanings ? "Hide" : "Show"}
                        </span>{" "}
            </Typography>
            {showMeanings && (
              <>
                {definitions.map((def, idx) => (
                  <Fragment key={idx}>
                    <Divider />
                    {def.meanings.map((meaning) => (
                      <Box key={meaning.partOfSpeech}>
                        <Typography variant="h6">{meaning.partOfSpeech}</Typography>
                        {meaning.definitions.map((definition, idx) => (
                          <Typography key={definition.definition}>
                            {idx + 1}. {definition.definition}
                          </Typography>
                        ))}
                      </Box>
                    ))}
                  </Fragment>
                ))}
              </>
            )}
          </Container>
          <Divider />

          <Container className="detail0">
            <Typography variant="h6" onClick={() => setShowSynonyms(!showSynonyms)}>
              Synonyms  <span style={{ fontStyle: "italic", fontSize: "0.5em", marginLeft: "50px" }}>
                        {showSynonyms ? "Hide" : "Show"}
                        </span>{" "}
            </Typography>
            {showSynonyms && (
              <>
                {definitions.map((def, idx) => (
                  <Fragment key={idx}>
                    {def.meanings.map((meaning) => (
                      <Box key={meaning.partOfSpeech}>
                        <Typography>
                          {meaning.synonyms.map((synonym, idx) => (
                            <Fragment key={idx}>
                              {synonym}
                              {idx !== meaning.synonyms.length - 1 && ", "}
                            </Fragment>
                          ))}
                        </Typography>
                      </Box>
                    ))}
                  </Fragment>
                ))}
              </>
            )}
          </Container>
          <Divider />

          <Container className="detail0">
            <Typography variant="h6" onClick={() => setShowAntonyms(!showAntonyms)}>
              Antonyms  <span style={{ fontStyle: "italic", fontSize: "0.5em", marginLeft: "50px" }}>
                        {showAntonyms ? "Hide" : "Show"}
                        </span>{" "}
            </Typography>
            {showAntonyms && (
              <>
                {definitions.map((def, idx) => (
                  <Fragment key={idx}>
                    {def.meanings.map((meaning) => (
                      <Box key={meaning.partOfSpeech}>
                        <Typography>
                          {meaning.antonyms.map((antonym, idx) => (
                            <Fragment key={idx}>
                              {antonym}
                              {idx !== meaning.antonyms.length - 1 && ", "}
                            </Fragment>
                          ))}
                        </Typography>
                      </Box>
                    ))}
                  </Fragment>
                ))}
              </>
            )}
          </Container>
        </Container>
      </Container>
      </div>
    </div>
  );
};

export default Definition;
