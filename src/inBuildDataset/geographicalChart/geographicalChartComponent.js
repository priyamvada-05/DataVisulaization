import React from 'react';
import './geographicalChartComponent.scss';
import { connect} from 'react-redux';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { startGettingGeographicalData, updateGeographicalChoose} from '../../redux/data/inBuildDataAction';
import  GeographicalChart from '../../graphs/geographcalChart/geographicalChart';
import { inBuildDataGeographicalChoose, inBuildDataGeographicalData} from '../../redux/data/inBuildDataSelector';

class GeographicalChartComponent extends React.Component{

	constructor(props){
		super(props)
	}

compoenntDidMount(){
	
}
	render(){
		if(!this.props.loadingHeader){
		var array=this.props.headersViaRedux.quantitative.find((item)=> item.toLowerCase().includes('country'))
		console.log('geo')
		console.log(array)

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
						   	const name= this.props.datasetName
						   	const colNameObj= { name, colName1}
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
			:<div className='row5'>
				<div className='col-md-6 offset-3'>
					<h1 className='heading'># Geographical <span className='sub'>analysis</span></h1>
				</div>
				<h3 style={{'text-align':'center'}}>Sorry, we could not detect any column having names of countries</h3>
				<p>If i am wrong then please make sure that column having countries name should having name as "Country" and load the file again with new file name</p>
				</div>}
			
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
		datasetName: rootReducer.inBuildData.datasetName
	})
}

const mapDispatchToProps=(dispatch)=>{
	return({
		getGeographicalData: (colObj)=> dispatch(startGettingGeographicalData(colObj)),
		updateGeographicalChooseViaRedux: (item)=>dispatch(updateGeographicalChoose(item))
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(GeographicalChartComponent)