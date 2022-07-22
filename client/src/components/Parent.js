import React, { Component } from 'react'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import UpdateForm from './UpdateForm'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Axios from 'axios';

export class Parent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            list: [],
            Name: '',
            title: 0,
            task: '',
            ddl: '',
            id: 0
        }
    }

    
    previousTasks = () => {
        Axios.get('http://localhost:3001/tasklist').then((response) => {
            this.setState({list: response.data, Name: '', title: 0, task: '', ddl: '', id: 0})
        });
    }

    addNewTask = (data) => {
        var list = this.state.list
        list.push(data)
        this.setState({list: list})
    }

    handleDelete = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
        var list = this.state.list
        list = list.filter(x=> x.id !== id)
        this.setState({list: list, Name: '', title: 0, task: '', ddl: '', id: 0})
        });
    }

    handleInfo = (id) => {
        var list2 = this.state.list
        list2 = list2.filter(y=> y.id == id)
        this.setState({list: list2, Name: list2[0].name, title: list2[0].taskRank, task: list2[0].task, ddl: list2[0].ddl, id: id})
    }
     
    render() {
        return (
            <div>
                <Router>
                    <div>
                    <Switch>
                        <Route exact path='/'>
                            <TaskList addNewTask={this.addNewTask}  list={this.state.list} handleDelete={this.handleDelete} previousTasks={this.previousTasks} handleUpdate={this.handleUpdate} handleInfo={this.handleInfo}></TaskList>
                        </Route>
                        <Route exact path='/form'>
                            <TaskForm addNewTask={this.addNewTask} list={this.state.list} previousTasks={this.previousTasks}></TaskForm>
                        </Route>
                        <Route exact path='/updateForm'>
                            <UpdateForm addNewTask={this.addNewTask} previousTasks={this.previousTasks} handleDelete={this.handleInfo} Name={this.state.Name} title={this.state.title} task={this.state.task} ddl={this.state.ddl} id={this.state.id}></UpdateForm>
                        </Route>
                    </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Parent
