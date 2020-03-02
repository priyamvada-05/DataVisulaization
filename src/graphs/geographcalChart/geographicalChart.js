import React from 'react';
import Chart from "react-google-charts";

class GeographicalChart extends React.Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){
		if(!this.props.data){

		}
	}

	render(){
		return(
			<Chart
				  width={'1000px'}
				  height={'500px'}
				  chartType="GeoChart"
				  data={this.props.data}
				  // Note: you will need to get a mapsApiKey for your project.
				  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
				  mapsApiKey="AIzaSyAdiytwglvSvNbwawDiIo3GjHZ4U-nO6OY"
				  rootProps={{ 'data-testid': '1' }}
				/>
			)
	}
}

export default GeographicalChart