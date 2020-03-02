import React from 'react';
import Chart from 'chart.js';
import { connect} from 'react-redux';
import { inBuildDataBivariateQualitativeData} from '../../redux/data/inBuildDataSelector';

class ScatterPlotGraphComponent extends React.Component{

	constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.myChart=null;
  }

  componentDidMount(){
  	this.createChart(this.props.data)
  }

	componentDidUpdate(){

		if (typeof this.myChart !== "undefined" && this.myChart) {this.myChart.destroy()}
		this.createChart(this.props.data)
}

  createChart=(data)=>{

  	const backgroundColor=['pink', 'blue', 'purple', 'orange', 'green']
	if(data && data.length > 0){
	  
	  const myChartRef = this.chartRef.current.getContext("2d");
	  this.myChart = new Chart(myChartRef, {
			type: 'scatter',
			    data: {
			        datasets: [{
			            label: 'Scatter Dataset',
			            data: this.props.data
			        }]
			    },
			    options: {
			        scales: {
			            xAxes: [{
			                type: 'linear',
			                position: 'bottom'
			            }]
			        },
			         responsive: true,
	    			 maintainAspectRatio: true
			    }
  				})
	}
  }



	render(){

		return(
			<div>
		{	this.props.data ? 
			<canvas className='chart' ref={this.chartRef} />
			: null
		}
		   </div>
			)
	}
}

const mapStateToProps= (rootReducer)=>{
	return({
		data : inBuildDataBivariateQualitativeData(rootReducer)
	})
}

export default connect(mapStateToProps)(ScatterPlotGraphComponent)