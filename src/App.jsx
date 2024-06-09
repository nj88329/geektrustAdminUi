import './App.css';
 import API from './API.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

function App() {


  return (
    <>
     
    <div>
      <Provider store={store}>
              <API />
       </Provider>
      </div>
    
    </>
  )
}

export default App
