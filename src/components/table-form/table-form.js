import React, { Component } from 'react';
import BtnCalc from '../btn-calc';
// import Axios from 'axios';

import './table-form.css'

export default class TableForm extends Component {
    constructor(props){
        super(props);
        this.date = [
            {registration: '', lastActivity: ''}
        ];
        this.createTable = [
            {id: 1, registration: '', lastActivity: ''},
            {id: 2, registration: '', lastActivity: ''},
            {id: 3, registration: '', lastActivity: ''},
            {id: 4, registration: '', lastActivity: ''},
            {id: 5, registration: '', lastActivity: ''}
        ];
        this.onValueChangeReg = this.onValueChangeReg.bind(this);
        this.onValueChangeLast = this.onValueChangeLast.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onValueChangeReg(id, value){
        const i = this.createTable.findIndex(elem => elem.id === id)
        this.createTable[i].registration = value
    }

    onValueChangeLast(id, value){
        const i = this.createTable.findIndex(elem => elem.id === id)
        this.createTable[i].lastActivity = value
    }

    async onSubmit(e){
        e.preventDefault();

        const url = 'https://abtestserv.herokuapp.com/app/insert'


        const saveTable = this.createTable.filter((index) => {
            if (!(index.registration.length === 0) || !(index.lastActivity.length === 0)){
                return {index}
            } else return false
        })

        async function fetchPostTable() {
            try {
                const response = await fetch (url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({saveTable})
                });
                const data = await response.json();
                console.log(data);
            } catch (e) {
                console.error(e);
            }

        }

        fetchPostTable();
        e.target.reset();
    }

    render(){
        const createTable = this.createTable.map(({id}) => {
            return(
                <tr key={id}>
                    <td>{id}</td>
                    <td>
                        <input
                            className='sub-date'
                            type='text'
                            onChange={(e) => this.onValueChangeReg(id, e.target.value)}
                            value={this.createTable.registration}/>
                    </td>
                    <td>
                        <input
                            className='sub-date'
                            type='text'
                            onChange={(e) => this.onValueChangeLast(id, e.target.value)}
                            value={this.createTable.lastActivity}/>
                    </td>
                </tr>
            )
        })
        return(
            <>
            <form onSubmit={this.onSubmit}>
                <table className='table-date'>
                    <thead>
                        <tr>
                            <th>UserID</th>
                            <th>Date Registration</th>
                            <th>Date Last Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createTable}
                    </tbody>
                </table>
                <button
                    type='submit'
                    className='btn'    
                >Save</button>
            </form>
            <BtnCalc getDate={this.createTable}/>
            </>
        )
    }
}