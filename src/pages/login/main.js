import React, {Component} from 'react';
import ihttp from '../../common/ihttp';
import './css/login';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        ihttp.get('https://www.apiopen.top/weatherApi', {city: '西安'});
        return (
            <h2 className="login-title">登录</h2>
        );
    }
}

export default Login;
