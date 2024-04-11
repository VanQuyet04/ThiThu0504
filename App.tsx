import React from 'react'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import XeMayScreen from './src/screens/XeMayScreen'


const App = () => {
  return (
    <Provider store={store} >
      <XeMayScreen />
      
    </Provider>
  )
}


export default App
