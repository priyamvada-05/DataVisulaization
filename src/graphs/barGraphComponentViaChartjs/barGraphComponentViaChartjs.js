import React from 'react';
import Chart from 'chart.js';

class BarGraphComponent extends React.Component{

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

  	
	if(data.length > 0){

		const myChartRef = this.chartRef.current.getContext("2d");
		const labels= data.map(item=> Object.values(item)[0])
		const dataBar= data.map(item=> Object.values(item)[1])

		

	  this.myChart = new Chart(myChartRef, {
	    type: 'bar',
	    data: {
	      labels: labels,
	      datasets: [{
	       label: 'Churn',
	        data: dataBar,
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
			<div className='container' style={{ height:'30', width:'80vw'}} >
			<canvas className='chart' ref={this.chartRef} />
			</div>
			)
	}
}

export default BarGraphComponent