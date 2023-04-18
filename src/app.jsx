import React from 'react';

import { NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { MyList } from './myList/myList';
import { ItemCountTable } from './itemCountTable/itemCountTable';
import { About } from './about/about';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');

  // Asynchronously determine if the user is authenticated by calling the service
  const [authState, setAuthState] = React.useState(AuthState.Unknown);
  React.useEffect(() => {
    if (userName) {
      fetch(`/api/user/${userName}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((user) => {
          const state = user?.authenticated ? AuthState.Authenticated : AuthState.Unauthenticated;
          setAuthState(state);
        });
    } else {
      setAuthState(AuthState.Unauthenticated);
    }
  }, [userName]);

  return (
    <div className='body bg-dark-grey text-light'>
      <header className='container-fluid'>
        <nav className='navbar fixed-top navbar-dark'>
          <div className='navbar-brand'>
            Santa's List 🎅
          </div>
          <menu className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to=''>
                Login
              </NavLink>
            </li>
            {authState === AuthState.Authenticated && (
              <li className='nav-item'>
                <NavLink className='nav-link' to='myList'>
                  My List
                </NavLink>
              </li>
            )}
            {authState === AuthState.Authenticated && (
              <li className='nav-item'>
                <NavLink className='nav-link' to='itemCountTable'>
                  Nice List
                </NavLink>
              </li>
            )}
            <li className='nav-item'>
              <NavLink className='nav-link' to='about'>
                About
              </NavLink>
            </li>
          </menu>
        </nav>
      </header>

      <Routes>
        <Route
          path='/'
          element={
            <Login
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }}
            />
          }
          exact
        />
        <Route path='/myList' element={<MyList userName={userName} />} />
        <Route path='/itemCountTable' element={<ItemCountTable />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer className='bg-dark text-dark text-muted fixed-bottom'>
        <div className='container-fluid'>
          <span className='text-reset'>Author: Hayden Galloway</span>
          <a className='text-reset' href='https://github.com/haydengalloway/startup'>
            Hayden's GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
