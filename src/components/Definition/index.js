import { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import axios from "axios";
import playau from "../Assets/play.png"
import bookmark from "../Assets/bmoutwhite.png";
import bookmarked from "../Assets/bmallwhite.png";
import back from "../Assets/back.png";
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
  const [hasSynonyms, setHasSynonyms] = useState(true);
  const [hasAntonyms, setHasAntonyms] = useState(true);
  

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
    
        // Check if synonyms and antonyms are available
        const synonymsAvailable = resp.data.some(def => def.meanings.some(meaning => meaning.synonyms.length > 0));
        const antonymsAvailable = resp.data.some(def => def.meanings.some(meaning => meaning.antonyms.length > 0));

        setHasSynonyms(synonymsAvailable);
        setHasAntonyms(antonymsAvailable);
      } catch (err) {
        setExist(false);
      }
    };
    
    

    if (!isBookmarked) fetchDefinition();
    else updateState(bookmarks[word]);
  }, [bookmarks, isBookmarked, word]);

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
                    <img src={back} className="defback" alt="back" onClick={() => navigate(-1)}/>
                </div>
              </div>
            </div>
            <div className="contents">
                <div className="">
                  <h2 className="word">
                    {word}
                    {audio ? (
                    <img src={playau} className="play" alt="playau" onClick={() => {
                      if (audio.src) {
                        audio.play();
                      } else {
                        console.warn("There's no audio pronunciation available for this word.");
                      }
                    }} />
                  ) : null
                  }
                    <img src={isBookmarked ? bookmarked : bookmark} className="defbookm" alt="bookmark" onClick={() =>
                          isBookmarked ? removeBookmark(word) : addBookmark(word, definitions)
                        }
                      />

                  </h2>
                </div>
              </div>
      
            <div className="details">
              <div className="detail0">
                <h3 onClick={() => setShowMeanings(!showMeanings)}>
                  Meanings{" "}
                  <span style={{ fontStyle: "italic", fontSize: "0.5em", marginLeft: "55px" }}>
                    {showMeanings ? "Hide" : "Show"}
                  </span>{" "}
                </h3>
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
                  Synonyms{" "}
                  <span style={{ fontStyle: "italic", fontSize: "0.5em", marginLeft: "50px" }}>
                    {showSynonyms ? "Hide" : (hasSynonyms || isBookmarked) ? "Show" : "Unavailable"}
                  </span>{" "}
                </h3>
                {showSynonyms && hasSynonyms && (
                  <>
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
                            </div>
                          </div>
                        ))}
                      </Fragment>
                    ))}
                  </>
                )}
                {(isBookmarked && !hasSynonyms) && (
                  <p>No synonyms available.</p>
                )}
              </div>
              <Divider />

              <div className="detail0">
                <h3 onClick={() => setShowAntonyms(!showAntonyms)}>
                  Antonyms{" "}
                  <span style={{ fontStyle: "italic", fontSize: "0.5em", marginLeft: "50px" }}>
                    {showAntonyms ? "Hide" : (hasAntonyms || isBookmarked) ? "Show" : "Unavailable"}
                  </span>{" "}
                </h3>
                {showAntonyms && hasAntonyms && (
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
                {(isBookmarked && !hasAntonyms) && (
                  <p>No antonyms available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
      
};

export default Definition;
