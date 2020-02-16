export const startGettingHeader=()=>{
	return({
		type: 'START_GETTING_HEADER_FROM_MONGODB'
	})
}

export const successfulGettingHeader=(header)=>{
	return({
		type: 'SUCCESSFUL_GETTING_HEADER_FROM_MONGODB',
		payload: header
	})
}

export const errorGettingHeader=()=>{
	return({
		type: 'ERROR_GETTING_HEADER_FROM_MONGODB'
	})
}

export const startGettingQuantitativeDataWildcardColumn=(colName)=>{
	return({
		type: 'START_GETTING_QUANTITATIVE_WILDCARD_COLUMN_DATA_FROM_MONGODB',
		payload: colName
	})
}

export const successfulGettingQuantitativeDataWildcardColumn=(data)=>{
	return({
		type: 'SUCCESSFUL_GETTING_QUANTITATIVE_WILDCARD_COLUMN_DATA_FROM_MONGODB',
		payload: data
	})
}

export const errorGettingQuantitativeDataWildcardColumn=(error)=>{
	return({
		type: 'ERROR_GETTING_QUANTITATIVE_WILDCARD_COLUMN_DATA_FROM_MONGODB',
		payload: error
	})
}

export const startGettingQualitativeDataWildcardColumn=(colName)=>{
	return({
		type: 'START_GETTING_QUALITATIVE_WILDCARD_COLUMN_DATA_FROM_MONGODB',
		payload: colName
	})
}

export const successfulGettingQualitativeDataWildcardColumn=(data)=>{
	return({
		type: 'SUCCESSFUL_GETTING_QUALITATIVE_WILDCARD_COLUMN_DATA_FROM_MONGODB',
		payload: data
	})
}

export const errorGettingQualitativeDataWildcardColumn=(error)=>{
	return({
		type: 'ERROR_GETTING_QUALITATIVE_WILDCARD_COLUMN_DATA_FROM_MONGODB',
		payload: error
	})
}

export const updateReqQuantitativeColname=(colName)=>{
	return({
		type:'UPDATE_REQ_QUANTITATIVE_COLNAME',
		payload: colName
	})
}

export const updateReqQualitativeColname=(colName)=>{
	return({
		type:'UPDATE_QUALITATIVE_REQ_COLNAME',
		payload: colName
	})
}