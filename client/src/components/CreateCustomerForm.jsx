import {useState} from 'react'
import Config from '../config/app.config'

export function CreateCustomerForm() {

  const [name, setName] = useState("")
  const [personOfContact, setPersonOfContact] = useState("")
  const [telephoneNumber, setTelephoneNumber] = useState("")
  const [city, setCity] = useState("")
  const [numberOfEmployees, setNumberOfEmployees] = useState(0)

  
  const resetFormState = () =>{
    setName("")
    setPersonOfContact("")
    setTelephoneNumber("")
    setCity("")
    setNumberOfEmployees(0)
  }

  const onClickCreate = async () => {
    try {
      await fetch(Config.apiUrl+"create", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, personOfContact, telephoneNumber, city, numberOfEmployees})
      })
    } catch {
      console.error({message:"error happened on click create"})
    } finally {
      resetFormState()
    }
    
  }
  
  const onInputChange = (e) =>{
    
    const {name, value} = e.target;

    switch(name){
      case 'name':
        setName(value)
        return
      case 'personOfContact':
        setPersonOfContact(value)
        return
      case 'telephoneNumber':
        setTelephoneNumber(value)
        return
      case 'city':
        setCity(value)
        return
      case 'numberOfEmployees':
        setNumberOfEmployees(value)
        return
      default:
        return
    }
  }

  return <>
    <h3>Add</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Person Of Contact</th>
          <th>Telephone</th>
          <th>City</th>
          <th>Number of employees</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <input type="text" name="name" placeholder="random company" value={name} onChange={onInputChange}/>
        </td>
        <td>
          <input type="text" name="personOfContact" value={personOfContact} placeholder="bob" onChange={onInputChange}/>
        </td>
        <td>
          <input type="text" name="telephoneNumber" value={telephoneNumber} placeholder="999-2222" onChange={onInputChange} />
        </td>
        <td>
          <input type="text" name="city" value={city} placeholder="toronto" onChange={onInputChange} />
        </td>
        <td>
          <input type="number" name="numberOfEmployees" value={numberOfEmployees} placeholder="1" min="0" onChange={onInputChange}/>
        </td>
        <td><button onClick={onClickCreate}>Create</button></td>
      </tr>
      </tbody>
    </table>
  </>
}