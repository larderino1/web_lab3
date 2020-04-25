import React from 'react';
import {Button, Item} from 'semantic-ui-react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api';

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 25px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: right;
  justify-content: space-between;
  padding-right: 15px;
  
  :hover {
    text-decoration: underline;
  }
`;

function Recipe({id, name, createDate}) {
  const history = useHistory();

  const onEdit = () => history.push(`/edit/${id}`);
  const onDelete = () => {
    api.DeleteById(id);
    history.push('/recipes');
  };

  return (
    <Item style={{cursor: 'pointer'}} >
      <Content onClick={() => history.push(`/recipes/${id}`)}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Item.Content verticalAlign='middle'><a>{name}</a></Item.Content>
        </div>
        <Item.Meta>{createDate}</Item.Meta>
      </Content>
      <ButtonsContainer>
        <Button color="blue" onClick={onEdit}>Edit</Button>
        <Button color="red" onClick={onDelete}>Delete</Button>
      </ButtonsContainer>
    </Item>
  );
}

export default Recipe;
