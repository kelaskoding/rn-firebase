import React, {Component} from 'react'
import {Router, Scene} from 'react-native-router-flux';
import Home from './components/Home';
import Add from './components/Add';

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">                
                    <Scene key="home" component={Home} hideNavBar={true} initial={true}/>
                    <Scene key="add" component={Add} hideNavBar={true}/>
                </Scene>
            </Router>
        );
    }
}