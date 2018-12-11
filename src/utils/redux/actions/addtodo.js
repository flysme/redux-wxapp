import * as MUTATIONS from '../constants';
import { createAction } from '../redux-actions';



const state = {
    count: 0,
    timer: null
}





//使用用 redux-actions
export const waiting = createAction(MUTATIONS.WAITING,()=>{
        return {};
})


//未用 redux-actions



// export const waiting = ()=>{
//         return {
//             type:MUTATIONS.WAITING,
//         }
// }

// export const addtodos = ()=>{
//         return {
//             type:MUTATIONS.ADDTODO,
//             state
//         }
// }


//同步 action创建函数  返回 Object
// export const success = (state)=>{
//         return {
//             type:MUTATIONS.SUCCESS,
//             state
//         }
// }

// //异步 action创建函数 ReduxThunk 异步的 actions   action创建函数  返回 function
// export const async = ()=>{
//         return (dispatch)=>{
//             function fetch () {
//                 return new Promise((resolve,reject)=>{
//                     dispatch(waiting())
//                     setTimeout(_=>{
//                         resolve({name:'async'})
//                     },2000)
//                 })
//             }
//            return fetch().then(state=>{
//                dispatch(success(state))
//            })
//         }
// }
