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
          <div className="container">
              {routers}
          </div>
      </Router>
      </Authcontext.Provider>
  );
}

export default App;
