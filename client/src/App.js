import React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';

import {useRoutes} from "./routes";
import 'materialize-css';
import {useAuth} from "./hooks/auth.hook";
import {Authcontext} from "./context/Authcontext";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";

function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routers = useRoutes(isAuthenticated)

    if(!ready){
        return <Loader />
    }
  return (
      <Authcontext.Provider value={{token,login,logout,userId, isAuthenticated}}>
      <Router>
          {isAuthenticated && <Navbar />}
          <div className="row">

              <div className="col s12 m4 l3">
                  <div className='container'>
                  <p className="z-depth-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore odio praesentium sequi tenetur vel? Architecto beatae consectetur cupiditate delectus, dolorum ea eius et eveniet hic illo magnam mollitia nesciunt voluptatibus!50</p>
                  </div>
              </div>

              <div className="col s12 m8 l9">
                  <div className="container">
                      {routers}
                  </div>
              </div>

          </div>
      </Router>
      </Authcontext.Provider>
  );
}

export default App;
