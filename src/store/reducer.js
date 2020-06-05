const initialState = {
    matrix:[],
    M:'',
    N:'',
    mean:[],
    sum:[]
}
export default (state = initialState, action) =>{
    switch (action.type) {
        case 'ADD_VALUE':
            return {...state,...action.payload}
        case 'ADD_NEAR':
            return {...state,...action.payload}
        case 'CLEAN_NEAR':
            return {...state,...action.payload}
        case 'ADD_ROW':
            return {...state,matrix:action.payload,mean:action.payloadtwo,sum:action.payloadthree}
        case 'DELETE_ROW':
            return {...state,matrix:action.payload,mean:action.payloadtwo,sum:action.payloadthree}
        case 'CREATE_MATRIX':
            return {...state,matrix:action.payload,mean:action.payloadtwo,sum:action.payloadthree}
        case 'CHANGE_ELEM_COUNT':
            return {...state,matrix:action.payload,mean:action.payloadtwo,sum:action.payloadthree}
        default:
            return state
    }
    
}