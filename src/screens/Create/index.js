import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Form, Header} from 'semantic-ui-react';
import {useForm} from 'react-hook-form';
import moment from 'moment';
import api from '../../api';

function Create() {
  const history = useHistory();
  const {register, handleSubmit} = useForm();

  const onCancel = () => history.push('/recipes');
  const onSubmit = (data) => {
    api.Create({...data, createDate: moment().format('DD:MM:YY')});
    history.push('/recipes');
  };

  return (
    <div>
      <Header as="h1" color="green">Create</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <h3>Name</h3>
          <input name="name" ref={register}/>
        </Form.Field>
        <Form.Field>
          <h3>Category</h3>
          <input name="category" ref={register}/>
        </Form.Field>
        <Form.Field>
          <h3 >Description</h3>
          <input name="description" ref={register}/>
        </Form.Field>
        <Form.Field>
          <h3 color="grey">Long Description</h3>
          <textarea name="description_long" ref={register}/>
        </Form.Field>
        <div>
          <Button color="green" type='submit'>Submit</Button>
          <Button color="red" onClick={onCancel}>Back to list</Button>
        </div>
      </Form>
    </div>
  );
}

export default Create;
