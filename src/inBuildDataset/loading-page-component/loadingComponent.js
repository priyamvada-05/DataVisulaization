import React from 'react';
import { LoaderOverlay, LoaderContainer} from './loadingStylesComponent';

const LoadingComponent= (Component)=>{
	return (isLoading, otherProps)=>{
		return isLoading? 
			<LoaderOverlay>
				<LoaderContainer />
			</LoaderOverlay>
			: <Component {...otherProps} />
	}
}

export default LoadingComponent