import React,{useEffect, useState} from 'react';
import './SelectInput.css';
import {useDispatch} from 'react-redux';
// import { actions } from '../store/store';
import {useHistory} from 'react-router-dom';
import uuid from 'react-uuid';
const SelectInput = (props) =>
{
   
    const Two_D = [
        ['',''],['','']
    ]
    const history = useHistory();
    const dispatch = useDispatch();
    const [totalInputList,setTotalInputList] = useState([{value:''}]);
    const [totalFields,setTotalFields] = useState([{field:''}])
    //const selectedInputRef = useRef();
    const [selectedInput,setSelectedInput]= useState([]);
    //const valueRef = useRef();
    const [values,setValues]= useState(Two_D)

    const [name,setName] = useState([])

    useEffect(()=>{
       console.log("props",props)
        if(props.id!==null)
        {
                setName(props.id.name)
                setTotalFields(props.id.inputType)
                setTotalInputList(props.id.value[0])
                setSelectedInput(props.id.inputType)
                setValues(props.id.value)
        }
    },[props])
    
    const selectHandler = (e,index) =>
    {
        const {  value } = e.target;
        // const list = [...selectedInput];
        // list[index] = value;
        setSelectedInput([...selectedInput,value]);
        // selectedInputRef.current = e.target.value
    }
    const addAnotherValue = (e) =>
    {
       
            const name = e.target.name;
            //setTotalInputList([...totalInputList,{field:''}]);
            // setTotalFields([...totalFields,name])
        
       
        // console.log(e.target.key,"sv")
        e.preventDefault()
        //const name = e.target.name;
        setTotalInputList([...totalInputList,name]);

    }
    const addAnotherField = (e) =>
    {
        e.preventDefault()

        const blank = ['','']
        // values.concat(blank)   
        setValues([...values,blank])
        console.error()
        const name = e.target.name;
    
        setTotalFields([...totalFields,name])

     
    }
    const deleteField = (e) =>
    {
      
        // const list = [...totalFields];
        // list.splice(e,1)
        
        // setTotalFields(list)
        const list = [...totalInputList];
        list.splice(e,1)
        setTotalInputList(list)
        const valueList = [...values]

        
        var len = values.length
        if(values[len-1][len-1]==='')
        valueList.pop(len-1)
        len = values[0].length
        console.log(len,"length")
        console.log(valueList,"val");   
         valueList[0].splice(e,1);
        console.log(valueList,"val")
        
        setValues(valueList)


        const inputList = [...selectedInput]
        inputList.splice(e,1)
        setSelectedInput(inputList)

    }
    const deleteCurrent = (e) =>
    {
       

        // e.preventDefault()
        console.log(e)
        const list = [...totalInputList];
        list.splice(e,1)
        setTotalInputList(list)

       // var len = values.length

        const valueList = [...values]
        console.log(valueList,"val")
        valueList.splice(e,1);
        setValues(valueList)


       
        console.log(totalInputList)

        const listF = [...totalFields];
        listF.splice(e,1)
        
        setTotalFields(listF)




        const inputList = [...selectedInput]
        inputList.splice(e,1)
        setSelectedInput(inputList)

        const nameList = [...name]
        nameList.splice(e,1)
        setName(nameList)
    }
    const nameHandler = (e,i) =>
    {
        const {value} = e.target;
        const list = [...name];
        list[i] = value;
        setName(list)
        // setName([...name,e.target.value])
    }
    const valueAdd = (e,i,index) =>
    {
        const {  value } = e.target;
         var list = [...values];
         list[i][index] = value;
         console.log("i,",i,"index,",index)
        // setValues(list);
        values.concat(list)
        console.log(values,"lmost")
    }
    const submit = (e) =>
    {
        e.preventDefault()
        //setValues([...values,valueRef.current.value])
        var len =values.length
        if(values[len-1][len-1]==='')
         values.pop(len-1)
        let data;
        if(props.id!==null)
        {
             data ={
                id:props.id.id,
                inputType:selectedInput,
                value:values,
                name
            }
        dispatch({type:'UPDATE_DATA',data})

        }
        // props.setSubmit(true);
        else{
         data ={
            id:uuid(),
            inputType:selectedInput,
            value:values,
            name
        }
        dispatch({type:'ADD_DATA',data})
    
    }
        history.push('/list')
    }
    return(
        <>
     
            {totalFields.map((field,index)=>
              <>
              <select key={index} onChange={(e)=>selectHandler(e,index)} name="field" >
                <option selected disabled>--select a input typpe--</option>
                <option value='radio'>radio</option>
                <option value='checkbox'>checkbox</option>
                <option value='text'>Text</option>
                <option value='textarea'>Text Area</option>
                <option value='select'>Select- dropdown</option>
                
            </select>
            {totalFields.length !==1 && (<button  className="btn btn-danger" onClick={()=> deleteCurrent(index)}>delete</button>)}
                {totalFields.length-1 === index && (<button  className='btn btn-primary' key={field.id} onClick={(e)=>{addAnotherField(e,index)}}>Add</button>)}
          
               {totalInputList.map((input,i)=>
               <div key={i}> <label>value {i+1}
                <input  type="text" value={props.id && values[index][i]}   onChange={(e)=>{valueAdd(e,index,i)}}  name="value" />
            </label>
            {totalInputList.length !== 1 && (<button  className="btn btn-danger " onClick={()=>deleteField(i)}>remove</button>)}
           {totalInputList.length-1 === i && (<button  className="btn btn-primary" key={input.id} onClick={addAnotherValue}>add</button>)}
            </div>
            )}
           <label> name<input type="text" value={name[index]} onChange={(e)=>{nameHandler(e,index)}}/>
           </label><br></br>
           </>
            )}
            <button className="btn btn-success" onClick={submit}>submit</button>
        </>
    )
}

export default SelectInput;