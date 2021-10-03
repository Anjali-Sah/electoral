import React, { Component } from 'react';
import './Navbar.css'
import AccountImg from './../../assets/account.png'
import {login,logout,initContract} from './../../utils'


class Navbar extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
    render() {
        return (
            <div className='navBarBox'>
                <div className='title'>
                </div>
                <div className='Polls'>
             
                </div>
                <div onClick={(this.props.signedIn?logout:login)} className='Account'>
                {(this.props.signedIn)?this.props.accName:'Login to'}
                <img style={{width:'100px'}} src={AccountImg}></img>
                </div>
            </div>
        );
    }
}

export default Navbar;