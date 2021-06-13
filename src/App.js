import './App.scss';
import Info from './componentes/Info'
import CardList from './componentes/CardList'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Switch>
        <header className="App-header">
          <Route path='/' exact={true} component={CardList} />
          <Route path='/character/:id' component={Info} />
        </header>
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;