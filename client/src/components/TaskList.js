import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import styled, {createGlobalStyle, css} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to bottom, #09A8D3, #ACECE7);
    height: 100%;
    margin: 0;
    color: #555;
  }
`;

const Button = styled.button`
    background-color: black;
    color: white;
    font-size: 20px;
    padding: center;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
    width: 150px;
    height: 40px
`;

class TaskList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <GlobalStyle />
                <h2>Task List</h2>
                <table >
                    <tbody>
                        {
                            <tr>
                            <th className='Name'>Name</th>
                            <th className='title'>Rank</th>
                            <th className='task'>Task</th>
                            <th className='ddl'>Deadline</th>
                            </tr>
                        }
                    </tbody>
                    <tbody>
                        {
                            this.props.list.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.taskRank}</td>
                                    <td >{item.task}</td>
                                    <td >{item.ddl}</td>
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                                    <td className='Delete'><button onClick={() => this.props.handleDelete(item.id)}><i class="fa fa-close"></i>  Delete</button></td>
                                    <td className='Update'><Link to='/UpdateForm'><button onClick={() => this.props.handleInfo(item.id)}><i class="fa fa-bars"></i>  Update</button></Link></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <Link to='/form'><Button>Task From</Button></Link>
                
            </div>
        )
    }
}
export default TaskList