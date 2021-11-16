import React, { useState } from 'react'
import {CgCloseR} from 'react-icons/cg'


function Popup(props) {
    const [itemInput, setItemInput] = useState({'id': null, 'enimi':'', 'snimi':'', 'laji':'', 'syntymaika': ''});
    const [alert, setAlert] = useState(false);

    const slabel ={
        width : '110px',
        display : 'inline-block'
    }
   

    const styles1 = {
        position : 'fixed',
        top : '50%',
        left : '50%',
        transform : 'translate(-50%, -50%)',
        backgroundColor : '#FFF',
        padding : '50px',
        zIndex : 1000,


    }
    const stylesx = {
        position : 'fixed',
        top : '0',
        left : '95%'
    }
    const styles2 = {
        position : 'fixed',
        top : '0',
        left : '0',
        right : '0',
        bottom : '0',
        backgroundColor : 'rgba(0,0,0,.7)',
        zIndex : 1000
    }

    const handleSubmit = (e) => {
    
        setItemInput(itemInput['id'] = props.ids);
        console.log(JSON.stringify({itemInput}));
        e.preventDefault();
        
        fetch('http://localhost:3000/put', {
        method: 'PUT',
        headers: {
       'Content-Type': 'application/json'},
        body: JSON.stringify({itemInput})
        })
        .then(data => data.json());
  
        setItemInput('');
        setAlert(true);
        
      };


    return (props.open) ? (
        <div style = {styles2}>
            <div style = {styles1}>
                <CgCloseR style = {stylesx} onClick = {props.close}/>
                <form onSubmit={handleSubmit}>
                    <p>Muokkaa urheilijan tietoja</p>
                <div> 
                    <label style = {slabel}>etunimi</label>
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
            </div>

        </div>
        
    ) : '';
}

export default Popup

