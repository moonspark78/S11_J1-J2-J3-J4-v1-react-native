import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";

import { toggleLike } from "../../store/likedImageReducer";
import { toggleSave } from "../../store/savedPostsReducer";
import { arrayOfAvatar, feedPosts } from "./feedData";

export default function Feed() {
  const dispatch = useDispatch();
  const router = useRouter();

  const userPosts = useSelector((state) => state.feed.posts);
  const allPosts = [...userPosts, ...feedPosts];

  const likedPosts = useSelector((state) => state.likedImages.likedPosts);
  const savedPosts = useSelector((state) => state.savedPosts.savedPosts);

  const isLiked = (postId) => likedPosts.includes(postId);
  const isSaved = (postId) =>
    savedPosts.some((post) => post.id === postId);

  const handleLike = (postId) => {
    dispatch(toggleLike(postId));
  };

  const handleSave = (post) => {
    dispatch(toggleSave(post));
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      {/* HEADER */}
      <View style={styles.postHeader}>
        <Image source={{ uri: item.userAvatar }} style={styles.postAvatar} />
        <View style={styles.postHeaderText}>
          <Text style={styles.postUserName}>{item.userName}</Text>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
      </View>

      {/* IMAGE */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          router.push({
            pathname: "/post-details",
            params: {
              image: item.image,
              userName: item.userName,
              userAvatar: item.userAvatar,
            },
          })
        }
      >
        <Image source={{ uri: item.image }} style={styles.postImage} />
      </TouchableOpacity>

      {/* ACTIONS */}
      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}
        >
          <Ionicons
            name={isLiked(item.id) ? "heart" : "heart-outline"}
            size={28}
            color={isLiked(item.id) ? "#FF6B6B" : "#333"}
          />
          <Text style={styles.likesText}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={26} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleSave(item)}
        >
          <Ionicons
            name={isSaved(item.id) ? "bookmark" : "bookmark-outline"}
            size={26}
            color={isSaved(item.id) ? "#00BCD4" : "#333"}
          />
        </TouchableOpacity>
      </View>

      {/* LÉGENDE */}
      {item.caption ? (
        <View style={styles.captionContainer}>
          <Text style={styles.captionText}>
            <Text style={styles.captionUser}>{item.userName} </Text>
            {item.caption}
          </Text>
        </View>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>

      {/* STORIES */}
      <View style={styles.storiesSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.addStoryContainer}>
            <View style={styles.addStoryButton}>
              <Ionicons name="add" size={30} color="#00BCD4" />
            </View>
            <Text style={styles.storyName}>Ajouter</Text>
          </TouchableOpacity>

          {arrayOfAvatar.map((item) => (
            <View key={item.id} style={styles.storyContainer}>
              <Image source={{ uri: item.uri }} style={styles.storyAvatar} />
              <Text style={styles.storyName}>
                {item.name.split(" ")[0]}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* FEED */}
      <FlatList
        data={allPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

  header: {
    padding: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },

  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
  },

  storiesSection: {
    backgroundColor: "white",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },

  addStoryContainer: { alignItems: "center", marginHorizontal: 10 },

  addStoryButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#00BCD4",
    borderStyle: "dashed",
  },

  storyContainer: { alignItems: "center", marginHorizontal: 10 },

  storyAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#00BCD4",
  },

  storyName: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#333",
  },

  postContainer: {
    backgroundColor: "white",
    marginBottom: 10,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },

  postAvatar: { width: 40, height: 40, borderRadius: 20 },

  postHeaderText: { marginLeft: 10 },

  postUserName: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
  },

  postTime: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#999",
  },

  postImage: {
    width: "100%",
    height: 300,
  },

  postActions: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },

  likesText: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#333",
  },

  captionContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },

  captionText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#333",
  },

  captionUser: {
    fontFamily: "Poppins_700Bold",
  },
});
