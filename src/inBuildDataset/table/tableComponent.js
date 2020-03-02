import React from 'react';
import './tableComponent.scss';
import { connect} from 'react-redux';
import { inBuildDataHeader} from '../../redux/data/inBuildDataSelector';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css'
import { increaseLimit, decreaseLimit, startGettingTableHeader, startGettingTableColumn} from '../../redux/data/inBuildDataAction';

class TableComponent extends React.Component { 

	constructor(props){
		super(props)
	}

	render(){

	return(
		<div className=''>
	{!this.props.loadingCompleteTable?
		(		
		<div className='container'>

		 <div className='row'>
			<div className='col-md-6 offset-3'>
				<h1 className='heading'># Table <span className='sub'></span></h1>
			</div>
		</div>

			<div className='new'>
			<Table
				  loading={this.props.loadingTable}
		          height={250}
		          data={this.props.columnDataViaRedux}
		          onRowClick={data => {
		            //console.log(data);
		          }}
		        >
		        {this.props.headersViaRedux.map((item)=> {
		        	return(
		
		        	<Column width={150} >
		            <HeaderCell>{item}</HeaderCell>
		            <Cell dataKey={item} />
		          </Column>
		          
		          )})
		
		    	}
		          
		
		        </Table>
		    
			<nav className='newPage' aria-label="Page navigation">
			  <ul className="pagination">
			    <li className="page-item">
			      <button className="page-link page" onClick={ async ()=>{
            			await this.props.decreaseLimitViaRedux()
            			this.props.startLoadingColumn({name: this.props.datasetName, startValue: this.props.startValue})
            	}}  aria-label="Previous">
			        <span className='icon' aria-hidden="true">&laquo;</span>
			        <span className="sr-only">Previous</span>
			      </button>
			    </li>
			    <li className="page-item">
			      <button className="page-link page"  onClick={async ()=>{
                		await this.props.increaseLimitViaRedux()
            			this.props.startLoadingColumn({name: this.props.datasetName, startValue: this.props.startValue})
           		}} aria-label="Next">
			        <span className='icon' aria-hidden="true">&raquo;</span>
			        <span className="sr-only">Next</span>
			      </button>
			    </li>
			  </ul>
			</nav>
		    </div>

  		</div>
  				        ):null
		}
		</div>
  
	
	
		)
}
}

const mapStateToProps = (rootReducer)=>{
	return({
		headersViaRedux: rootReducer.inBuildData.tableHeader,
		columnDataViaRedux: rootReducer.inBuildData.tableColumn,
		loadingTable: rootReducer.inBuildData.loadingTable,
		loadingHeader: rootReducer.inBuildData.loadingTableHeader,
		datasetName: rootReducer.inBuildData.datasetName,
		startValue: rootReducer.inBuildData.startLimit,
		loadingCompleteTable: rootReducer.inBuildData.loadingCompleteTable

	})
}

const mapDispatchToProps = (dispatch)=>{
	return({
		startLoadingHeader:(limitObj)=>dispatch(startGettingTableHeader(limitObj)),
		startLoadingColumn:(limitObj)=> dispatch(startGettingTableColumn(limitObj)),
		increaseLimitViaRedux:()=> dispatch(increaseLimit()),
		decreaseLimitViaRedux:()=> dispatch(decreaseLimit())
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent)