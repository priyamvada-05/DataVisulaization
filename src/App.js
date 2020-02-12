import React from 'react';
import logo from './logo.svg';
import './App.css';
import BarGraphComponent from './barGraphComponent/barGraphComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from './header/headerComponent';
import BodyComponent from './body/bodyComponent';
import FileUploadComponent from './fileUpload/fileUploadComponent'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import InBuildDataset from './inBuildDataset/inBuildDataset';

class App extends React.Component {



render(){
  return (
    <div className="App">
      <BodyComponent />
      <FileUploadComponent />
      <InBuildDataset />
   </div>
  )
}
}

export default App;
