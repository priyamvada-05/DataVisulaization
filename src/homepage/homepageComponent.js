import React from 'react';
import './homepageComponent.scss';
import HeaderComponent from '../header/headerComponent';
import BodyComponent from '../body/bodyComponent';
import FileUploadComponent from '../fileUpload/fileUploadComponent'

class HomepageComponent extends React.Component{

	render(){
		return(
			<div className='homepage'>
				<BodyComponent />
				<FileUploadComponent />
			</div>
			)
	}
}

export default HomepageComponent