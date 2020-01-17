import React from 'react';
import mainPage from '../view/mainPage';
import showBlogPage from  '../view/blog/showBlog';
import personalPage from '../view/personal'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

export default()=>(
  <Router>
    <Switch>
      <Route exact path='/' component={mainPage} />
      <Route path='/mainPage' component={mainPage}/>
      <Route path = '/showBlog/:blogId' component={showBlogPage} />
      <Route path='/personalPage' component={personalPage}/>
      <Redirect from='/*' to='/err' />
    </Switch>
  </Router>)