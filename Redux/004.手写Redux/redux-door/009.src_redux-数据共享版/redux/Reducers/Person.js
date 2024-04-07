import { ADD_PERSON } from '../constant'
// 生成唯一Id值
import { nanoid } from "nanoid";
const initState = [{ id: nanoid(), name: "Tom", age: 18 }]
const personReducer = (preState = initState, action) => {
    console.log('@initState--personReducer', preState, action)

    const { type, data } = action
    switch (ADD_PERSON) {
        case type:
            return [{ id: nanoid(), ...data }, ...preState]
        default:
            return preState
    }
}

export default personReducer 
