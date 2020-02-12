import React from 'react';
import './bodyComponent.scss';
import ReactImg from '../img5.jpg';

const BodyComponent=()=>{

	return(
		<div className='body' style={{
			backgroundImage: `url(${ReactImg})`,

		}}>
			<div className='heading'>
				<h1 className='title'>Dynamic Charts</h1>
				<h1 className='subtitle'>Simple yet flexible analytics chart for Data Analyst</h1>
			</div>
		</div>
		)
}

export default BodyComponent