/**
 * @file 程序主入口脚本
 * @Author wangjie19
 * @Date 2018-06-21 17:32:34
 * @Last Modified by: wangjie19
 * @Last Modified time: 2018-06-22 16:35:39
 */

import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import routes from './routes';

class App extends Component {
    render() {
        return (
            <div>
                <h1>hello walker</h1>
                <Router>
                    <div>
                        {
                            routes.map((route, index) => {
                                return (<Route key={index} path={route.path} component={route.component} exact={route.exact}/>);
                            })
                        }
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
