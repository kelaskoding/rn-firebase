
import React, { Component } from 'react'
import { Container, Header, Left, Icon, Right, Content, Button, Body, Text, View, Item, Textarea, Label, Input } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from "../utilities/Firebase";


export default class Add extends Component {

    constructor() {
        super();
        this.ref = firebase.firestore().collection("boards");
        this.unsubscribe = null;
        this.state = {
            title: '',
            description: '',
            author: '',
            isLoading: false,
        };
    }

    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

    saveBoard = () => {
        this.setState({
            isLoading: true,
        });
        this.ref.add({
            title: this.state.title,
            description: this.state.description,
            author: this.state.author,
        }).then((docRef) => {
            this.setState({
                title: '',
                description: '',
                author: '',
                isLoading: false,
            });
            Actions.home({ type: ActionConst.RESET });
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
                this.setState({
                    isLoading: false,
                });
            });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name='arrow-back' style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: '#fff' }}>Add Item</Text>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <View style={{ padding: 10 }}>
                        <Item floatingLabel>
                            <Label>Title</Label>
                            <Input onChangeText={(text) => this.updateTextInput(text, 'title')} value={this.state.title} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 5, marginBottom: 5 }}>
                            <Label>Author</Label>
                            <Input onChangeText={(text) => this.updateTextInput(text, 'author')} value={this.state.author} />
                        </Item>
                        <Textarea rowSpan={5} bordered placeholder='Description' value={this.state.description} onChangeText={(text) => this.updateTextInput(text, 'description')} />
                        <Button full primary style={{ marginTop: 20 }} onPress={this.saveBoard}>
                            <Text>Save</Text>
                        </Button>
                    </View>

                </Content>
            </Container>
        );
    }
}