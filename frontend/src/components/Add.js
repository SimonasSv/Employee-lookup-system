import { useState } from 'react'
import axios from "axios";
import { renderMatches, useNavigate } from 'react-router-dom';
 
export const AddEmployee = () => {
    const [Name, setName] = useState('');
    const [Surname, setSurname] = useState('');
    const [Email, setEmail] = useState('');
    const [Born, setBorn] = useState('');
    const [Phone, setPhone] = useState('');
    const [file, setFile] = useState('');
    const history = useNavigate();
 
    const saveEmployee = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/employees',{
            Name: Name,
            Surname: Surname,
            Email: Email,
            Born: Born,
            Phone: Phone
        });

        const data = new FormData();
        var fileName=Name+Surname+".pdf";
        var translate={
            "ą": "a", "č": "c", "ę": "e", "ė": "e", "į": "i", "š": "s", "ų": "u", "ū": "u", "ž": "z",
            "Ą": "A", "Č": "C", "Ę": "E", "Ė": "E", "Į": "I", "Š": "S", "Ų": "U", "Ū": "U", "Ž": "Z"
        };

        var rx = /(ą|č|ę|ė|į|š|ų|ū|ž|Ą|Č|Ę|Ė|Į|Š|Ų|Ū|Ž)/g;

        // if any non-english charr exists,replace it with proper char
        if (rx.test(fileName)) {
            fileName = fileName.replace(rx, function(m, key, index) {
          return translate[key];
         });
        }
        //const fileName=Email+".pdf";
        data.append('file', file, fileName);

        axios.post('http://localhost:5000/upload', data)
            .then((e)=>{
                console.log("Success");
            })
            .catch((err)=>{
                console.log("Error",err);
            })
        
        
        history("/");
    }
   
    const onInputChange= (e)=>{
        console.log(e.target.files);
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <form onSubmit={ saveEmployee}>
                <div className="field">
                    <label className="label">Vardas</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Vardas"
                        value={ Name }
                        onChange={ (e) => setName(e.target.value) }
                        required/>
                </div>
 
                <div className="field">
                    <label className="label">Pavardė</label>
                    <input 
                        className="input"
                        type="Pavardė"
                        placeholder="Surname"
                        value={ Surname }
                        onChange={ (e) => setSurname(e.target.value) }
                        required/>
                </div>

                <div className="field">
                    <label className="label">E-paštas</label>
                    <input 
                        className="input"
                        type="email"
                        placeholder="E-paštas"
                        value={ Email }
                        onChange={ (e) => setEmail(e.target.value) }
                        required/>
                </div>

                <div className="field">
                    <label className="label">Born</label>
                    <input 
                        className="input"
                        type="date"
                        placeholder="Gimimo data"
                        value={ Born }
                        onChange={ (e) => setBorn(e.target.value) }
                        required/>
                </div>

                <div className="field">
                    <label className="label">Tel. nr.</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="+370"
                        pattern="[+370][0-9]{11}"
                        title="Pvz.: +37066666666"
                        value={ Phone }
                        onChange={ (e) => setPhone(e.target.value) }
                        required/>
                </div>
                
                <div className="field">
                    <label className="label">CV:</label>
                    <input
                        name="file"
                        id="fileName"
                        className="input"
                        type="file"
                        onChange={onInputChange}
                    />
                </div>
                <div className="field">
                    <button className="button is-primary">Išsaugoti</button>
                </div>
            </form>
        </div>
    )
}



export default AddEmployee