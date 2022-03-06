import { useState, useEffect, useCallback } from "react"
import appConfig from "../config/app.config"

export function ModifyCustomerForm() {

    const [customers, setCustomers] = useState([])

    const getCustomers = useCallback(async () => {
        const resp = await fetch(appConfig.apiUrl + "all")
        const data = await resp.json()
        setCustomers(data)
    }, [])

    const onClickDelete = async (customerId) => {
        await fetch(appConfig.apiUrl + "delete", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: customerId })
        })
    }

    const onClickUpdate = async (customerId, data) => {
        await fetch(appConfig.apiUrl + "update", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: customerId, data })
        })
    }
    useEffect(() => {
        getCustomers()
    }, [getCustomers])

    const customersLisTableJSX = customers.map(customer => 
        <CustomerDataRow key={customer._id} customer={customer} onClickDelete={onClickDelete} onClickUpdate={onClickUpdate}/>)
    return <>
        <h3>List Of Customers</h3>
        <table>
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Person Of Contact</th>
                    <th>telephone</th>
                    <th>City</th>
                    <th>Number of employees</th>
                    <th>Should Recommend Umbrella?</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {customersLisTableJSX}
            </tbody>
        </table>
    </>
}

const CustomerDataRow = ({ customer, onClickDelete, onClickUpdate }) =>{

    const [name, setName] = useState(customer.name)
    const [personOfContact, setPersonOfContact] = useState(customer.personOfContact)
    const [telephoneNumber, setTelephoneNumber] = useState(customer.telephoneNumber)
    const [city, setCity] = useState(customer.city)
    const [numberOfEmployees, setNumberOfEmployees] = useState(customer.numberOfEmployees)

    const onInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
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

    return <tr key={customer._id}>
        <td><input type="text" name="name" value={name} onChange={onInputChange} /></td>
        <td><input type="text" name="personOfContact" value={personOfContact} onChange={onInputChange} /></td>
        <td><input type="text" name="telephoneNumber" value={telephoneNumber} onChange={onInputChange} /></td>
        <td><input type="text" name="city" value={city} onChange={onInputChange}/></td>
        <td><input type="number" name="numberOfEmployees" value={numberOfEmployees} onChange={onInputChange} /></td>
        <td>{"" + customer.shouldRecommendUmbrella}</td>
        <td><button onClick={() => onClickUpdate(customer._id, { name, personOfContact, telephoneNumber, city, numberOfEmployees })}>Update</button></td>
        <td><button onClick={() => onClickDelete(customer._id)}>Delete</button></td>
    </tr>
}