import React, {Component} from 'react';
import ihttp from '../../common/ihttp';
import './css/login';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        ihttp.get('https://www.1apiopen.top/weatherApi', {city: '西安'}).then(data => {
            console.log('success:', data);
        }).catch(err => {
            console.error('error:', err);
        });
        return (
            <h2 className="login-title">登录</h2>
        );
    }
}

export default Login;
