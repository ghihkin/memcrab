import React from 'react'
import {connect} from 'react-redux';
import {addValue, createMatrix} from '../store/actions'
import { bindActionCreators } from 'redux';
import CreateMatrixArea from './matrix'
import MatrixCreator from '../matrixCreator';
class App extends React.Component{
    MatrixCreator = new MatrixCreator();
    constructor(props){
        super(props)
        this.state ={
            openCount:false,
            M:props.M,
            N:props.N,
            X:props.X,
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.M !== this.props.M || prevProps.N !== this.props.N){
            this.props.createMatrix(this.MatrixCreator.__createMatrix(this.props.M, this.props.N))
        }
    }
    createRandomMatrix = () =>{
        const randomM = Math.floor(Math.random()*(19-10+1)+10);
        const randomN = Math.floor(Math.random()*(19-10+1)+10);
        this.props.addValue(randomM, randomN)
    }
    createCustomMatrix = () =>{
        if(this.state.M !== 0 && this.state.N !== 0 && this.state.M !== '' && this.state.N !== ''){
            this.props.addValue(this.state.M, this.state.N)
        }
        this.setState({openCount:!this.state.openCount,M:'',N:''})
    }
    render(){
        const {matrix} = this.props
        const {openCount, M, N,} = this.state;
        return(
            <section className="main_section">
                <div className="header_app">
                    <div className="welcome_message">
                        <h1>Welcome to test App</h1>
                        <p>created by Gleb Golian</p>
                    </div>
                    <div className="header_buttons_area">
                        <button className="header_button" onClick={this.createRandomMatrix}>Create Random Matrix</button>
                        <div className={openCount?"counts_area open":"counts_area"}>
                            <label>
                                M
                                <input type="text" placeholder="Number" className="header_input" value={M} onChange={(e)=>this.setState({M:e.target.value.replace(/[^\d]/,'')})}/>
                            </label>
                            <label>
                                N
                                <input type="text" placeholder="Number" className="header_input" value={N} onChange={(e)=>this.setState({N:e.target.value.replace(/[^\d]/,'')})}/>
                            </label>
                        </div>
                    <button className="header_button" onClick={this.createCustomMatrix}>{openCount?"Create Matrix":"Matrix with custom counts"}</button>
                    </div>
                </div>
                <div className="main_app">
                        {matrix.length !== 0?<CreateMatrixArea/>:(<div className="matrix_area"></div>)}
                </div>
            </section>
        )
    }
}
const mapDispatchToProps = (dispatch) =>{
   return {
    addValue: bindActionCreators(addValue,dispatch),
    createMatrix: bindActionCreators(createMatrix,dispatch),
   } 
}
const mapStateToProps = state => state;
export default connect(mapStateToProps,mapDispatchToProps)(App)