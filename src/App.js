import React from 'react';
import './App.css';

// import ChoosingPage from './components/ChoosingPage/ChoosingPage';
import MainPage from './components/MainPage/MainPage';
import { BrowserRouter as Router,
         Switch,
         Route,
         Redirect,
         useLocation } from 'react-router-dom';
import ChoosingPageContainer from './components/ChoosingPage/ChoosingPageContainer';
import ResultPageContainer from './components/ResultPage/ResultPageContainer';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/start">
          <MainPage />
        </Route>
        <Route path="/candidates">
          <ChoosingPageContainer/>
        </Route>
        <Route path="/results">
          <ResultPageContainer/>
        </Route>
        <Route path="/">
          <Redirect to="/start"/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
