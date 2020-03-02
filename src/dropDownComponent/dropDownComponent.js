import React from 'react';
import './dropDownComponent.scss';
import onClickOutside from "react-onclickoutside";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp} from '@fortawesome/free-solid-svg-icons';
import { faAngleDown} from '@fortawesome/free-solid-svg-icons';


class DropDownComponent extends React.Component{

	constructor(props){
		super()

		this.state={
			listOpen:false,
			heading: 'Qualitative'
		}
	}

	handleClickOutside(){
	  this.setState({
	    listOpen: false
	  })
}

	toggleList=()=>{
		this.setState((previousState)=>({
					listOpen : ! previousState.listOpen
				}))
	}

	render(){

		const{list} = this.props
  		const{listOpen, heading} = this.state
  		console.log('menu')
  		console.log(list)

		return(


			<div className='dropdown'>
					<div className="dd-header" onClick={() => this.toggleList()}>
					    <div className="dd-header-title">{heading}</div>
					        {listOpen
					          ? <FontAwesomeIcon icon={faAngleUp} size="2x"/>
					          : <FontAwesomeIcon icon={faAngleDown} size="2x"/>
					        }
					    </div>

					{listOpen && <ul>
					       {list.map((item) => (
					         <li className="dd-list">{item}</li>
					        ))}
					      </ul>}
			</div>

			)
	}


}

export default onClickOutside(DropDownComponent)