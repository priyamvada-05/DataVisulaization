import React from 'react';
import './quantitativeAndqualitativeComponent.scss';
import { connect} from 'react-redux';
import { inBuildDataHeader, inBuildDataLoading} from '../../redux/data/inBuildDataSelector';
import { updateReqQuantitativeColname, updateReqQualitativeColname, startGettingQuantitativeDataWildcardColumn, startGettingQualitativeDataWildcardColumn} from '../../redux/data/inBuildDataAction';

class QuantitativrAndQualitativeComponent extends React.Component {

	constructor(props){
		super(props)
		}

	render(){

	return(
		<div className='new'>
			{this.props.loadingFromRedux?
					null:
(			<div className='list'>
				<div className='row'>
					<div className='col-md-6 offset-3'>
						<h1 className='heading'># Univariate <span className='sub'>analysis</span></h1>
					</div>
				</div>

				<div className='row'>
					<div className='col-md-6 offset-3'>
						<h3 className=''>Press the below buttons and explore the graph</h3>
					</div>
				</div>
				<div className='row new5'>
				<div className='col-md-6'>
				<h2 className='text'>Quantitative data</h2>
				<ul>
					{this.props.headerFromRedux.qualitative.map(item=>{
						if(item){
							return( <button onClick={()=> {
															this.props.setQualitativeColnameInRedux(item)
															this.props.startLoadingQualitativeDataAsyncRedux({
																name:this.props.datasetName,
																colName:item})}
							} className="button">{item}</button>)
						}
					})
					}
				</ul>
				</div>
				<div className='col-md-6'>
				<h2 className='text'>Qualitative data</h2>
				<ul>
					{this.props.headerFromRedux.quantitative.map(item=>{
						if(item && !item.toLowerCase().includes('state') 
							&& !item.toLowerCase().includes('name')
							&& !item.toLowerCase().includes('phone')
							&& !item.toLowerCase().includes('country')
							&& !item.toLowerCase().includes('region')){
							return(<button onClick={()=> {
								this.props.setQuantitativeColnameInRedux(item)
								this.props.startLoadingQuantitativeDataAsyncRedux({
									name:this.props.datasetName,
									colName:item})
							}} class="button">{item}</button>)
						}
					})
					}
				</ul>
				</div>
			</div>
			</div>)
			}
		</div>
		)
}
}

const mapStateToProps=(rootReducer)=>{
	return({
	headerFromRedux: inBuildDataHeader(rootReducer),
	loadingFromRedux: inBuildDataLoading(rootReducer),
	datasetName: rootReducer.inBuildData.datasetName
	})
}

const mapDispatchToProps=(dispatch)=>{
	return({
		setQualitativeColnameInRedux:(colName)=> dispatch(updateReqQualitativeColname(colName)),
		setQuantitativeColnameInRedux:(colName)=> dispatch(updateReqQuantitativeColname(colName)),
		startLoadingQualitativeDataAsyncRedux: (colName)=> dispatch(startGettingQualitativeDataWildcardColumn(colName)),
		startLoadingQuantitativeDataAsyncRedux: (colName)=> dispatch(startGettingQuantitativeDataWildcardColumn(colName))
	})
}


export default connect(mapStateToProps, mapDispatchToProps)(QuantitativrAndQualitativeComponent)