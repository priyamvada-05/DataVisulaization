import React from 'react';
import './headerComponent.scss';

const HeaderComponent=()=>{

	return(
		<div className='header'>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse new" id="navbarTogglerDemo01">
		    <a class="navbar-brand" href="#">Hidden brand</a>

		    <div className='new1'>
		    <ul class="navbar-nav">
		      <li class="nav-item active">
		        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Link</a>
		      </li>
		    </ul>
		    </div>
		  </div>
		</nav>
		</div>
		)
}

export default HeaderComponent