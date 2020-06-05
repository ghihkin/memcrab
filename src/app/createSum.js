import React from 'react'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {lightElem, cleanLight} from '../store/actions'
import MatrixCreator from '../matrixCreator';
class CreateSumElem extends React.Component{
    MatrixCreator = new MatrixCreator();
    state = {
        showDeleteButton:false
    }
    showPercent = () =>{
        const {matrix, indx} = this.props;
        this.props.showPercent()
        this.props.lightElem(this.MatrixCreator.__findRowForLight(matrix,indx))
    }
    hidePercent = () =>{
        this.props.hidePercent()
        this.props.cleanLight(this.MatrixCreator.__clearMatrix(this.props.matrix))
    }
    render(){
        const {sum, percent} = this.props.data
        return(
            <div className="matrix_sum_box"
                onMouseOver={()=>this.showPercent()}
                onMouseOut={()=>this.hidePercent()}
                >
                {this.props.show?`${percent}%`:sum}
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        lightElem:bindActionCreators(lightElem,dispatch),
        cleanLight:bindActionCreators(cleanLight,dispatch),
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, mapDispatchToProps)(CreateSumElem)