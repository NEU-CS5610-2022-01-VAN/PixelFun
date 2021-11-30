import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components/native";

// import LikeIcon from "../assets/like";
// import CommentIcon from "../assets/comment";
// import MoreIcon from "../assets/more";
import Card from "./Card";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { firebase } from "../firebase/config";

import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    likesCount: 2,
    commentsCount: 4,
    backgroundColor: "#EC9560",
    report: "babalabala",
    author: "Jerromy"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    likesCount: 2,
    commentsCount: 4,
    backgroundColor: "#4BBED0",
    report: "babalabala",
    author: "Jerromy"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    likesCount: 2,
    commentsCount: 4,
    backgroundColor: "#414954",
    report: "babalabala",
    author: "Jerromy"
  }
];
const imagesRef = firebase.firestore().collection("images");
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: null,
      userID: this.props.extraData,
      data: DATA
    };
  }

  static defaultProps = {};

  viewDetail = (index, item) => {
    this.props.navigation.navigate("Detail", item);
  };

  renderItem = ({ index, item }) => (
    <Card
      viewDetail={this.viewDetail}
      style={{ backgroundColor: "black" }}
      title={item.title}
      id={item.id}
      likesCount={item.likes}
      commentsCount={item.comments}
      backgroundColor={item.backgroundColor}
      report={item.report}
      author={item.author}
      item={item}
    />
  );
  componentDidMount() {
    imagesRef
      //.where("authorID", "==", userID)
      .orderBy("publishTime")
      .onSnapshot(
        querySnapshot => {
          const newEntities = [];
          querySnapshot.forEach(doc => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          // setEntities(newEntities);
          this.setState({
            data: newEntities
          });
          console.log("GET!!!!");
          console.log(newEntities[0].title);
          console.log(newEntities[0].likes);
          console.log(newEntities[0].comments);
          console.log(newEntities[0].publishTime);
          console.log(newEntities[0].backGroundColor);
          console.log(newEntities[0].canvasData[0]);
          console.log(newEntities[1].userID);
          console.log("GET!!!!");
        },
        error => {
          console.log(error);
        }
      );
  }

  onLogout() {
    console.log("Before1");
    console.log(this.state.userID);
    console.log("Before2");
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("After1");
        console.log(this.state.userID);
        console.log("After2");
        this.props.navigation.navigate("Login");
        // firebase.auth().onAuthStateChanged((user) => {
        //   if (user) {
        //   } else {

        //   }
        // });
      })
      .catch(error => {
        // An error happened.
      });
  }

  render() {
    const { route, navigation } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
        <Text>{this.state.userID}</Text>
        <TouchableOpacity style={styles.button} onPress={() => this.onLogout()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="New Grid"
            onPress={() =>
              navigation.navigate("Canvas", {
                uid: this.props.extraData
              })
            }
          >
            <Icon name="md-grid" style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Drafts"
            onPress={() => {}}
          >
            <Icon name="md-folder-open" style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor="#3498db"
            title="Camera"
            onPress={() => {}}
          >
            <Icon name="md-camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
