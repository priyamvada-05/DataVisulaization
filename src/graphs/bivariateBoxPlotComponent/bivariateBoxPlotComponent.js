import React from 'react';
import Chart from 'chart.js';
import BoxPlot from 'chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js';
import { connect} from 'react-redux';
import { inBuildDataBivariateBoxPlotData} from '../../redux/data/inBuildDataSelector';

class BivariateBoxPlotComponent extends React.Component{

	constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.myChart=null;
  }

  componentDidMount(){
  	this.createChart(this.props.bivariateBoxPlotData)
  }

	componentDidUpdate(){
		if (typeof this.myChart !== "undefined" && this.myChart) {this.myChart.destroy()}
	this.createChart(this.props.bivariateBoxPlotData)
}

  createChart=(data)=>{

  	
	if(data){

		const myChartRef = this.chartRef.current.getContext("2d");
		const label= data.map((item)=> Object.keys(item)[0])
		var backgroundColor= [ '#FFC5CB',, '#EE98FF', '#AC98FF', '#98C5FF','#FFAA98', '#FCFF98', '#D0FF98', '#98FFCB', '#98FFE9'];
		var count=0;
		const dataLine= data.map((item, index)=>{
			
			return {
			    label: label[index],
			    backgroundColor: 'rgba(255,0,0,0.5)',
			    borderColor: 'red',
			    borderWidth: 1,
			    outlierColor: '#999999',
			    padding: 10,
			    itemRadius: 1,
			    data: [Object.values(item)[0]]		
			}

		})




	  this.myChart = new Chart(myChartRef, {
		    type: 'boxplot',
		    data: {

			  labels: [],
			  datasets: dataLine
			},
		    options: {
		      responsive: true,
		      legend: {
		        position: 'top',
		      }
		    
		   /* scales: {
		            xAxes: [{
		              // Specific to Bar Controller
		              categoryPercentage: 0.7,
		              barPercentage: 0.6
		            }]
		          }*/
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


const mapStateToProps=(rootReducer)=>{
	return({
		bivariateBoxPlotData: inBuildDataBivariateBoxPlotData(rootReducer)
	})
}

export default connect(mapStateToProps)(BivariateBoxPlotComponent)