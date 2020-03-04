import React from 'react';
import './geographicalChartComponent.scss';
import { connect} from 'react-redux';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { startGettingGeographicalData, updateGeographicalChoose, updateStateGeographicalChoose, startGettingStateGeoData} from '../../redux/data/inBuildDataAction';
import  GeographicalChart from '../../graphs/geographcalChart/geographicalChart';
import { inBuildDataGeographicalChoose, inBuildDataGeographicalData, inBuildDataStateGeoChoose, inBuildDataStateGeographicalData} from '../../redux/data/inBuildDataSelector';
import StateChartComponent from '../../graphs/stateComponent.js/stateComponent';

class GeographicalChartComponent extends React.Component{

	constructor(props){
		super(props)
	}

compoenntDidMount(){
	
}
	render(){
		if(!this.props.loadingHeader){
		var array=this.props.headersViaRedux.quantitative.find((item)=> item.toLowerCase().includes('country'))
		var arrayState=this.props.headersViaRedux.quantitative.find((item)=> item.toLowerCase().includes('state'))
		console.log('geo')
		console.log(array)
				console.log('geo')
		console.log(arrayState)

	return(
		<div>
		{array?
		(	<div className='container'>
			
				<div className='row'>
				<div className='col-md-6 offset-3'>
					<h1 className='heading'># Geographical <span className='sub'>analysis</span></h1>
				</div>
				</div>

			<div className='row'>

				<div className='col-md-3'>
				<h2>Select Option </h2>
				</div>
				<div className='col-md-3'>
				      <MDBDropdown>
					      <MDBDropdownToggle caret className='new'>
					        {this.props.geographicalOption?
					        	this.props.geographicalOption:
					        	`Select option`}
					      </MDBDropdownToggle>
				       <MDBDropdownMenu basic>
				       	{this.props.headersViaRedux.qualitative.map((item, index)=>
				    		<MDBDropdownItem className='text' onClick={()=>{
								console.log('click qualitative')
				    			this.props.updateGeographicalChooseViaRedux(item)
				    		}}
				    		>{item}</MDBDropdownItem>
				    		)
				    }
				          </MDBDropdownMenu>
						</MDBDropdown>
				  </div>

				  <div className='col-md-3'>
						   <button onClick={()=>{

						   	const colName1=this.props.geographicalOption;
						   	const name= this.props.datasetName;
						   	const geo= array
						   	const colNameObj= { name, colName1, geo}
						   	this.props.getGeographicalData(colNameObj);
						   }} className='button'>Start Analysis </button>
							</div>
			
			</div>

			<div className='row'>
				<div className='col-md-8 offset-1'>
					<div className='card'>
						<GeographicalChart data={this.props.geographicalData?
												this.props.geographicalData
												:[
												    ['Country', 'Select Option']
												  ]
												
											}
												  />
					</div>
				</div>
			</div>

			</div>
			)
			: arrayState?
			(
			<div className='container'>
				<div className='row'>
				<div className='col-md-6 offset-3'>
					<h1 className='heading'># Geographical <span className='sub'>analysis</span></h1>
				</div>
				</div>
			<div className='row'>

				<div className='col-md-3'>
				<h2>Select Option </h2>
				</div>
				<div className='col-md-3'>
				      <MDBDropdown>
					      <MDBDropdownToggle caret className='new'>
					        {this.props.stateGeographicalOption?
					        	this.props.stateGeographicalOption:
					        	`Select option`}
					      </MDBDropdownToggle>
				       <MDBDropdownMenu basic>
				       	{this.props.headersViaRedux.qualitative.map((item, index)=>
				    		<MDBDropdownItem className='text' onClick={()=>{
								console.log('click qualitative')
				    			this.props.updateStateGeographicalChooseViaRedux(item)
				    		}}
				    		>{item}</MDBDropdownItem>
				    		)
				    }
				          </MDBDropdownMenu>
						</MDBDropdown>
				  </div>

				  <div className='col-md-3'>
						   <button onClick={()=>{

						   	const colName=this.props.stateGeographicalOption;
						   	const name= this.props.datasetName;
						   	const geo= arrayState;
						   	const colNameObj= { name, colName, geo}
						   	this.props.getStateGeographicalData(colNameObj);
						   }} className='button'>Start Analysis </button>
							</div>
			
			</div>
			{this.props.stateGeoData?
			(<div className='row'>
				<div className='col-md-8 offset-2'>
					<div className='card'>
						<StateChartComponent />
					</div>
				</div>
			</div>)
			:null
		}

			</div>

			)
			:


			(<div className='row5'>
				<div className='col-md-6 offset-3'>
					<h1 className='heading'># Geographical <span className='sub'>analysis</span></h1>
				</div>
				<h3 style={{'text-align':'center'}}>Sorry, we could not detect any column having names of countries</h3>
				<p>If i am wrong then please make sure that column having countries name should having name as "Country" and load the file again with new file name</p>
			</div>
			)
		}
			
		</div>
		
		)
}
}
}

const mapStateToProps=(rootReducer)=>{
	return({
		geographicalData: inBuildDataGeographicalData(rootReducer),
		loading:  rootReducer.inBuildData.loadingGeographicalData,
		headersViaRedux: rootReducer.inBuildData.header,
		loadingHeader: rootReducer.inBuildData.loading,
		geographicalOption: inBuildDataGeographicalChoose(rootReducer),
		datasetName: rootReducer.inBuildData.datasetName,
		loadingState: rootReducer.inBuildData.loadingStateGeo,
		stateGeographicalOption	: inBuildDataStateGeoChoose(rootReducer),
		stateGeoData: inBuildDataStateGeographicalData(rootReducer)


	})
}

const mapDispatchToProps=(dispatch)=>{
	return({
		getGeographicalData: (colObj)=> dispatch(startGettingGeographicalData(colObj)),
		updateGeographicalChooseViaRedux: (item)=>dispatch(updateGeographicalChoose(item)),
		getStateGeographicalData: (colObj)=> dispatch(startGettingStateGeoData(colObj)),
		updateStateGeographicalChooseViaRedux: (item)=>dispatch(updateStateGeographicalChoose(item))
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(GeographicalChartComponent)