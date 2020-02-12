import React from 'react';
import './inBuildDataset.scss';

const InBuildDataset= ()=>{

	fetch('/api/v1/application/columnName').then(data=>{
		console.log('data')
		console.log(data)
	})
	return(
		<div className=''>

		</div>
		)
}

export default InBuildDataset