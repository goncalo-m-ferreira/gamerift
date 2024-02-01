import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../App';
import './main.css';
import Header from './Header';
import SideMenu from '../components/SideMenu';
import Home from './Home';
import Categories from './Categories';
import MyLibrary from './MyLibrary';
import Bag from './Bag';
import Register from '../components/register';
import Login from '../components/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Main() {
  const { library, bag } = useContext(AppContext);
  const [active, setActive] = useState(false);
  const [games, setGames] = useState([]);

  const homeRef = useRef();
  const categoriesRef = useRef();
  const libraryRef = useRef();
  const bagRef = useRef();

  const sections = [
    {
      name: 'home',
      ref: homeRef,
      active: true,
    },
    {
      name: 'categories',
      ref: categoriesRef,
      active: false,
    },
    {
      name: 'library',
      ref: libraryRef,
      active: false,
    },
    {
      name: 'bag',
      ref: bagRef,
      active: false,
    },
  ];

  const handleToggleActive = () => {
    setActive(!active);
  };

  const handleSectionActive = target => {
    sections.map(section => {
      section.ref.current.classList.remove('active');
      if (section.ref.current.id === target) {
        section.ref.current.classList.add('active');
      }
      return section;
    });
  };

  const fetchData = () => {
    fetch('http://localhost:3000/api/gamesData.json')
      .then(res => res.json())
      .then(data => {
        setGames(data);
      })
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
    <main>
      <Switch>
        <Route path="/" exact>
          <SideMenu active={active} sectionActive={handleSectionActive} />
          <div className={`banner ${active ? 'active' : undefined}`}>
            <Header toggleActive={handleToggleActive} />
            <div className="contain-fluid">
              {games && games.length > 0 && (
                <Home games={games} reference={homeRef} />
              )}
              {games && games.length > 0 && (
                <Categories games={games} reference={categoriesRef} />
              )}
              {games && games.length > 0 && (
                <MyLibrary games={library} reference={libraryRef} />
              )}
              {games && games.length > 0 && <Bag games={bag} reference={bagRef} />}
            </div>
          </div>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
            <Login />
          </Route>
      </Switch>
    </main>
  </Router>
  );
}

export default Main;
