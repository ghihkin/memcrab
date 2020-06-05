export default class MatrixCreator {
    __createMatrix(M,N){
        const matrix = []
        let uid = 0
        for(let i = 0; i < N; i++){
            const col = [];
            for(let j = 0; j < M; j++){
                const Amount = this._generateRandomNumber()
                col.push({uid,n:i,m:j,Amount, light:false})
                uid++
            }
            matrix.push(col)
        }
        const mean = this._calcMean(matrix)
        const sum = this._calcSum(matrix)
        return {matrix,mean,sum}
    }

    __createNewRow(matrix){
        const matrixWithNewRow = matrix.map(arr=>{
            const lastElem = arr.slice(-1)[0]
            const Amount = this._generateRandomNumber()
            const newArr = [...arr,{...lastElem,m:lastElem.m+1,Amount}]
            return newArr
        })
        const newMatrix = this._uniqueID(matrixWithNewRow)
        const mean = this._calcMean(newMatrix)
        const sum = this._calcSum(newMatrix)
        return {matrix:newMatrix,mean,sum}
    }

    __changeElemCountMatrix(Amount,uid,matrix){
        const newMatrix = matrix.map(col=>{
            return col.map(el=>{
                if(el.uid === uid){
                    return {...el,Amount} 
                }else{
                    return el
                }
            })
        })
        const withNewNear = this.__findNearValue(Amount,uid,newMatrix)
        const mean = this._calcMean(newMatrix)
        const sum = this._calcSum(newMatrix)
        return {matrix:withNewNear,mean,sum}
    }

    __deleteRow(matrix, rowInd){
        const newMatrix = matrix.map(arr=>arr.filter((el,index)=>index !== rowInd))
        const mean = this._calcMean(newMatrix)
        const sum = this._calcSum(newMatrix)
        return {matrix:newMatrix,mean,sum}
    }

    __findNearValue(Amount,uid, matrix){
        const flatMatrix = matrix.flat().filter(el=>el.uid !== uid);
        const nearValues = flatMatrix.map(el=>el.Amount).sort((a, b) => {
            return Math.abs(Amount - a) - Math.abs(Amount - b);
        })
        let nearValuesArr = nearValues.length > 10?nearValues.slice(0, 10):nearValues;
        const newMatrix = this._addNearToMatrix(matrix,nearValuesArr)
        return newMatrix
    }

    __clearMatrix(matrix){
        return matrix.map(col=>{
            return col.map(el=>({...el,light:false}))
        })
    }

    __findRowForLight(matrix, rowId = 0){
        const rowMatrix = matrix.map((arr)=>{
                return arr.map((elem,ind)=>{
                    if(ind === rowId){
                        return{...elem,light:true}
                    }else{
                        return elem
                    }
                })
        })
        return rowMatrix
    }
    
    //functions for local

    _addNearToMatrix(matrix, nearValues){
        return matrix.map(col=>{
            return col.map(el=>{
                if(nearValues.includes(el.Amount)){
                    return{...el,light:true}
                }else{
                    return {...el,light:false}
                }
            })
        })
    }

    _calcMean(matrix){
        const calcMean = matrix.map(el=>{
            let meanCount = 0;
            el.forEach(obj=>{
                meanCount += obj.Amount
            })
            return (meanCount / el.length).toFixed()
        })
        return calcMean
    }

    _calcSum(matrix){
        const row = matrix.map(el=>el.map(obj=>obj.Amount))
        const matrixM = this._rowMatrix(row)
        const sum = matrixM.map(arr=>arr.reduce((acc, cur)=>acc+cur))
        const Allsum = this._getAllSum(matrix)
        const sumWithPercent = sum.map(el=>({sum:el,percent:((100 * el) / Allsum).toFixed(2)}))
        return sumWithPercent
    }

    _rowMatrix(row){
        const matrixM = []
        const maxRowLength = Math.max(...row.map(arr=>arr.length))
        for (let i = 0; i < maxRowLength; i++) {
            matrixM.push(row.map(el => el[i]))
        }
        return matrixM
    }

    _getAllSum(matrix){
        return matrix.map(el=>el.map(obj=>obj.Amount)).flat().reduce((acc, cur)=>acc+cur)
    }

    _generateRandomNumber(){
        return Math.floor(Math.random()*(999-100+1)+100)
    }

    _uniqueID(matrix){
        let uid = 0
        return matrix.map(arr=>arr.map(el=>({...el,uid:uid++})))
    }

}