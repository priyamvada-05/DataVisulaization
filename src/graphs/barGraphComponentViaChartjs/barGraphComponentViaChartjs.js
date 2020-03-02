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
	       label: this.props.name,
	        data: dataBar,
	       backgroundColor: [ '#FFC5CB',, '#EE98FF', '#AC98FF', '#98C5FF','#FFAA98', '#FCFF98', '#D0FF98', '#98FFCB', '#98FFE9']
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

export default BarGraphComponent