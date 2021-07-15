import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App'
import reducers from './reducers';

// random tests
test('renders Brand Name', () => {
  render(<App />)
  const brandName = screen.getByText(/Kraftiworks/i)
  expect(brandName).toBeInTheDocument()
})
test('renders Service Nav', () => {
  render(<App />)
  const serviceNav = screen.getByText(/Service/i)
  expect(serviceNav).toBeInTheDocument()
})
test('renders Talents Nav', () => {
  render(<App />)
  const talentsNav = screen.getByText(/Talents/i)
  expect(talentsNav).toBeInTheDocument()
})
test('renders Join Us Nav', () => {
  render(<App />)
  const joinUsNav = screen.getByText(/Join Us/i)
  expect(joinUsNav).toBeInTheDocument()
})

// test redux
test('reducers', () => {
  let state;
  state = reducers({alertReducer:[],authReducer:{token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBmMDZlMjc5MDU1OWYxZDY4ODVjZTY2In0sImlhdCI6MTYyNjM2OTU3NSwiZXhwIjoxNjI5OTY5NTc1fQ.XT96h3O4j3jp1A8YKS-6t8Z5QxXP7TJzwUkjPk0-A78',authenticated:null,loading:true,user:null}}, {type:'AUTH_SUCC',payload:{_id:'60f06e2790559f1d6885ce66',email:'user1@mail.com',account:'technician',avatar:'//www.gravatar.com/avatar/73dbb4ed51752f4d60afaeec8c9733e8?s=200&r=pg&d=mm',createdAt:'2021-07-15T17:19:35.846Z',updatedAt:'2021-07-15T17:19:35.846Z',__v:0}});
  expect(state).toEqual({alertReducer:[],authReducer:{token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBmMDZlMjc5MDU1OWYxZDY4ODVjZTY2In0sImlhdCI6MTYyNjM2OTU3NSwiZXhwIjoxNjI5OTY5NTc1fQ.XT96h3O4j3jp1A8YKS-6t8Z5QxXP7TJzwUkjPk0-A78',authenticated:true,loading:false,user:{_id:'60f06e2790559f1d6885ce66',email:'user1@mail.com',account:'technician',avatar:'//www.gravatar.com/avatar/73dbb4ed51752f4d60afaeec8c9733e8?s=200&r=pg&d=mm',createdAt:'2021-07-15T17:19:35.846Z',updatedAt:'2021-07-15T17:19:35.846Z',__v:0}}});
});
test('empty input', () => {
  let state;
  state = reducers({alertReducer:[],authReducer:{token:'',authenticated:null,loading:true,user:null}}, {type:'AUTH_FAIL'});
  expect(state).toEqual({alertReducer:[],authReducer:{token:null,authenticated:false,loading:false,user:null}});
});
