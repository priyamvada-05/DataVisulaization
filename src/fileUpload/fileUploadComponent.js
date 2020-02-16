import React from 'react';
import './fileUploadComponent.scss';
import excelImg from '../excelLogo.jpg';
import chartImg from '../charts.jpg';
import { withRouter} from 'react-router-dom';
import { connect} from 'react-redux';
import { startGettingHeader} from '../redux/data/inBuildDataAction';

class FileUploadComponent extends React.Component{

	constructor(props){
		super(props);
	}

	handleInBuildDataset=(event)=>{
		this.props.startLoadingHeader();
		this.props.history.push('/inbuildDataset');
	}

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
					<div className="vl"></div>
				</div>

				  <div class="col-md-6">
				  	<div className='inbuild'>

				  		<h2 className='subTitle'>Or use the Inbuild Dataset</h2>
					  	<button className="btn btn-primary" onClick={this.handleInBuildDataset}>Start Analysis</button>
						<img className='img1' src={chartImg}  height='350' width='500'/>
					</div>
				</div>
			</div>
			</div>
			)
	}
}

const mapDispatchToProps=(dispatch)=>{
	return({
		startLoadingHeader: ()=>dispatch(startGettingHeader())
	})
}

export default withRouter(connect(null, mapDispatchToProps)(FileUploadComponent))