# redux
小程序redux入门学习

## 快速上手

redux上手
```javascript
//redux 目录
//actions 分发动作
export const waiting = ()=>{
        return {
            type:MUTATIONS.WAITING,
        }
}
// reducer 处理函数 ，用于更改state
const todos = (state = {},action) =>{
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

```
## redux 三大特性
```
    ``1. 单一数据源       :  state 由一棵 object tree组成
    ``2. state不可变     : 确保view和API请求不能更改state
    ``3. reducer 纯函数  : 保证了数据可控性，没有副作用
```


## Note
业务侧可以自行判断数据是否加载完成，进而隐藏骨架屏，比如  
`<skeleton selector="skeleton" wx:if="{{showSkeleton}}"></skeleton>`  

以最小节点原则添加相应的class，比如
`<view class="box skeleton-rect">这是有margin和padding属性的文案</view>`
这里不要给view添加class，不然绘制区域会大很多，应该改成这样  
`<view class="box"><text class="skeleton-rect">这是有margin和padding属性的文案</text></view>`
