// import {createSlice} from '@reduxjs/toolkit';
import {createStore} from 'redux';

const initialvalue = {data:[
    {
        id:'1',
        inputType:['text'],
        value:[['name']],
        name:['name']
    }
]}
const reducer = (state=initialvalue,action) =>
{
    switch(action.type)
    {
        case 'GET_DATA':
            return state;
        case 'ADD_DATA':
            return({
                ...state,
                data:state.data.concat(action.data)
            })

        case 'DELETE_DATA':
           return {
				...state,
				data : state.data.filter(ele => ele.id !== action.data)
				}
        case 'UPDATE_DATA':
            console.log(action)
            return({
                ...state,

                data:state.data.map((vals,i) => vals.id === action.data.id ?{...vals,inputType:action.data.inputType,
                value:action.data.value,
                name:action.data.name}:vals)
            })
        default:
            return state;
    }
}

const store = createStore(reducer);
// export const actions = slice.actions;

export default store;