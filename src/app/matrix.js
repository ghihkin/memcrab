import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {addRow} from '../store/actions'
import CreateDeleteButton from './deleteButton'
import CreateSumElem from './createSum'
import CreateElem from './createElement'
import MatrixCreator from '../matrixCreator';

class CreateMatrixArea extends React.Component{
    MatrixCreator = new MatrixCreator();
    state = {
        showPercent:false
    }
    addRow = () =>{
        this.props.addRow(this.MatrixCreator.__createNewRow(this.props.matrix))
    }
    render(){
        return(
            <div className="matrix_area"> 
                <div className="matrix_area_row">
                    {this.props.matrix.map((el, indx)=>{
                            const column = el.map(col =>(<CreateElem data={col} key={col.uid+1000} />)) 
                            return (<div key={indx+6000} className="column">{column}</div>)
                        })}
                        <div className="delete_row_col">
                            <div className="create_row_button">
                                <button onClick={this.addRow}>Add Row</button>
                            </div>
                            {this.props.sum.map((el, indx)=>{
                                return(<CreateDeleteButton key={indx+5000} rowInd={indx}/>) 
                            })}
                        </div>
                        <div className="matrix_sum_col">
                            <div className="matrix_sum_head">
                                {this.state.showPercent?"Row Percent":"Row Sum"}
                            </div>
                            {this.props.sum.map((el,indx)=>{
                                return(<CreateSumElem
                                    key={indx+3000}
                                    data={el}
                                    indx={indx}
                                    show={this.state.showPercent}
                                    showPercent={()=>this.setState({showPercent:true})}
                                    hidePercent={()=>this.setState({showPercent:false})}
                                    />)
                            })}
                        </div>
                </div>
                <div className="matrix_mean_row">
                    {this.props.mean.map((el,indx)=>{
                        return(<div key={indx+2000} className="matrix_mean_box">{el}</div>)
                    })}
                    <div className="matrix_mean_head">
                        Column Mean
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        addRow:bindActionCreators(addRow,dispatch),
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps,mapDispatchToProps)(CreateMatrixArea)