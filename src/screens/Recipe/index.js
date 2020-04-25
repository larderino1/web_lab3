import React, {useEffect, useState} from 'react';
import {Button, Header, Image, Loader} from 'semantic-ui-react';
import {useHistory, useLocation} from 'react-router-dom';
import api from '../../api';

function Recipe() {
  const [recipe, receiveRecipe] = useState(null);
  const id = useLocation().pathname.substring('/recipes/'.length);
  const history = useHistory();

  useEffect(() => { api.GetById(id).then(receiveRecipe); }, []);

  if(!recipe) {
    return <Loader active inline/>;
  }

  const onEdit = () => history.push(`/edit/${id}`);
  const onDelete = () => {
    api.DeleteById(id);
    history.push('/recipes');
  };

  return (
    <div>
      <h1 color="black">{recipe.name}</h1>
      <h3>Short description: {recipe.description}</h3>
      <p>{recipe.longDesc}</p>
      <h3 color="red">Date created: {recipe.createDate}</h3>
        <div>
            <Button primary onClick={onEdit}>Edit</Button>
            <Button color="blue" onClick={onDelete}>Delete</Button>
        </div>
    </div>
  );
}

export default Recipe;
