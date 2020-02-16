import { createSelector} from 'reselect';

const inBuildDataState= (rootReducer)=> rootReducer.inBuildData

export const inBuildDataHeader= createSelector(
	[inBuildDataState],
	(inBuildData)=> inBuildData.header
	)

export const inBuildDataLoading= createSelector(
	[inBuildDataState],
	(inBuildData)=> inBuildData.loading
	)
