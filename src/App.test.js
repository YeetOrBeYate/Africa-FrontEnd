
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { store } from './Redux/store';

import App from './App';

test('App component renders', () => {
  const history = createMemoryHistory();
  const yeet = render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );

  //getting the '/' of the url
  const currentUrl = history.entries[0].pathname;
  expect(currentUrl).toMatch('/');
});

test('login link sends user to login',()=>{
  const history = createMemoryHistory();
  const {getByText} = render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  );

  fireEvent.click(getByText(/Login/i));
  //getting the first parameter after the '/'
  const currentUrl = history.entries[1].pathname
  expect(currentUrl).toMatch('/login')
})

test('Home link sends user back to home',()=>{
  const history = createMemoryHistory();
  const {getByTestId} = render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  );

  fireEvent.click(getByTestId(/home/i));
  //getting the '/' of the url
  const currentUrl = history.entries[0].pathname
  expect(currentUrl).toMatch('/')
})

test('register link sends user to register',()=>{
  const history = createMemoryHistory();
  const {getByText} = render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  );

  fireEvent.click(getByText(/Register/i));
  //getting the first parameter after the '/'
  const currentUrl = history.entries[1].pathname
  expect(currentUrl).toMatch('/register')
})