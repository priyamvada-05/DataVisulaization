const INITIAL_STATE={
	header: null,
	loading:false,
	error:null,
	quantitativeColName:null,
	qualitativeColName:null,
	quantitativeData:null,
	qualitativeData:null,
	loadingQualitativeData:false,
	loadingQuantitativeData:false,
}

const inBuildDataReducer=(state= INITIAL_STATE, action)=>{

	switch(action.type){

		case 'START_GETTING_HEADER_FROM_MONGODB':
			return({
				...state,
				loading:true
			})

		case 'SUCCESSFUL_GETTING_HEADER_FROM_MONGODB':
			return({
				...state,
				loading:false,
				header: action.payload
			})

		case 'ERROR_GETTING_HEADER_FROM_MONGODB':
			return({
				...state,
				loading:false,
				error: action.payload
			})

		case 'START_GETTING_QUANTITATIVE_WILDCARD_COLUMN_DATA_FROM_MONGODB':
			return({
				...state,
				loadingQualitativeData:false,
				loadingQuantitativeData:true
			})

		case 'SUCCESSFUL_GETTING_QUANTITATIVE_WILDCARD_COLUMN_DATA_FROM_MONGODB':
			return({
				...state,
				loadingData:false,
				quantitativeData:action.payload
			})

		case 'ERROR_GETTING_QUANTITATIVE_WILDCARD_COLUMN_DATA_FROM_MONGODB':
			return({
				...state,
				loadingData:false,
				quantitativeData:action.payload
			})

		case 'START_GETTING_QUALITATIVE_WILDCARD_COLUMN_DATA_FROM_MONGODB':
			return({
				...state,
				loadingQualitativeData:true,
				loadingQuantitativeData:false
			})

		case 'SUCCESSFUL_GETTING_QUALITATIVE_WILDCARD_COLUMN_DATA_FROM_MONGODB':
			return({
				...state,
				qualitativeData:action.payload
			})

		case 'ERROR_GETTING_QUALITATIVE_WILDCARD_COLUMN_DATA_FROM_MONGODB':
			return({
				...state,
				qualitativeData:action.payload
			})

		case 'UPDATE_REQ_QUANTITATIVE_COLNAME':
			return({
				...state,
				quantitativeColName:action.payload
			})

		case 'UPDATE_QUALITATIVE_REQ_COLNAME':
			return({
				...state,
				qualitativeColName:action.payload
			})

		default: 
			return state
	}
	}

export default inBuildDataReducer