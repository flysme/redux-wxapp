import * as MUTATIONS from '../constants';
import { handleActions } from '../redux-actions';


const initialState = {
    bookList:[]
}

const todos = handleActions({
    [MUTATIONS.WAITING]: (state,action)=>{
        return {
            ...state,
            bookList:[
                {id:'1',name:'我的世界'},
                {id:'2',name:'我的世界'},
                {id:'3',name:'我的世界'}
            ]
        }
    }
},initialState)

export default todos






// const todos = (state = {},action) =>{
//     switch (action.type) {
//         case MUTATIONS.WAITING :
//          return Object.assign({},state,{iswaiting:'我实在waiting'})
//         case MUTATIONS.SUCCESS :
//          return Object.assign({},state,{count:action.state})
//         case MUTATIONS.ADDTODO :
//          return Object.assign({},state,{data:{name:'zfx'}})
//         default:
//          return state
//     }
// }
//
// export default todos
