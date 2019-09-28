import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import {PeoplePage} from '../pages';
import {PlanetsPage} from '../pages';
import {StarshipsPage} from '../pages';
import {LoginPage, SecretPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context';
import './app.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { StarshipDetails } from '../sw-components';



export default class App extends Component {

    state = {
     swapiService: new SwapiService(),
     isLoggedIn: false
  };
    onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
    };

      onServiceChange = () =>{
      //console.log("anus naus");
      this.setState(({swapiService})=>{
      const Service = swapiService instanceof SwapiService?
      DummySwapiService:SwapiService;
      console.log('done', Service.name);
      return {
        swapiService: new Service()
      };
      });
    };

  render() {
    const { isLoggedIn } = this.state;
      return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <Router>
          <div className="stardb-app">
            <Header 
            onServiceChange={this.onServiceChange}/>
            <RandomPlanet />
            <Switch>
          <Route path="/" render={()=><h2>Hey there! Welcome to SWDB</h2>} exact />
          <Route path="/people/:id?" component={PeoplePage} />
          <Route path="/planets" component={PlanetsPage} />
          <Route path="/starships" exact component={StarshipsPage} />
          <Route path="/starships/:id"
          render={({match})=>{
          const {id} = match.params;
          return <StarshipDetails itemId={id} />
          }} />
              <Route
                  path="/login"
                  render={() => (
                    <LoginPage
                      isLoggedIn={isLoggedIn}
                      onLogin={this.onLogin}/>
                  )}/>

                <Route
                  path="/secret"
                  render={() => (
                    <SecretPage isLoggedIn={isLoggedIn} />
                  )}/>

                <Route render={() => <h2>Page not found</h2>} />
              </Switch>
          </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
