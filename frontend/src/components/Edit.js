import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
 
const EditEmployee = () => {
    const [Name, setName] = useState('');
    const [Surname, setSurname] = useState('');
    const [Email, setEmail] = useState('');
    const [Born, setBorn] = useState('');
    const [Phone, setPhone] = useState('');
    const history = useNavigate();
    const { id } = useParams();
 
    const updateEmployee= async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/employees/${id}`,{
            Name: Name,
            Surname: Surname,
            Email: Email,
            Born: Born,
            Phone: Phone
        });
        history("/");
    }
 
    useEffect(() => {
        getEmployeeById();
    }, []);
 
    const getEmployeeById = async () => {
        const response = await axios.get(`http://localhost:5000/employees/${id}`);
        setName(response.data.Name);
        setSurname(response.data.Surname);
        setEmail(response.data.Email);
        setBorn(response.data.Born);
        setPhone(response.data.Phone);
    }
 
    return (
        <div>
            <form onSubmit={ updateEmployee }>
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
                        type="text"
                        placeholder="Pavardė"
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
                    <label className="label">Gimimo data</label>
                    <input 
                        className="input"
                        type="date"
                        placeholder="Born"
                        value={ Born }
                        onChange={ (e) => setBorn(e.target.value) }
                        required/>
                </div>

                <div className="field">
                    <label className="label">Tel. nr.</label>
                    <input 
                        className="input"
                        type="tel"
                        placeholder="+370"
                        pattern="[+370][0-9]{11}"
                        title="Pvz.: +37066666666"
                        value={ Phone }
                        onChange={ (e) => setPhone(e.target.value) }
                        required/>
                </div>
 
                <div className="field">
                    <button onClick={()=>Function() } className="button is-primary">Keisti</button>
                </div>
            </form>
        </div>
    )
}
 


export default EditEmployee