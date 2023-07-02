import Axios from 'axios'
import React, { useEffect, useState } from 'react';

function App() {

  const [employ, setEmploy] = useState([]);
  const [employDirect, setEmployDirect] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0)
  const [num, setNum] = useState(0)
  const { REACT_APP_API } = process.env;

  console.log("this is api:" + REACT_APP_API)

  console.log(REACT_APP_API + '/employees')


  
  const getEmployees = async () => {
    try {
      await Axios.get(REACT_APP_API + '/employees').then((res) => {
        setEmploy(res.data)
      })
    } catch (err) {
      console.log('Error fetching employees:', err)
    }

  }

  const getEmployeesDirect = async () => {
    try {
      await Axios.get("http://192.168.0.202:5000" + '/employees').then((res) => {
        setEmployDirect(res.data)
      })
    } catch (err) {
      console.log('Error fetching employees:', err)
    }

  }



  // const a = (x) => {
  //   return new Promise((resolve, reject) => {

  //   })
  // }

  // const b = new Promise((resolve, reject) => {

  // })



  const addEmployees = (event) => {
    event.preventDefault();
    if (!name || !age || !country || !position || wage === 0) {
      // Check if any of the fields are empty
      alert('Please fill in all the fields');
      return;
    }

    const newEmployee = {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }

    console.log(newEmployee)

    Axios.post('http://localhost:5000/create', newEmployee).then(() => {

      setEmploy([...employ, newEmployee])

    }).catch(error => {
      console('Error adding employee:', error);
    });
  }

  const updateEmployeeWage = (id) => {
    if (newWage === 0) {
      // Check if any of the fields are empty
      alert('Please fill in all the fields');
      return;
    }

    const newWageData = {
      id: id,
      wage: newWage
    }

    Axios.put('http://localhost:5000/update', newWageData).then((res) => {
      setEmploy(
        employ.map((val) => {
          return val.id == id ? {
            id: val.id,
            name: val.name,
            age: val.age,
            country: val.country,
            position: val.position,
            wage: newWage
          } : val
        }))
    })
    setNewWage()
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`).then((res) => {
      setEmploy(
        employ.filter((val) => {
          return val.id != id
        })
      )
    })
  }


  return (
    <div className="App ps-4 pe-4 pt-4 " >
      <h1>Employee Information</h1>
      <div className="information"><form>
        <div className='mb-3' >
          <label htmlFor='name' className='form-label'>Name:</label>
          <input id='name' type='text' className='form-control' onChange={(event) => { setName(event.target.value) }} placeholder='Enter name'></input>
        </div>
        <div className='mb-3' >
          <label htmlFor='age' className='form-label'>Age:</label>
          <input id='age' type='text' className='form-control' onChange={(event) => { setAge(event.target.value) }} placeholder='Enter age'></input>
        </div>
        <div className='mb-3' >
          <label htmlFor='country' className='form-label'>Country:</label>
          <input id='country' type='text' className='form-control' onChange={(event) => { setCountry(event.target.value) }} placeholder='Enter country'></input>
        </div>
        <div className='mb-3' >
          <label htmlFor='position' className='form-label'>Position:</label>
          <input id='position' type='text' className='form-control' onChange={(event) => { setPosition(event.target.value) }} placeholder='Enter position'></input>
        </div>
        <div className='mb-3' >
          <label htmlFor='wage' className='form-label'>Wage:</label>
          <input id='wage' type='number' className='form-control' onChange={(event) => { setWage(event.target.value) }} placeholder='Enter wage'></input>
        </div>
        <button className='btn btn-success' onClick={addEmployees}>Add Employee</button>
      </form>
      </div>
      <hr />
      <div className="employees">
        <button className='btn btn-primary' onClick={getEmployees}>Show Employee</button>
        <br /><br />
        {employ.map((val, index) => {
          return (
            <div className='employee card' key={index}>
              <div className='card-body text-left'>
                <p className='card-text'>Name: {val.name}</p>
                <p className='card-text'>Age: {val.age}</p>
                <p className='card-text'>Country: {val.country}</p>
                <p className='card-text'>Position: {val.position}</p>
                <p className='card-text'>Wage: {val.wage}</p>
                <div className='d-flex'>
                  <input type='text' style={{ width: '300px' }} placeholder='15000...'
                    className='form-control' onChange={(event) => setNewWage(event.target.value)}></input>
                  <button className='btn btn-warning' onClick={() => updateEmployeeWage(val.id)}>Update</button>
                  <button className='btn btn-danger' onClick={() => deleteEmployee(val.id)}>Delete</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="employees">
        <button className='btn btn-primary' onClick={getEmployeesDirect}>Show Employee Direct</button>
        <br /><br />
        {employDirect.map((val, index) => {
          return (
            <div className='employee card' key={index}>
              <div className='card-body text-left'>
                <p className='card-text'>Name: {val.name}</p>
                <p className='card-text'>Age: {val.age}</p>
                <p className='card-text'>Country: {val.country}</p>
                <p className='card-text'>Position: {val.position}</p>
                <p className='card-text'>Wage: {val.wage}</p>
               
              </div>
            </div>
          )
        })}
      </div>

    </div>
  );
}

export default App;
