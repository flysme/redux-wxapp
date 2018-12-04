import * as MUTATIONS from '../constants';
let count = 0;

const todos = (state = {},action) =>{
    console.log(action,'action')
    switch (action.type) {
        case MUTATIONS.WAITING :
         return Object.assign({},state,{iswaiting:false})
        case MUTATIONS.SUCCESS :
         return Object.assign({},state,{count:action.state})
        case MUTATIONS.ADDTODO :
         return Object.assign({},state,{data:{name:'zfx'}})
        default:
         return state
    }
}

export default todos
