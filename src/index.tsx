// PLUGINS IMPORTS //
import React from 'react'
import ReactDOM from 'react-dom'

// COMPONENTS IMPORTS //
import App from './App'

// EXTRA IMPORTS //

// REDUX IMPORTS //
import { Provider } from 'react-redux'
import { store } from 'Redux/store'

/////////////////////////////////////////////////////////////////////////////

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
