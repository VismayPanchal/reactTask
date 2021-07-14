import React from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
const List = (props) =>
{
    const dispatch = useDispatch()
    const his  = useHistory();
    const data = useSelector((state)=>state.data);
    console.log(data);
    const showForm = (values) =>
    {
        // localStorage.setItem('vals',values);
        props.setD(values);
        his.push('/form')
    }
    const goback = () =>
    {
        his.push('/')
    }
    const deleteForm = (e) =>
    {
        dispatch({type:'DELETE_DATA',data:e})
        // his.push('/list')
    }
    const editForm = (values) =>
    {
        props.setId(values)
        his.push('/')
    }
    return(
        <table className="table">
            <thead>
                <th>Template Name</th>
                <th>Input Type</th>
                <th>Values</th>
                <th>edit</th>
                <th>View</th>
                <th>Delete</th>
            </thead>
            <tbody>
            {data.map((list)=>(
                <tr>
                    <td>{list.name.map((vl)=>(<p>{vl},</p>))}</td>
                    <td>{list.inputType.map((val)=>(<p>{val},</p>))}</td>
                    <td>{list.value.map((val)=>(<p>{
                        val.map((inter)=>(<label>{inter},</label>))
                    }</p>))}</td>
                    
                    <td><button className='btn btn-info' onClick={()=>{editForm(list)}}>Edit</button></td>
                    <td><button className='btn btn-success' onClick={()=>{showForm(list)}}>View</button></td>
                    <td><button className='btn btn-danger' onClick={()=>deleteForm(list.id)}>Delete</button></td>
                </tr>
            ))}
            
            </tbody>
                <button className='btn btn-primary' onClick
                ={goback}>Go back</button>
        </table>
    )
}

export default List;