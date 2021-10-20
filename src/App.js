import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';
import Home from './components/pages/Home'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject'

import Container from './components/layout/Container'
function App() {
  return (
    <Router>
      <div>
       <Link to='/'>HOME</Link> 
       <Link to='/contact' >CONTACT</Link> 
       <Link to='/company' >COMPANY</Link> 
       <Link to='/newproject' >NEW PROJECT</Link> 
      </div>
    <Container customClass='min_height'>
      <Switch>
        <Route exact path="/"> <Home /> </Route>
        <Route exact path="/company"> <Company /> </Route>
        <Route exact path="/contact"> <Contact /> </Route>
        <Route exact path="/newproject"> <NewProject /> </Route>
      </Switch>
     </Container>
      <footer>Footer Of Page</footer>
    </Router>
  );
}

export default App;
