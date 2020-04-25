import axios from 'axios';

const api = axios.create({baseURL: 'http://localhost:3001'});

function GetById(id) {
  return api.get(`/recipes/${id}`)
    .then(({data}) => data);
}

function GetAll() {
  return api.get('/recipes')
    .then(({data}) => data);
}

function DeleteById(id) {
  return api.delete(`/recipes/${id}`);
}

function Update(recipe) {
  return api.put(`/recipes/${recipe.id}`, recipe);
}

function Create(recipe) {
  return api.post('/recipes', recipe);
}

export default {
  Create,
  Update,
  GetById,
  GetAll,
  DeleteById,
};
