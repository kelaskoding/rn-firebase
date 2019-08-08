import React, { Component } from "react";
import {
  Container,
  Header,
  Body,
  Content,
  Spinner,
  List,
  ListItem,
  Text
} from "native-base";
import firebase from "../utilities/Firebase";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";

export default class Home extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("boards");
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      boards: [],
      isReady: "unexist"
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
    this.setState({ boards: tmp, isLoading: false, isReady: "existing" });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    let view;
    if (this.state.isLoading) {
      view = <Spinner color="blue" />;
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
        </Header>
        <Content>
          <Placeholder
            Animation={Fade}
            Left={PlaceholderMedia}
            Right={PlaceholderMedia}
          >
            <PlaceholderLine width={80} />
            <PlaceholderLine />
            <PlaceholderLine width={30} />
          </Placeholder>
        </Content>
      </Container>
    );
  }
}
