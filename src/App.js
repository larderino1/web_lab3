import React from 'react';
import {Link, Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Recipes from './screens/Recipes';
import styled from 'styled-components';
import Recipe from './screens/Recipe';
import Edit from './screens/Edit';
import Create from './screens/Create';

const Container = styled.div`
  width: 920px;
  margin: 40px auto;
  border: 1px dashed gray;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  border-bottom: 1px dashed gray;
`;

function App() {
  return (
    <Router>
      <Container>
        <HeaderContainer>
          <Link to="/recipes"><h3>HOME</h3></Link>
          <Link to="/create"><h3>CREATE</h3></Link>
        </HeaderContainer>
        <div style={{padding: 20}}>
          <Switch>
            <Route path="/recipes/:id"><Recipe /></Route>
            <Route path="/recipes"><Recipes /></Route>
            <Route path="/edit/:id"><Edit /></Route>
            <Route path="/create"><Create /></Route>
          </Switch>
        </div>
      </Container>
    </Router>
  );
}

export default App;
