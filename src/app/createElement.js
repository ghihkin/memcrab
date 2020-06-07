import React from 'react'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {changeElemCount, lightElem, cleanLight} from '../store/actions'
import MatrixCreator from '../matrixCreator';
class CreateElem extends React.Component{
    MatrixCreator = new MatrixCreator();
    state = {
        hover:false,
        showPop:false
    }
    upCount = () =>{
        const {Amount, uid} = this.props.data;
        this.props.changeElemCount(this.MatrixCreator.__changeElemCountMatrix(Amount+1,uid,this.props.matrix))
    }
    findNear = () =>{
        const {Amount, uid} = this.props.data;
        this.props.lightElem(this.MatrixCreator.__findNearValue(Amount,uid,this.props.matrix))
    }
    cleanNear = () =>{
        this.props.cleanLight(this.MatrixCreator.__clearMatrix(this.props.matrix))
    }
    hideOneSec = () =>{
        setTimeout(()=>this.setState({showPop:false}),1000)
    }
    render(){
        const {data} = this.props
        const {hover,showPop} = this.state
        return(
                <div className="elem_box">
                        <div className={showPop?"popUp hover":"popUp"} onMouseOver={()=>this.setState({hover:true})} onMouseOut={()=>this.setState({hover:false})}>Click to up count</div>
                        <div className={data.light|| hover?"element near":"element"}
                            onMouseOver={()=>{this.findNear();this.setState({hover:true,showPop:true});this.hideOneSec()}}
                            onMouseOut={()=>{this.cleanNear();this.setState({hover:false,showPop:false})}}
                            onClick={this.upCount}>
                            {data.Amount}
                        </div>
                    </div>
        )
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        changeElemCount:bindActionCreators(changeElemCount,dispatch),
        lightElem:bindActionCreators(lightElem,dispatch),
        cleanLight:bindActionCreators(cleanLight,dispatch),
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, mapDispatchToProps)(CreateElem)
