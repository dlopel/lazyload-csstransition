import "./styles.css";
import { CSSTransition } from "react-transition-group";
import React from "react";
import LazyLoad, { forceCheck } from "react-lazyload";

export default function App() {
  const [characters, setCharacters] = React.useState([]);

  const items = characters.map((character, idx) => (
    <LazyLoad key={idx} once throttle={300} height={300}>
      <FadeIn>
        <Character
          img={
            character.thumbnail.path +
            "/standard_xlarge." +
            character.thumbnail.extension
          }
          name={character.name}
        />
      </FadeIn>
    </LazyLoad>
  ));

  React.useEffect(() => {
    fetch(
      "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=e8aa37188987325dca0c570b01707e2c&hash=d784691874995aae3b9fb373b5a4d1da&limit=50"
    )
      .then((response) => response.json())
      .then((data) => setCharacters(data.data.results));
  }, []);

  return (
    <div className="App">
      <h1>My Hero's</h1>
      <div>{characters.length ? items : null}</div>
    </div>
  );
}

function FadeIn({ children }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <CSSTransition in={visible} classNames="item" timeout={500} unmountOnExit>
      {children}
    </CSSTransition>
  );
}

function Character({ img, name }) {
  return (
    <div style={{ height: "300px", width: "200px", backgroundColor: "purple" }}>
      <h3>{name}</h3>
      <img height="200" width="200" src={img} />
    </div>
  );
}
