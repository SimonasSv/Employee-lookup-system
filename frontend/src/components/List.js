import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { saveAs } from 'file-saver'
import TextField from '@mui/material/TextField';

const EmployeeList = () => {
    const [employees, setEmployee] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getEmployees();
    }, []);
 
    const getEmployees = async () => {
        const response = await axios.get('http://localhost:5000/employees');
        setEmployee(response.data);
    }
 
    const deleteEmployee = async (id) => {
        await axios.delete(`http://localhost:5000/employees/${id}`);
        getEmployees();
    }

    async function printTickets(name) {
        const { data } = await getTicketsPdf(name)
        const blob = new Blob([data], { type: 'application/pdf' })
        saveAs(blob, name+".pdf")
    }
      
    async function getTicketsPdf(name) {
        var fileName=name+".pdf";
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
        console.log(fileName);
        return axios.get(`http://localhost:5000/getPdf`, {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                filename: fileName
            },
            responseType: 'arraybuffer'
        })
    }

    return (
        <><div >
            <Link to="/add" className="button is-primary mt-2">Pridėti</Link>
            <TextField
                width="2ch"
                id="outlined-basic"
                variant="outlined"
                label="Ieškoti"
                size="small"
                margin="dense"
                onChange={event => { setSearchTerm(event.target.value); } } />
        </div><div>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>Nr.</th>
                            <th>Vardas</th>
                            <th>Pavardė</th>
                            <th>E-paštas</th>
                            <th>Tel. nr.</th>
                            <th>Gimė</th>
                            <th>CV</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.filter((val) => {
                            if (searchTerm == "")
                                return val;
                            else if (searchTerm.includes(" ")) {
                                const result = searchTerm.split(/\s+/);
                                if (result.length == 2) {
                                    if (result[1] == "") {
                                        if (val.Name.toLowerCase().includes(result[0].toLowerCase()))
                                            return val;
                                        else if (val.Surname.toLowerCase().includes(result[0].toLowerCase()))
                                            return val;
                                    }

                                    else {
                                        if (val.Name.toLowerCase().includes(result[0].toLowerCase()) && val.Surname.toLowerCase().includes(result[1].toLowerCase()))
                                            return val;
                                        else if (val.Name.toLowerCase().includes(result[1].toLowerCase()) && val.Surname.toLowerCase().includes(result[0].toLowerCase()))
                                            return val;
                                    }
                                }
                            }
                            else if (val.Name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            }
                            else if (val.Surname.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            }
                        }).map((employee, index) => (
                            <tr key={employee.id}>
                                <td>{index + 1}</td>
                                <td>{employee.Name}</td>
                                <td>{employee.Surname}</td>
                                <td>{employee.Email}</td>
                                <td>{employee.Phone}</td>
                                <td>{employee.Born}</td>
                                <td><button className="button is-small is-link" onClick={() => printTickets(employee.Name + employee.Surname)}>Atidaryti</button></td>
                                <td>
                                    <Link to={`/edit/${employee.id}`} className="button is-small is-info">Keisti</Link>
                                </td>
                                <td>
                                    <button /*className="delete is-medium"*/ onClick={() => deleteEmployee(employee.id)} className="button is-small is-danger">Ištrinti</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div></>
    )
}

export default EmployeeList