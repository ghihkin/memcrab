import React from 'react'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {deleteRow} from '../store/actions'
import MatrixCreator from '../matrixCreator';
class DeleteButton extends React.Component{
    MatrixCreator = new MatrixCreator();
    deleteButton = () =>{
        this.props.deleteRow(this.MatrixCreator.__deleteRow(this.props.matrix, this.props.rowInd))
    }
    render(){
        return(
            <div className="delete_row_elem">
                <button onClick={this.deleteButton}>Delete Row</button>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        deleteRow:bindActionCreators(deleteRow,dispatch),
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps,mapDispatchToProps)(DeleteButton)