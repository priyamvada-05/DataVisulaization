import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { BrowserRouter } from 'react-router-dom';
import PageComponent from './page/pageComponent'
import { PersistGate} from 'redux-persist/integration/react';
import { Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import ReactImg from './assets/landing.jpg';


class App extends React.Component {



render(){
  return (
  <Provider  store={store}>
    <BrowserRouter>
	<PersistGate persistor={persistor}>
		<div className='new' style={{
			backgroundImage: `url(${ReactImg})`
		}} >
      <PageComponent />
		</div>
    </PersistGate>
   </BrowserRouter>
  </Provider>
  )
}
}

export default App;
