import React from 'react';
import './inBuildDataset.scss';
import QuantitativeAndQualitativeComponent from './quantitativeAndqualitativeComponent/quantitativeAndqualitativeComponent'
import QuantitativeComponent from './quantitativeComponent/quantitativeComponent';
import { connect} from 'react-redux'
import QualitativeComponent from './qualitativeComponent/qualitativeComponent';
import BivariateAnalysisComponent from './bivariateAnalysis/bivariateAnalysisComponent';
import GeographicalChartComponent from './geographicalChart/geographicalChartComponent';
import TableComponent from './table/tableComponent';
import { startGettingTableHeader, startGettingTableColumn} from '../redux/data/inBuildDataAction';
import { LoaderOverlay, LoaderContainer} from './loading-page-component/loadingStylesComponent';


class InBuildDataset extends React.Component {

	componentDidMount(){
		this.props.startLoadingHeader({name: this.props.datasetName})
		this.props.startLoadingColumn({name: this.props.datasetName, startValue: this.props.startValue})	
	
	}

	render(){

	return(
		<div className='new'>
			<QuantitativeAndQualitativeComponent/> 
			{!this.props.loading?
			(<div className=''>
			{this.props.loadingQuantitativeDataFromRedux?
			<QuantitativeComponent />
			:null
			}

			{this.props.loadingQualitativeDataFromRedux?
			<QualitativeComponent />
			:null
			}
			</div>)
			:(	<LoaderOverlay>
							<LoaderContainer />
				</LoaderOverlay>)
		}
		
		<BivariateAnalysisComponent className='bivariate'/>
		{!this.props.loading?
		(
		 <div className=''>
			<GeographicalChartComponent />
			<TableComponent />
		 </div>
		 )
		:null}
		
		</div>
		)
}
}

const mapStateToProps=(rootReducer)=>{
	return({
		loadingQualitativeDataFromRedux: rootReducer.inBuildData.loadingQualitativeData,
		loadingQuantitativeDataFromRedux: rootReducer.inBuildData.loadingQuantitativeData,
		loading:rootReducer.inBuildData.loading,
		datasetName: rootReducer.inBuildData.datasetName,
		startValue: rootReducer.inBuildData.startLimit
	})
}

const mapDispatchToProps= (dispatch)=>{
	return({
		startLoadingHeader:(limitObj)=>dispatch(startGettingTableHeader(limitObj)),
		startLoadingColumn:(limitObj)=> dispatch(startGettingTableColumn(limitObj))
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(InBuildDataset)