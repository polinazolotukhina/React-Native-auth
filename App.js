import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';


class App extends Component {
    state ={ loggedIn: null };

    componentWillMount() {
        firebase.initializeApp(
            {
                apiKey: 'AIzaSyCFTGT-41tuggR3IHy13TjiKXUkf74N9UY',
                authDomain: 'my-mobile-app-aadf7.firebaseapp.com',
                databaseURL: 'https://my-mobile-app-aadf7.firebaseio.com',
                projectId: 'my-mobile-app-aadf7',
                storageBucket: 'my-mobile-app-aadf7.appspot.com',
                messagingSenderId: '590959121447'
            }
        );
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }
    renderContenet() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Button onPressProps={() => firebase.auth().signOut()} >
                        Log Out
                    </Button>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="My Auth!" />
                {this.renderContenet()}
            </View>
        );
    }
}
export default App;
