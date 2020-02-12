import React from 'react';
import './fileUploadComponent.scss';
import excelImg from '../excelLogo.jpg';
import chartImg from '../charts.jpg';

class FileUploadComponent extends React.Component{

	render(){
		return(
			<div className='upload'>
			<h1 className='title'> Please upload a csv file and view dynamic charts</h1>
			  <div class="row">
    			<div class="col-md-6">
					<form className="md-form">
					  <div className="file">
					  <label className="custom-file-upload">
					    <div className="btn btn-primary new">
					      <span>Choose file</span>
					      <input type="file" />
					    </div>
					    </label>
					    <div className="file-path-wrapper">
					      <input className="file-path validate" type="text" placeholder="File name" />
					    </div>
					  </div>
					</form>
					<img className='img' src={excelImg}  height='250' width='300'/>
				</div>

				  <div class="col-md-6">
					<img className='img1' src={chartImg}  height='350' width='450'/>
				</div>
			</div>
			</div>
			)
	}
}

export default FileUploadComponent