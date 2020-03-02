import React from 'react';
import Chart from 'chart.js';
import BoxPlot from 'chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js';

class BoxPlotComponent extends React.Component{

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

  	
	if(data){

		const myChartRef = this.chartRef.current.getContext("2d");
		const label= Object.keys(data)[0] 
		const dataLine= Object.values(data)[0]

	  this.myChart = new Chart(myChartRef, {
		    type: 'boxplot',
		    data: {

			  labels: [],
			  datasets: [{
			    label: label,
			    backgroundColor: 'rgba(255,0,0,0.5)',
			    borderColor: 'red',
			    borderWidth: 1,
			    outlierColor: '#999999',
			    padding: 10,
			    itemRadius: 1,
			    data: [dataLine]
			  }]
			},
		    options: {
		      responsive: true,
		      legend: {
		        position: 'top',
		      },
		    
		    scales: {
		            xAxes: [{
		              // Specific to Bar Controller
		              categoryPercentage: 0.7,
		              barPercentage: 0.6
		            }]
		          }
		    }
		  })
	}
  }



	render(){

		return(
			<canvas className='chart' ref={this.chartRef} />
			)
	}
}

export default BoxPlotComponent