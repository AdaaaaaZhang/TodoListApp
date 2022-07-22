import React, { Component } from 'react'
import {Link} from 'react-router-dom';

class CustomerList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <p>
                    Customer List
                </p>
                <table >
                    <tbody>
                        {
                            <tr>
                            <th className='Name'>Name</th>
                            <th className='Email'>Email</th>
                            <th className='Address'>Address</th>
                            </tr>
                        }
                    </tbody>
                    <tbody>
                        {
                            this.props.list.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.FirstName} {item.LastName}</td>
                                    <td>{item.Email}</td>
                                    <td >{item.Address}</td>
                                    <td className='Delete'><button onClick={() => this.props.handleDelete(item.id)}>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <Link to='/form'><button>Customer From</button></Link>
                
            </div>
        )
    }
}
export default CustomerList