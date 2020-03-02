import React from 'react';
import './bodyComponent.scss';
import LandingCircle from '../assets/landingCircle.png';
import barChart from '../assets/barChartd.png';
import pieChart from '../assets/pieChartd.png';
import lineChart from '../assets/lineChartdd.png';
import landingNew from '../assets/landingnew.png';
import { connect} from 'react-redux';
import { startCleaningReducerData} from '../redux/data/inBuildDataAction';
import ScrollAnimation from 'react-animate-on-scroll';

const BodyComponent=(props)=>{
	props.cleanRedux();

	

	return(
		<div className='body' >
			<div className='heading'>
				<div className='wrap'>
				<img className='img4' src={landingNew} width='80' height='100'/>
				<ScrollAnimation animateIn='bounceInLeft' animateOut='bounceOutLeft'>
				<h1 className='title heading'># Dynamic <span> </span></h1>
				</ScrollAnimation>

				<ScrollAnimation animateIn='bounceInRight' animateOut='bounceOutRight'>
				<h1 className='title heading title1'>&nbsp;Charts</h1>
				</ScrollAnimation>
				<img className='img img1' src={LandingCircle} width='100' height='100' />
				</div>
				<ScrollAnimation animateIn='flipInY' animateOut='fadeOut'>
				<h1 className='subtitle'>Simple yet flexible analytics chart for Data Analyst</h1>
				</ScrollAnimation>

				<img className='img2' src={barChart} width='140' height='140'/>
				<img className='img3 ' src={pieChart} width='140' height='140'/>
			</div>
		</div>
		)
}

const mapDispatchToProps=(dispatch)=>{
	return({
		cleanRedux: ()=> dispatch(startCleaningReducerData())
	})
}

export default connect(null, mapDispatchToProps)(BodyComponent)