import React from 'react';
import './bivariateAnalysisComponent.scss';
import { connect} from 'react-redux';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { inBuildDataHeader, inBuildDataLoading, inBuildDataBivariateGetCol1, inBuildDataBivariateGetCol2, inBuildDataBivariateGetCol3, inBuildDataBivariateGetCol4, inBuildDataBivariateQuantitativeData, inBuildDataBivariateQualitativeData, inBuildDataBivariateBoxPlotData, inBuildDataBivariateGetCol5, inBuildDataBivariateGetCol6} from '../../redux/data/inBuildDataSelector';
import { updateBivariateChoose1, updateBivariateChoose2, updateBivariateChoose3, updateBivariateChoose4, startGettingBivariateQuantitativeData, startGettingBivariateQualitativeData, updateBivariateChoose5, updateBivariateChoose6, startGettingBivariateBoxPlotData} from '../../redux/data/inBuildDataAction';
import BivariateBarGraph from '../../graphs/bivariateBarGraphComponentViaChartjs/bivariateBarGraphViaChartjs';
import ScatterPlotGraph from '../../graphs/scatterPlotGraphViaChartjs/scatterPlotGraphViaChartjs';
import BivariateBoxPlotGraph from '../../graphs/bivariateBoxPlotComponent/bivariateBoxPlotComponent';

class BivariateAnalysisComponent extends React.Component{

	constructor(props){
		super(props)
		console.log('bivariate')
		this.handleChange1 = this.handleChange1.bind(this);
	}

	handleChange1(event){
		console.log('this is change 1')
		console.log(event.target)
	}

	render(){
		return(
		<div className='bivariate'>
		{ this.props.loading?
			null:

					(					
					<div className='container new1'>
						<div className='row'>
							<div className='col-md-6 offset-3'>
								<h1 className='heading'># Bivariate <span className='sub'>analysis</span></h1>
							</div>
						</div>
					<div className='row'>

						<div className='col-md-3'>
						<h2>Qualitative</h2>
						</div>
						<div className='col-md-3'>
						      <MDBDropdown className=''>
							      <MDBDropdownToggle className='new' caret>
							        {this.props.getSelectOption1?
							        	this.props.getSelectOption1:
							        	`Select option`}
							      </MDBDropdownToggle>
						       <MDBDropdownMenu  basic>
						       	{this.props.headerFromRedux.quantitative.map((item, index)=>
						    		<MDBDropdownItem className='text' onClick={()=>{
	    								console.log('click quantitative')
						    			this.props.updateSelectOption1(item)
						    		}}
						    		>{item}</MDBDropdownItem>
						    		)
						    }
						          </MDBDropdownMenu>
    							</MDBDropdown>
						  </div>

						<div className='col-md-3'>
						      <MDBDropdown>
							      <MDBDropdownToggle caret className='new'>
							        {this.props.getSelectOption2?
							        	this.props.getSelectOption2:
							        	`Select option`}
							      </MDBDropdownToggle>
						       <MDBDropdownMenu basic>
						       	{this.props.headerFromRedux.quantitative.map((item, index)=>
						    		<MDBDropdownItem className='text' onClick={()=>{
	    								console.log('click quantitative')
						    			this.props.updateSelectOption2(item)
						    		}}
						    		>{item}</MDBDropdownItem>
						    		)
						    }
						          </MDBDropdownMenu>
    							</MDBDropdown>
						</div>

							<div className='col-md-3'>
						   <button onClick={()=>{
						   	console.log('click bivariate redux')
						   	const colName1=this.props.getSelectOption1;
						   	const colName2=this.props.getSelectOption2;
						   	const name= this.props.datasetName
						   	const colNameObj= { name, colName1, colName2}
						   	this.props.startGettingBivariateQuantitativeDataFromRedux(colNameObj);
						   }} className='button'>Start Analysis </button>
							</div>

				</div>

				<div className='row'>
				{this.props.bivariateQuantitativeData?
                   (<div className='col-md-6 offset-md-3'>
					<div className='card'>
						<div className='card-body'>
						<h2>Bar Chart</h2>
						</div>

						<div className='card-body'>
						<BivariateBarGraph   />
						</div>
					</div>

					</div>):
                   null
					}
				</div>

					<div className='row'>

						<div className='col-md-3'>
						<h2>Quantitative</h2>
						</div>
						<div className='col-md-3'>
						      <MDBDropdown>
							      <MDBDropdownToggle caret className='new'>
							        {this.props.getSelectOption3?
							        	this.props.getSelectOption3:
							        	`Select option`}
							      </MDBDropdownToggle>
						       <MDBDropdownMenu basic>
						       	{this.props.headerFromRedux.qualitative.map((item, index)=>
						    		<MDBDropdownItem className='text' onClick={()=>{
	    								console.log('click qualitative')
						    			this.props.updateSelectOption3(item)
						    		}}
						    		>{item}</MDBDropdownItem>
						    		)
						    }
						          </MDBDropdownMenu>
    							</MDBDropdown>
						  </div>

						<div className='col-md-3'>
						      <MDBDropdown>
							      <MDBDropdownToggle caret className='new'>
							        {this.props.getSelectOption4?
							        	this.props.getSelectOption4:
							        	`Select option`}
							      </MDBDropdownToggle>
						       <MDBDropdownMenu basic>
						       	{this.props.headerFromRedux.qualitative.map((item, index)=>
						    		<MDBDropdownItem className='text' onClick={()=>{
	    								console.log('click qualitative')
						    			this.props.updateSelectOption4(item)
						    		}}
						    		>{item}</MDBDropdownItem>
						    		)
						    }
						          </MDBDropdownMenu>
    							</MDBDropdown>
						</div>

							<div className='col-md-3'>
						   <button onClick={()=>{
						   	console.log('click bivariate redux')
							console.log('click bivariate redux')
						   	const colName1=this.props.getSelectOption3;
						   	const colName2=this.props.getSelectOption4;
						   	const name= this.props.datasetName
						   	const colNameObj= { name, colName1, colName2}
						   	this.props.startGettingBivariateQualitativeDataFromRedux(colNameObj);
						   }} className='button'>Start Analysis </button>
							</div>

				</div>

				<div className='row'>
				{this.props.bivariateQualitativeData?
                   (<div className='col-md-6 offset-md-3'>
					<div className='card'>
						<div className='card-body'>
						<h2>Scatter Plot</h2>
						</div>

						<div className='card-body'>
						<ScatterPlotGraph   />
						</div>
					</div>

					</div>):
                   null
					}
				</div>

				<div className='row'>

						<div className='col-md-3'>
						<h2>Both</h2>
						</div>
						<div className='col-md-3'>
						      <MDBDropdown>
							      <MDBDropdownToggle caret className='new'>
							        {this.props.getSelectOption5?
							        	this.props.getSelectOption5:
							        	`Select option`}
							      </MDBDropdownToggle>
						       <MDBDropdownMenu basic>
						       	{this.props.headerFromRedux.quantitative.map((item, index)=>
						    		<MDBDropdownItem className='text' onClick={()=>{
	    								console.log('click qualitative')
						    			this.props.updateSelectOption5(item)
						    		}}
						    		>{item}</MDBDropdownItem>
						    		)
						    }
						          </MDBDropdownMenu>
    							</MDBDropdown>
						  </div>

						<div className='col-md-3'>
						      <MDBDropdown>
							      <MDBDropdownToggle caret className='new'>
							        {this.props.getSelectOption6?
							        	this.props.getSelectOption6:
							        	`Select option`}
							      </MDBDropdownToggle>
						       <MDBDropdownMenu basic>
						       	{this.props.headerFromRedux.qualitative.map((item, index)=>
						    		<MDBDropdownItem className='text' onClick={()=>{
	    								console.log('click qualitative')
						    			this.props.updateSelectOption6(item)
						    		}}
						    		>{item}</MDBDropdownItem>
						    		)
						    }
						          </MDBDropdownMenu>
    							</MDBDropdown>
						</div>

							<div className='col-md-3'>
						   <button onClick={()=>{
						   	console.log('click bivariate redux')
							console.log('click bivariate redux')
						   	const colName1=this.props.getSelectOption5;
						   	const colName2=this.props.getSelectOption6;
						   	const name= this.props.datasetName
						   	const colNameObj= { name, colName1, colName2}
						   	this.props.startGettingBivariateBoxPlotDataFromRedux(colNameObj);
						   }} className='button'>Start Analysis </button>
							</div>

				</div>

				<div className='row'>
				{this.props.bivariateBoxPlotDataData?
                   (<div className='col-md-6 offset-md-3'>
					<div className='card'>
						<div className='card-body'>
						<h2>Box Plot</h2>
						</div>

						<div className='card-body'>
						<BivariateBoxPlotGraph   />
						</div>
					</div>

					</div>):
                   null
					}
				</div>
				
				</div>
						 )
			}
			</div>

			)
	}


}

const mapStateToProps= (rootReducer)=>{
	return({
		headerFromRedux: inBuildDataHeader(rootReducer),
		loading: rootReducer.inBuildData.loading,
		getSelectOption1: inBuildDataBivariateGetCol1(rootReducer),
		getSelectOption2: inBuildDataBivariateGetCol2(rootReducer),
		getSelectOption3: inBuildDataBivariateGetCol3(rootReducer),
		getSelectOption4: inBuildDataBivariateGetCol4(rootReducer),
		bivariateQuantitativeData: inBuildDataBivariateQuantitativeData(rootReducer),
		bivariateQualitativeData: inBuildDataBivariateQualitativeData(rootReducer),
		datasetName: rootReducer.inBuildData.datasetName,
		getSelectOption5: inBuildDataBivariateGetCol5(rootReducer),
		getSelectOption6: inBuildDataBivariateGetCol6(rootReducer),
		bivariateBoxPlotDataData: inBuildDataBivariateBoxPlotData(rootReducer)
	})
}

const mapDispatchToProps= (dispatch)=>{
	return({
		updateSelectOption1: (name)=> dispatch(updateBivariateChoose1(name)),
		updateSelectOption2: (name)=> dispatch(updateBivariateChoose2(name)),
		updateSelectOption3: (name)=> dispatch(updateBivariateChoose3(name)),
		updateSelectOption4: (name)=> dispatch(updateBivariateChoose4(name)),
		updateSelectOption5: (name)=> dispatch(updateBivariateChoose5(name)),
		updateSelectOption6: (name)=> dispatch(updateBivariateChoose6(name)),
		startGettingBivariateQuantitativeDataFromRedux: (colNameObj)=> dispatch(startGettingBivariateQuantitativeData(colNameObj)),
		startGettingBivariateQualitativeDataFromRedux: (colNameObj)=> dispatch(startGettingBivariateQualitativeData(colNameObj)),
		startGettingBivariateBoxPlotDataFromRedux: (colNameObj)=> dispatch(startGettingBivariateBoxPlotData(colNameObj))
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(BivariateAnalysisComponent)