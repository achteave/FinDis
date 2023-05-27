import { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import axios from "axios";
import "./style.css";

const Definition = ({ bookmarks, addBookmark, removeBookmark }) => {
  const { word } = useParams();
  const navigate = useNavigate();
  const [definitions, setDefinitions] = useState([]);
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
      <div className="not-found">
        <h2>Word not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </>
    );
  
    return (
        <div className="definition">
          <div className="overlay">
            <div className="defcontainer">
              <div>
                <div>
                  <button onClick={() => navigate(-1)}>
                    <img src="#" className="defback" alt="back" />
                  </button>
                </div>
              </div>
              <div className="contents">
                <div className="">
                  <h4 className="word">
                    {word}
                    {audio && (
                      <button className="playaudio" onClick={() => audio.play()}>
                        <img src="" className="play" alt="playau"/>
                      </button>
                    )}
                    <button
                      onClick={() =>
                        isBookmarked ? removeBookmark(word) : addBookmark(word, definitions)
                      }
                    >
                      {isBookmarked ? <img src="#" className="defbookm" alt="bookmark"/> : <img src="" className="defbookm" alt="bookmark"/>}
                    </button>
                  </h4>
                </div>
              </div>
            </div>
      
            <div className="details">
              <div className="detail0">
                <h2 onClick={() => setShowMeanings(!showMeanings)}>
                  Meanings{" "}
                  <span style={{ fontStyle: "italic", fontSize: "0.5em", marginLeft: "55px" }}>
                    {showMeanings ? "Hide" : "Show"}
                  </span>{" "}
                </h2>
                {showMeanings && (
                  <>
                    {definitions.map((def, idx) => (
                      <Fragment key={idx}>
                        <br />
                        <Divider />
                        {def.meanings.map((meaning) => (
                          <div key={meaning.partOfSpeech}>
                            <h4>{meaning.partOfSpeech}</h4>
                            {meaning.definitions.map((definition, idx) => (
                              <p key={definition.definition}>
                                {idx + 1}. {definition.definition}
                              </p>
                            ))} <br />
                          </div>
                        ))}
                      </Fragment>
                    ))}
                  </>
                )}
              </div>
              <Divider />
            
                <div className="detail0">
                <h3 onClick={() => setShowSynonyms(!showSynonyms)}>
                    Synonyms  <span style={{ fontStyle: "italic", fontSize: "0.5em", marginLeft: "50px" }}>
                            {showSynonyms ? "Hide" : "Show"}
                            </span>{" "}
                </h3>
                {showSynonyms && (
                    <>
                    <br />
                    {definitions.map((def, idx) => (
                        <Fragment key={idx}>
                        {def.meanings.map((meaning) => (
                            <div key={meaning.partOfSpeech}>
                            <div>
                                {meaning.synonyms.map((synonym, idx) => (
                                <Fragment key={idx}>
                                    {synonym}
                                    {idx !== meaning.synonyms.length - 1 && ", "}
                                </Fragment>
                                ))}
                            </div> <br />
                            </div>
                        ))}
                        </Fragment>
                    ))}
                    </>
                )}
                </div>
                <Divider />

                <div className="detail0">
                <h3 onClick={() => setShowAntonyms(!showAntonyms)}>
                    Antonyms  <span style={{ fontStyle: "italic", fontSize: "0.5em", marginLeft: "50px" }}>
                            {showAntonyms ? "Hide" : "Show"}
                            </span>{" "}
                </h3>
                {showAntonyms && (
                    <>
                    {definitions.map((def, idx) => (
                        <Fragment key={idx}>
                        {def.meanings.map((meaning) => (
                            <div key={meaning.partOfSpeech}>
                            <p>
                                {meaning.antonyms.map((antonym, idx) => (
                                <Fragment key={idx}>
                                    {antonym}
                                    {idx !== meaning.antonyms.length - 1 && ", "}
                                </Fragment>
                                ))}
                            </p>
                            </div>
                        ))}
                        </Fragment>
                    ))}
                    </>
                )}
                </div>
            </div>
          </div>
        </div>
      );
      
};

export default Definition;
