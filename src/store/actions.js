export const createMatrix = ({matrix,mean,sum}) =>{
    return{
        type:'CREATE_MATRIX',
        payload:matrix,
        payloadtwo:mean,
        payloadthree:sum,
    }
}
export const addValue = (M,N) =>{
    return{
        type:'ADD_VALUE',
        payload:{M,N}
    }
}
export const changeElemCount = ({matrix,mean,sum}) =>{
    return{
        type:'CHANGE_ELEM_COUNT',
        payload:matrix,
        payloadtwo:mean,
        payloadthree:sum,
    }
}
export const lightElem = (matrix) =>{
    return{
        type:'ADD_NEAR',
        payload:{matrix},
    }
}
export const cleanLight = (matrix) =>{
    return{
        type:'CLEAN_NEAR',
        payload:{matrix},
    }
}
export const addRow = ({matrix,mean,sum}) =>{
    return{
        type:'ADD_ROW',
        payload:matrix,
        payloadtwo:mean,
        payloadthree:sum,
    }
}
export const deleteRow = ({matrix,mean,sum}) =>{
    return{
        type:'DELETE_ROW',
        payload:matrix,
        payloadtwo:mean,
        payloadthree:sum,
    }
}