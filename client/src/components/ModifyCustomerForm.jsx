export function ModifyCustomerForm() {
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
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Bob</td>
                    <td>123123</td>
                    <td>Toronto</td>
                    <td>2</td>
                    <td><button>Update</button></td>
                    <td><button>Delete</button></td>
                </tr>
            </tbody>
        </table>
    </>
}