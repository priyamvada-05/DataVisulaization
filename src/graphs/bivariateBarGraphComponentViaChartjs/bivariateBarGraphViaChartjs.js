import React from 'react';
import Chart from 'chart.js';
import { connect} from 'react-redux';
import { inBuildDataBivariateQuantitativeData} from '../../redux/data/inBuildDataSelector';

class BivariateBarGraphComponent extends React.Component{

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
		const labels= data.map(item=> Object.keys(item)[0])
		
		const label= Object.values(data[0])[0].map((item)=> Object.keys(item)[0])
		var count=-1;
		const dataset=label.map((item)=>{

			const labelValueArray=[];
			data.forEach((index)=>{
				const arrayValue=Object.values(index)[0]

				arrayValue.forEach((value)=>{
					labelValueArray.push(value[item])
				})
			})

			const newLabelArray= labelValueArray.filter((item)=> typeof(item) != 'undefined')
			count= count+1;
			return({
				label: item,
				data: newLabelArray,
				backgroundColor: backgroundColor[count]
			})

		})

		console.log('dataset')
		console.log(dataset)

		

	  this.myChart = new Chart(myChartRef, {
	    type: 'bar',
	    data: {
	      labels: labels,
	      datasets: dataset
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
		data : inBuildDataBivariateQuantitativeData(rootReducer)
	})
}

export default connect(mapStateToProps)(BivariateBarGraphComponent)