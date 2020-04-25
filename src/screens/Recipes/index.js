import React from 'react';
import {Header} from 'semantic-ui-react';
import styled from 'styled-components';
import RecipesList from './RecipesList';

const Container = styled.div`
  width: 450px;
  margin: auto;
`;

function Recipes() {
  return (
    <Container>
      <Header as='h1'>All recipes</Header>
      <RecipesList/>
    </Container>
  );
}

export default Recipes;
