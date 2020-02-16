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
					<h1>Loading the data</h1>:
			<div className='list'>
				<div className='row'>
				<div className='col-md-6'>
				<h2>List of Qualitative data</h2>
				<ul>
					{this.props.headerFromRedux.qualitative.map(item=>{
						if(item){
							return( <button onClick={()=> {
															this.props.setQualitativeColnameInRedux(item)
															this.props.startLoadingQualitativeDataAsyncRedux(item)}
							} className="button">{item}</button>)
						}
					})
					}
				</ul>
				</div>
				<div className='col-md-6'>
				<h2>List of Quantitative data</h2>
				<ul>
					{this.props.headerFromRedux.quantitative.map(item=>{
						if(item){
							return(<button onClick={()=> {
								this.props.setQuantitativeColnameInRedux(item)
								this.props.startLoadingQuantitativeDataAsyncRedux(item)
							}} class="button">{item}</button>)
						}
					})
					}
				</ul>
				</div>
			</div>
			</div>
			}
		</div>
		)
}
}

const mapStateToProps=(rootReducer)=>{
	return({
	headerFromRedux: inBuildDataHeader(rootReducer),
	loadingFromRedux: inBuildDataLoading(rootReducer),
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