import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {Dropdown, Header, Input, Item, Loader} from 'semantic-ui-react';
import api from '../../api';
import Recipe from './Recipe';

const sorters = {
  name: (r1, r2) => r1.name.localeCompare(r2.name),
  createDate: (r1, r2) => moment(r1.createDate, 'DD-MM-YY')
    .isAfter(moment(r2.createDate, 'DD-MM-YY')) ? 1 : -1,
};

const sortersOptions = [
  {key: 'name', value: 'name', text: 'By Name'},
  {key: 'createDate', value: 'createDate', text: 'By Date'},
];

const getCategoriesOptions = (recipes) => ['', ...new Set(recipes.map(recipe => recipe.category))]
  .map(category => ({key: Math.random(), value: category, text: category || 'don\'t use'}));

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  
  & > * {
    padding-right: 100px;
  }
`;

const RecipesList = () => {
  const [recipes, receiveRecipes] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [category, setCategory] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    setCategory(localStorage.getItem('category'));
    api.GetAll().then(receiveRecipes);
  }, []);

  if (!recipes) {
    return <Loader active inline/>;
  }

  const onCatecoryChange = (e, {value}) => {
    window.localStorage.setItem('category', value);
    setCategory(value);
  };

  const renderedRecipes = recipes.sort(sorters[sortBy])
    .filter(recipe => recipe.name.toLowerCase().startsWith(name.toLowerCase()))
    .filter(recipe => !category || recipe.category === category)
    .map(recipe => <Recipe key={recipe.id} {...recipe} />);

  return (
    <div>
      <FiltersContainer>
        <Dropdown options={sortersOptions} value={sortBy} onChange={(e, {value}) => setSortBy(value)}/>
        <Dropdown
          options={getCategoriesOptions(recipes)}
          placeholder="category" value={category}
          onChange={onCatecoryChange}
        />
        <Input value={name} placeholder="Search" onChange={(e) => setName(e.target.value)}/>
      </FiltersContainer>
      {renderedRecipes.length ? <Item.Group>{renderedRecipes}</Item.Group> : <Header as="h4">no recipes</Header>}
    </div>
  );
};

export default RecipesList;
