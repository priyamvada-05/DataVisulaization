import React from 'react';
import Chart from 'chart.js';

class LineGraphComponent extends React.Component{

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
	    type: 'line',
	    data: {
	      labels: [],
	      datasets: [{
	       label: label,
	        data: dataLine,
	       backgroundColor: 'rgb(0, 204, 255, 0.3)'
	      }]
	    },
	    option:{
	    responsive: true,
	    maintainAspectRatio: true
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

export default LineGraphComponent