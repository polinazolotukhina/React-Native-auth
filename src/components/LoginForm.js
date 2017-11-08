import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';


class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };
    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
    }
    onLoginFail(){
        this.setState({
            loading: false,
            error: 'Authentication failed'
        });
    }
    onLoginSuccess(){
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }
    renderButton(){
        if (this.state.loading) {
            return <Spinner size="small" />;
        }
        return (
            <Button onPressProps={this.onButtonPress.bind(this)}>
                Log In
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label='Email'
                        value={this.state.email}
                        placeholder='user@gmail.com'
                        onChangeText={x => this.setState({ email: x })}
                    />

                </CardSection>

                <CardSection>
                <Input
                    label='Password'
                    value={this.state.password}
                    placeholder='password'
                    secureTextEntry
                    onChangeText={x => this.setState({ password: x })}
                />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}
    const styles = {
        errorTextStyle: {
            fontSize: 20,
            alignSelf: 'center',
            color: 'red'
        }
    };
export default LoginForm;
