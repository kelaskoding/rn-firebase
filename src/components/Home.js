import React, { Component } from "react";
import {
  Container,
  Header,
  Body,
  Content,
  View,
  List,
  ListItem,
  Text,
  Right,
  Icon,
  Button
} from "native-base";
import firebase from "../utilities/Firebase";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";
import { Actions } from "react-native-router-flux";

export default class Home extends Component {
  
  constructor() {
    super();
    this.ref = firebase.firestore().collection("boards");
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      boards: [],
    };
  }

  onCollectionUpdate = querySnapshot => {
    const tmp = [];
    querySnapshot.forEach(doc => {
      const { title, description, author } = doc.data();
      tmp.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author
      });
    });
    this.setState({ boards: tmp, isLoading: false });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    let view;
    if (this.state.isLoading) {
      view = (
        <View style={{ padding: 10 }}>
          <Placeholder
            Animation={Fade}
            Left={PlaceholderMedia}>
            <PlaceholderLine />
            <PlaceholderLine width={60} />
            <PlaceholderLine width={30} />
          </Placeholder>
          <Placeholder
            Animation={Fade}
            Left={PlaceholderMedia}>
            <PlaceholderLine />
            <PlaceholderLine width={60} />
            <PlaceholderLine width={30} />
          </Placeholder>
          <Placeholder
            Animation={Fade}
            Left={PlaceholderMedia}>
            <PlaceholderLine />
            <PlaceholderLine width={60} />
            <PlaceholderLine width={30} />
          </Placeholder>
          <Placeholder
            Animation={Fade}
            Left={PlaceholderMedia}>
            <PlaceholderLine />
            <PlaceholderLine width={60} />
            <PlaceholderLine width={30} />
          </Placeholder>
        </View>);
    } else {
      view = (
        <List>
          {this.state.boards.map((item, i) => {
            return (
              <ListItem key={item.key}>
                <Text>{item.title}</Text>
              </ListItem>
            );
          })}
        </List>
      );
    }
    return (
      <Container>
        <Header>
          <Body>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              RN Firestore
            </Text>
          </Body>
          <Right>
            <Button transparent onPress={()=> Actions.add()}>
              <Icon type='MaterialIcons' name='add'/>
            </Button>
          </Right>
        </Header>
        <Content>
          {view}
        </Content>
      </Container>
    );
  }
}
