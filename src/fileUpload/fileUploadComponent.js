import React from 'react';
import './fileUploadComponent.scss';
import excelImg from '../assets/excelnewd.png';
import chartImg from '../assets/charts.jpg';
import { withRouter} from 'react-router-dom';
import { connect} from 'react-redux';
import { startGettingHeader, startUploadingData, updateDatasetName} from '../redux/data/inBuildDataAction';
import ParsePower from 'papaparse';
import lineChart from '../assets/lineChart.png';
import Typewriter from 'typewriter-effect';
import tweetR from '../assets/tweets.png';
import tweetL from '../assets/tweet1.png';
import ScrollAnimation from 'react-animate-on-scroll';

class FileUploadComponent extends React.Component{

	constructor(props){
		super(props);
		this.inputRef = React.createRef();
		this.state={
			placeholder: "File name",
			file:null,
			status: false,
			onHover:false,
			uploaded:false,
			fileCheck:true,
			parsed:false
		}
}

	handleInBuildDatasetNonGeo=(event)=>{
		this.props.updateDatasetNameViaRedux('data.csv')
		this.props.startLoadingHeader({data: 'data.csv'});
		this.props.history.push('/inbuildDataset');
	}

	handleInBuildDatasetGeo=(event)=>{
		this.props.updateDatasetNameViaRedux('data_demonew.csv')
		this.props.startLoadingHeader({data: 'data_demonew.csv'});
		this.props.history.push('/inbuildDataset');
	}

	handleInBuildDataset1=(event)=>{
		this.props.updateDatasetNameViaRedux(this.state.placeholder)
		this.props.startLoadingHeader({data: this.state.placeholder});
		this.props.history.push('/inbuildDataset');
	}

	submitChange=(event)=>{
		event.preventDefault()
		console.log('complete file');
		console.log(this.state.file)
		const name= this.state.placeholder;
		const file= this.state.file
		if(file){
		this.props.startUploadingDataViaRedux({name, file})
	}
		
	}

	onCompleteParse=(results)=>{
		const file= results.data;
				const newFile=file.map((item)=>{
					const key= Object.keys(item)
					const value= Object.values(item)
					const newKeys= key.map((s)=> {

						if(typeof(s) === "string")
						{
							return s.replace(/\s/g, "_")
						}
						else {
							return s
						}
					})
						
					const newValue= value.map((s)=> {
						if(typeof(s) === "string")
						{
							const newS= s.replace(/\s/g, "");
							const NumS= Number(newS)
							const check=String(NumS)
							if(check !== 'NaN' && NumS !== NaN){
								return NumS
							}
							else{
								return newS
							}
						}
						else {
							return s
						}
					})
					this.setState({
						parsed:true
					})
					return Object.fromEntries(newKeys.map((value, index)=> [newKeys[index], newValue[index]]))
		
				})
				//console.log(newFile)
				this.setState({
					file: newFile,
					status: true
				})

	}

	inputChange=(event)=>{

		this.setState({
			placeholder:event.target.files[0].name
		})
		var s= event.target.files[0].name;
		if(s.substr(s.length - 4) !== '.csv'){
			this.setState({
				fileCheck:false
			})
		}


		ParsePower.parse(event.target.files[0], {
			header:true,
			dynamicTyping: true,
			complete: (results)=>{this.onCompleteParse(results)}
		});
		console.log('status', this.state.fileCheck)
		console.log(this.state.parsed)
		console.log()
	}

	OnChangeIn= (event)=>{
		this.setState({
			onHover: true
		})
	}

	OnChangeOut= (event)=>{
		setTimeout((()=>{
			this.setState({
				onHover:false
			})
		}),3000)

	}

	render(){
		return(
			<div className='upload'>
			  <div class="row row1">
			  <div class="col-md-6 info">
			  <ScrollAnimation animateIn='zoomInLeft' animateOut='zoomOutLeft'>
    			
    				<div className='title1'>
    					<h1  className='text'> <span className='sub'>Upload a</span>	<Typewriter onInit={(typewriter) => {
						    typewriter.typeString('')
						      .callFunction(() => {
						        
						      })
						      .pauseFor(500)
						      .deleteAll()
						      .callFunction(() => {  })
						      .start()
						  }}

						    options={{
							    strings: ['CSV'],
							    autoStart: true,
							    loop: true,
							  }}

							 style={{
							 	color: '#0cf'
							 }}>
  					</Typewriter><span className='sub'>file and get all<span className='sub1'> basic</span></span> <span className='sub'>visualisation</span></h1>
    				</div>
					<div className="vl"></div>
					</ScrollAnimation>
				</div>
				

				  <div class="col-md-6 form">
				  <ScrollAnimation animateIn='zoomInRight' animateOut='zoomOutRight'>
					<form onSubmit={this.submitChange} className="md-form">
					  <div className="file">
					  <label className="custom-file-upload">
					    <div className="btn btn-primary">
					      <span>Choose file</span>
					      <input id='file' onChange={this.inputChange} type="file" />
					    </div>
					    </label>
					    <div className="file-path-wrapper">
					      <input className="file-path validate" type="text" placeholder={this.state.placeholder} />
					    </div>
					<button className="btn btn-primary new" type='submit' disabled={!this.state.fileCheck} name='submit'>Upload</button>
					</div>
					<button className="btn btn-primary" disabled={!this.props.loaded} onClick={this.handleInBuildDataset1}>Start Analysis</button>
					{!this.state.fileCheck?
						<p className='mesg'>Please upload a .CSV file</p>
						:null
					}
					</form>
						<div className='imgC'>
    					<img className='img1' src={excelImg}  height='150' width='250' onMouseOver={this.OnChangeIn} onMouseOut={this.OnChangeOut}/>
    					{this.state.onHover?
						(<ScrollAnimation animateIn='flipInY' animateOut='flipOutY'>
							<div className='side'>
    						<p># Dont't worry, we'll do filtering of empty space </p>
    						<p># Accept the file size upto 10 MB</p>
    						<p># Make sure the file have headers</p>
    					</div>
    					</ScrollAnimation>)
    					: null
    					}
    					</div>
    					</ScrollAnimation>

				</div>
			</div>

			 <div class="row row2">
    			<div class="col-md-6 info">
    			 <ScrollAnimation animateIn='zoomInLeft' animateOut='bounceOutLeft'>
    				<div className='title1'>
    					<h1  className='text'> Or get basic <span className='sub'>visualization</span> of these <span className='sub'> demo </span> datasets </h1>
    				</div>
					<div className="vl"></div>
					</ScrollAnimation>
				</div>

				  <div class="col-md-6">
				   <ScrollAnimation animateIn='zoomInRight' animateOut='bounceOutLeft'>
				  	<div className='demo'>
				  	<div className='newdemo'>
				  	<button className="btn btn-primary demo-btn" onClick={this.handleInBuildDatasetNonGeo}>Start Analysis (Demo 1)</button>
					<button className="btn btn-primary demo-btn" onClick={this.handleInBuildDatasetGeo}>Start Analysis (Demo 2)</button>
					</div>

					<div className=''>
    					<img className='demoimg' src={lineChart}  height='250' width='550'/>


    					</div>
    				
					</div>
					</ScrollAnimation>
					    <img className='tweetR' src={tweetR} />
    					<img className='tweetL' src={tweetL} />
				</div>

			</div>


			</div>
			)
	}
}

const mapStateToProps=(rootReducer)=>{
	return({
		uploadState: rootReducer.inBuildData.errorUploadDataObj,
		loaded: rootReducer.inBuildData.loaded
	})
}

const mapDispatchToProps=(dispatch)=>{
	return({
		startLoadingHeader: (fileObj)=>dispatch(startGettingHeader(fileObj)),
		startUploadingDataViaRedux: (fileObj)=> dispatch(startUploadingData(fileObj)),
		updateDatasetNameViaRedux: (name)=> dispatch(updateDatasetName(name))
	})
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileUploadComponent))