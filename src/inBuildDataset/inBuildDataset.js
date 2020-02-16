import React from 'react';
import './inBuildDataset.scss';
import QuantitativeAndQualitativeComponent from './quantitativeAndqualitativeComponent/quantitativeAndqualitativeComponent'
import QuantitativeComponent from './quantitativeComponent/quantitativeComponent';
import { connect} from 'react-redux'
import QualitativeComponent from './qualitativeComponent/qualitativeComponent';


class InBuildDataset extends React.Component {


	render(){

	return(
		<div className='new'>
			<QuantitativeAndQualitativeComponent />
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
			:null
		}
		}
		</div>
		)
}
}

const mapStateToProps=(rootReducer)=>{
	return({
		loadingQualitativeDataFromRedux: rootReducer.inBuildData.loadingQualitativeData,
		loadingQuantitativeDataFromRedux: rootReducer.inBuildData.loadingQuantitativeData,
		loading:rootReducer.inBuildData.loading
	})
}

export default connect(mapStateToProps)(InBuildDataset)