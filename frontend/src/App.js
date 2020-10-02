import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import 'antd/dist/antd.css';
import { Router } from "@reach/router"
import Layout from './containers/Layout';
import PostList from './containers/PostList';
import PostCreate from './containers/PostCreate';
import PostDetail from './containers/PostDetail';
import PostUpdate from './containers/PostUpdate';
import Login from './containers/Login'
import Signup from './containers/Signup';
import AuthContext from './context/AuthContext'
import { authenticationService } from './services';
import "./styles.css"
import { createBrowserHistory } from 'history';

const history = createBrowserHistory()

function App() {

  const [auth, setAuth] = useState(authenticationService.isAuthenticated);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Layout>
        <Router history={history}>
          <PostList exact path='/' />
          <PostCreate path='/create' />
          <PostUpdate path='/posts/:postSlug/update' />
          <PostDetail exact path='/posts/:postSlug' />
          <Login path='/login' />
          <Signup path='/signup' />
        </Router>
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;
