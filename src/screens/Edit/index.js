import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import api from '../../api';
import {Button, Form, Header, Loader} from 'semantic-ui-react';
import {useForm} from 'react-hook-form';

function Edit() {
  const [recipe, receiveRecipe] = useState(null);
  const id = useLocation().pathname.substring('/edit/'.length);
  const history = useHistory();

  useEffect(() => { api.GetById(id).then(receiveRecipe); }, []);

  const {register, handleSubmit} = useForm();

  if(!recipe) {
    return <Loader active inline/>;
  }

  const onSubmit = (data) => {
    api.Update({...recipe, ...data});
    history.push('/recipes');
  };

  return (
    <div>
      <Header as="h1" color="green">Edit</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <h2>Name</h2>
          <input name="name" defaultValue={recipe.name} ref={register}/>
        </Form.Field>
        <Form.Field>
          <h2>Category</h2>
          <input name="category" defaultValue={recipe.category} ref={register}/>
        </Form.Field>
        <Form.Field>
          <h2>Description</h2>
          <input name="description" defaultValue={recipe.description} ref={register}/>
        </Form.Field>
        <Form.Field>
          <h2>Long Description</h2>
          <textarea name="description_long" defaultValue={recipe.description_long} ref={register}/>
        </Form.Field>
        <Button primary type='submit'>Submit</Button>
      </Form>
    </div>
  );
}

export default Edit;
