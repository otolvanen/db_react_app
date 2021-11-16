//cd front --> npm start
import React, { useEffect, useState } from 'react';
import './App.css';
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import Popup from './components/Popup';



function App() {
  const [list, setList] = useState([]);
  const [itemInput, setItemInput] = useState({'enimi':'', 'snimi':'', 'laji':'', 'syntymaika': ''});
  const [alert, setAlert] = useState(false);
  const [trig, setTrig] = useState(false);
  const [editid, setEditid] = useState({'id' : null});


const slabel ={
  width : '110px',
  display : 'inline-block'
}

const ul ={
 
  display : 'inline-block'
}

  useEffect(() => {
    let mounted = true;
    fetch('http://localhost:3000/get').then(response => response.json())
      .then(items => {
        if(mounted) {

        
          setList(items.data)
        }
      })
    return () => mounted = false;
    }, [])

    const handleSubmit = (e) => {
      console.log(JSON.stringify({itemInput}));
      e.preventDefault();
      
      fetch('http://localhost:3000/post', {
      method: 'POST',
      headers: {
     'Content-Type': 'application/json'},
      body: JSON.stringify({itemInput})
      })
      .then(data => data.json());

      setItemInput('');
      setAlert(true);
      
    };

    const delete_item = id =>{
      const remove = [...list].filter(item => item.id !== id)
      setList(remove)

    } 

    const handleClick = id =>{
      delete_item(id)
      fetch('http://localhost:3000/delete/' + id, {
      method: 'DELETE'
      })
      .then(data => data.json());
    }

    const convert_date = date =>{
      /*
      if (date !== null){

        var str = new Date(date);
        const day = (str.getDay()).toString()
        const month = str.getMonth().toString()
        const year = str.getFullYear().toString()
        date = day + '-' + month + '-' + year;
      }
      */
      
     
      var str;
      if (date !== null){
        str = date.slice(0,10)
      }
      
      
      return str
    }

    const handleClick_edit = idd =>{
      
      
      setEditid(editid['id'] = idd);
      console.log(editid);

      setTrig(true);
    }



  return (
    <div className="App">
      <header className="App-header">
       Terve!
      </header>
      <h1>Urheilijat</h1>
      <div>
        <ul style = {ul} >{list.map(item => <li key={item.id}>{item.enimi}, {item.snimi}, {item.laji}, {convert_date(item.syntymaika)} <TiEdit  onClick = {() => handleClick_edit(item.id)}/> <RiCloseCircleLine onClick = {() => handleClick(item.id)}/></li>)}</ul>
      </div>
      <form onSubmit={handleSubmit}>
        <p>Lisää urheilija</p>
        <div> 
          <label  style = {slabel}>etunimi</label>
          <input type="text" name = 'enimi' onChange={event => setItemInput({...itemInput, [event.target.name] : event.target.value})}/>
        </div>
        <div>
          <label  style = {slabel}>sukunimi</label>
          <input type="text" name = 'snimi' onChange={event => setItemInput({...itemInput, [event.target.name] : event.target.value})}/>
        </div>
        <div>
          <label  style = {slabel}>laji</label>
          <input type="text" name = 'laji' onChange={event => setItemInput({...itemInput, [event.target.name] : event.target.value})}/>
        </div>
        <div>
          <label  style = {slabel}>syntymaika</label>
          <input type="text" name = 'syntymaika' onChange={event => setItemInput({...itemInput, [event.target.name] : event.target.value})}/>
        </div>

       {alert && <h2> Submit Successful</h2>}
       {!alert && <div><button type="submit">Submit</button></div>}
       
     </form>
     <Popup open = {trig} ids = {editid} close = {() => setTrig(false)}/>

    </div>
  );
}
//{list.map(item => <li key={item.item}>{item.item}</li>)}
export default App;
