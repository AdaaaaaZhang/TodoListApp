import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import styled, {createGlobalStyle, css} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to bottom, #f05053, #e1eec3);
    height: 100%;
    margin: 0;
    color: #555;
  }
`;

const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  max-height: 800px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyles}
`;

const StyledTextArea = styled.textarea`
  background-color: #eee;
  width: 100%;
  min-height: 100px;
  resize: none;
  ${sharedStyles}
`;
const StyledButton = styled.button`
  display: block;
  background-color: #f7797d;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: center;
  cursor: pointer;
  box-sizing: border-box;
  margin: auto;
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
    height: 40px;
`;

const StyledError = styled.div`
  color: red;
  font-weight: 800;
  margin: 0 0 40px 0;
`;



class TaskForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Name: '',
            title: 0,
            task: '',
            ddl: '',
            nameError: '',
            titleError: '',
            taskError: '',
            ddlError: ''
        }
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    validate = () => {
        let nameError = '';
        let titleError = '';
        let taskError = '';
        let ddlError = '';

        if(!this.state.Name){
            nameError = 'Name cannot be blank'
        }
        if(!this.state.title){
            titleError = 'Title cannot be blank'
        }
        
        if(!this.state.task){
            taskError = 'Task cannot be blank'
        }
        if(!this.state.ddl){
            ddlError = 'Deadline cannot be blank'
        }

        if(nameError || titleError || taskError || ddlError) {
            this.setState({nameError: nameError, titleError: titleError, taskError: taskError, ddlError: ddlError});
            return false;
        }

        return true;
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const isValid = this.validate()
        if(isValid){
            this.props.addNewTask(this.state)
            Axios.post('http://localhost:3001/create', {Name: this.state.Name, title: this.state.title, task: this.state.task, ddl: this.state.ddl});
            this.setState({
                Name: '',
                title: 0,
                task: '',
                ddl: '',
                nameError: '',
                titleError: '',
                taskError: '',
                ddlError: ''
            })
        }
        
    }

    render() {
        return (
            <>
            <GlobalStyle />
            <StyledFormWrapper>
                <StyledForm onSubmit={this.handleSubmit} autoComplete='off'>
                    <h2>Task Assigned</h2>
                    
                    <label htmlFor="Name"></label>
                    <StyledInput
                    type = 'text'
                    name='Name' 
                    placeholder='Name' 
                    value={this.state.Name} 
                    onChange={this.handleInputChange} />
                    <div style={{fontSize: 12, color: 'red'}}>{this.state.nameError}</div>
                    
                    <label htmlFor="title"></label>
                    <StyledInput
                    style={{height: '25px'}}
                    name='title' 
                    type="number"
                    value={this.state.title} 
                    onChange={this.handleInputChange} /> 
                    <div style={{fontSize: 12, color: 'red'}}>{this.state.titleError}</div>

                    <label htmlFor="task"></label>
                    <StyledTextArea
                    style={{height: '25px'}}
                    name='task' 
                    placeholder='Task' 
                    value={this.state.task} 
                    onChange={this.handleInputChange} /> 
                    <div style={{fontSize: 12, color: 'red'}}>{this.state.taskError}</div>

                    <label htmlFor="ddl"></label>
                    <StyledInput 
                    style={{height: '25px'}}
                    name='ddl' 
                    placeholder='Deadline' 
                    value={this.state.ddl} 
                    onChange={this.handleInputChange} /> 
                    <div style={{fontSize: 12, color: 'red'}}>{this.state.ddlError}</div>

                    <StyledButton type='submit'>Submit</StyledButton>
                    <Link to='/'><Button onClick={this.props.previousTasks}>Task List</Button></Link>
                </StyledForm>
            </StyledFormWrapper>
            
            </>
        // <div>
        //     <form onSubmit={this.handleSubmit} autoComplete='off'>
                // <input 
                //     style={{height: '25px'}}
                //     name='Name' 
                //     placeholder='Name' 
                //     value={this.state.Name} 
                //     onChange={this.handleInputChange} /> 
                // <div style={{fontSize: 12, color: 'red'}}>{this.state.nameError}</div>
                
                // <input 
                //     style={{height: '25px'}}
                //     name='title' 
                //     type="number"
                //     value={this.state.title} 
                //     onChange={this.handleInputChange} /> 
                // <div style={{fontSize: 12, color: 'red'}}>{this.state.titleError}</div>

                // <input 
                //     style={{height: '25px'}}
                //     name='task' 
                //     placeholder='Task' 
                //     value={this.state.task} 
                //     onChange={this.handleInputChange} /> 
                // <div style={{fontSize: 12, color: 'red'}}>{this.state.taskError}</div>
                
                // <input 
                //     style={{height: '25px'}}
                //     name='ddl' 
                //     placeholder='Deadline' 
                //     value={this.state.ddl} 
                //     onChange={this.handleInputChange} /> 
                // <div style={{fontSize: 12, color: 'red'}}>{this.state.ddlError}</div>
                
        //         <button type='submit'>Submit</button>
        //     </form>
        //     <Link to='/'><button onClick={this.props.previousTasks}>Task List</button></Link>
        // </div>
        )
    }
}

export default TaskForm