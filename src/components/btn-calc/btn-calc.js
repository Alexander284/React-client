import React, { Component } from 'react';
import './btn-calc.css' 


export default class BtnCalc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res: 0,
            countRegistration: 0,
            countLasActivity: 0
        }
        this.showClass = 'hide';
        this.onCalc = this.onCalc.bind(this);
    }

    onCalc(){
        const {getDate} = this.props;
        let countLasActivity = 0;
        let countRegistration = 0;
        const nowADays = new Date();
        this.showClass = 'show';
        
        getDate.map(element => {
            let {registration, lastActivity} = element;
            registration = registration.split('.').reverse().join('-');
            lastActivity = lastActivity.split('.').reverse().join('-');
            
            registration = new Date(registration);
            lastActivity = new Date(lastActivity);

            if ((nowADays - 7 * 24 * 3600 * 1000) >= registration) countRegistration++

            if((lastActivity - 7 * 24 * 3600 * 1000) >= registration) countLasActivity++
            return (
                this.setState(({res}) => ({
                    res: countLasActivity / countRegistration * 1
                }))
            )
        })
    }

    render(){
        const {res} = this.state
        
        return (
            <div>
                <button
                    type='button'
                    className='btn'
                    onClick={this.onCalc}
                >Calculate</button>
                <span className={this.showClass}> Rolling Retention 7 day: {res}</span>
            </div>
        )
    }
    
}

