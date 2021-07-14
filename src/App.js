import './App.css';
import SelectInput from './components/SelectInput';
import { useState } from 'react';
import List from './components/List';
import {Route,Switch} from 'react-router-dom';
import CustomForm from './components/customForm';

function App() {
  const [data,setData] = useState();
  const [id,setID]=useState(null);
  const set = (props) =>
  {
    setData(props);
  }
  const setPropId = (props) =>
  {
    setID(props)
  }
  return (
    <div>
      <Switch>
      <Route path='/' exact>
        <SelectInput id={id}/>
      </Route>
      <Route path='/list' >
        <List setD={set} setId={setPropId}/>
        </Route>
        <Route path='/form'>
         {data && <CustomForm data={data}/>}
        </Route>
        </Switch>
    </div>
  );
}

export default App;
