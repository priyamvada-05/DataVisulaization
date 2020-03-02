import React from 'react';
import Chart from 'chart.js';

class PieChartComponent extends React.Component{

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
	    type: 'doughnut',
	    data: {
	      labels: labels,
	      datasets: [{
	       label: this.props.name,
	        data: dataBar,
	       backgroundColor: ['#FFAA98', '#FCFF98', '#D0FF98', '#98FFCB', '#98FFE9', '#98C5FF', '#AC98FF', '#EE98FF', '#FFC5CB']
	      }]
	    },
	    option:{
	    cutoutPercentage:80,
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

export default PieChartComponent