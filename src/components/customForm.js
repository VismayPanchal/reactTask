import React,{useState,useEffect} from 'react';
import api from './api';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
const CustomForm = (props) =>
{
   
    const data = props.data;
    const [submittedData, set]= useState([]);
    const history = useHistory()
    useEffect(()=>{
        set([])
    },[])
     //const total = data.inputType.length
    const submitHandler = (e) =>
    {
        e.preventDefault()
      
        // if(submittedData.length !== total)
        //     {

        //         alert("some data missing");
        //         alert("submitted length:",submittedData.length)
        //         alert("total length:",total)
        //         return
        //     }
        // damta.push(submittedData);
        // console.log(damta);
        var idData = { id : uuid()}
        var finalData ={...idData,submittedData}

        // var finalData = Object.assign({},idData,submittedData)
        history.push('/list')
        api.post('/data',finalData).then((res)=>console.log(res))
    }
    const changeHandler = (e,id,field,value) =>{
        console.log(e.target.value)
        const data ={
           
            field,
            value:e.target.value
        }
        submittedData.push(data)
    }
    const selectHandle = (e,id,name) =>
    {
        console.log(e)
        const data = {
            
            field:name,
            value:e.target.value
        }
        submittedData.push(data)
    }
    return(

        <form onSubmit={submitHandler}>
        
              <>
          
                {data.inputType.map((fields,i)=>(
                   <div>  
                     <label>Select {data.name[i]}</label><br></br> 
                   {fields === 'select' && (<select onChange={(e)=>{selectHandle(e,data.id,data.name[i])}}>
                        <option selected disabled>--select--</option>
                       {data.value[i].map((ops)=>
                        <option value={ops}>{ops}</option>
                       )}
                   </select>)}
                   {fields === 'textarea' && (<textarea></textarea>)}
                   {(fields!== 'select' && fields!=='textarea') &&
                   <>
                    {data.value[i].map((value)=>
                       <> <label>
                        <input type={fields} name={data.name} onChange={(e)=>{changeHandler(e,data.id,data.name[i],value)}}  />
                        {value}
                        </label><br></br>
                        </>
                    )
                    }
                </>}
                    </div>
                ))}
           
             </>
          
                
          {/* {data.inputType === 'select' && (<select>
              {data.value.map((ops)=>
              <option value={ops}>{ops}</option>)}
          </select>)}
          {data.value.map((val)=> 
          <>
         
         { data.inputType !== 'select' &&
       <label> <input type={data.inputType} name={data.name} value={val} />{val}
          </label> 
          }<br></br></>)} */}
         
         <input type="submit" className="btn btn-success" />

        </form>
    )
}

export default CustomForm;