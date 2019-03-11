import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { DataProvider } from './models';
import * as serviceWorker from './serviceWorker';
import './styles/index.css';

ReactDOM.render(
  <DataProvider>
    <Router>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        action={[
          <Button variant='link' className='text-light' size='sm'>
            {'Dismiss'}
          </Button>
        ]}
        autoHideDuration={2000}
        maxSnack={1}>
        <App />
      </SnackbarProvider>
    </Router>
  </DataProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
