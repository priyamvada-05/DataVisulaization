import React from 'react';
import './pageComponent.scss';
import HomepageComponent from '../homepage/homepageComponent';
import InBuildDataset from '../inBuildDataset/inBuildDataset';
import { Route, Switch, Redirect } from 'react-router-dom';


class PageComponent extends React.Component {



render(){
  return (
      <Switch>
        <Route 
        exact={true} 
        path='/' 
        component={HomepageComponent}>
        </Route>
        
  		  <Route 
  			exact={true} 
  			path='/inbuildDataset' 
  			component={InBuildDataset}>
  		  </Route>
	  </Switch>
  )
}
}

export default PageComponent;
