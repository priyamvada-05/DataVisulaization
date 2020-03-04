import React from 'react';
import Chart from 'chart.js';
import ChartGeo from 'chartjs-chart-geo/build/Chart.Geo.js';
import Color from 'chartjs-color';
import { topojson} from 'chartjs-chart-geo/build/Chart.Geo.js';
import { connect} from 'react-redux';
import { inBuildDataStateGeographicalData} from '../../redux/data/inBuildDataSelector';

class StatePlotComponent extends React.Component{

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

  createChart= ()=>{

  	if(this.props.data){

  	const myChartRef = this.chartRef.current.getContext("2d");
fetch('https://unpkg.com/us-atlas/states-10m.json').then((r) => r.json()).then((us) => {
  const nation = topojson.feature(us, us.objects.nation).features[0];
  const states = topojson.feature(us, us.objects.states).features;

  const stateRes= Object.keys(this.props.data)

  const refdata=states.map((d) => {
  	var state_name=d.properties.name;
  	var state_name_update= state_name.replace(/\s/g, "")

  	var newState = stateRes.find((item)=> item.toLowerCase() === state_name_update.toLowerCase())

  	var value= this.props.data[newState]

  	return {
  		feature: d, 
  		value: value
  	}
  })



this.myChart = new Chart(myChartRef, {
type: 'choropleth',
    data: {
      labels: states.map((d) => d.properties.name),
      datasets: [{
        label: 'States',
        outline: nation,
        backgroundColor: (context) => {

          if (context.dataIndex == null) {
                return null;
          }
          const value = context.dataset.data[context.dataIndex];
          return new Color('steelblue').lightness(value.value * 100).hslString();
        },
        data: refdata
      }]
    },
    options: {
      legend: {
        display: false
      },
      scale: {
        projection: 'albersUsa'
      }
    }


})
})
}
}



	render(){

		return(
			<canvas className='chart' ref={this.chartRef} />
			)
	}
}

const mapStateToProps= (rootReducer)=>{
	return({
		data: inBuildDataStateGeographicalData(rootReducer)
	})
}

export default connect(mapStateToProps)(StatePlotComponent)