import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLike } from '../../store/likedImageReducer';
import { feedPosts } from '../Feed/feedData';

export default function Favorites() {
  const dispatch = useDispatch();


  const likedPosts = useSelector(state => state.likedImages.likedPosts);

  
  const userPosts = useSelector(state => state.feed.posts);


  const allPosts = [...userPosts, ...feedPosts];


  const likedPostsData = allPosts.filter(post =>
    likedPosts.includes(post.id)
  );

  const handleUnlike = (postId) => {
    dispatch(toggleLike(postId));
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.image }} style={styles.postImage} />

      <View style={styles.postOverlay}>
        <View style={styles.postHeader}>
          <Image source={{ uri: item.userAvatar }} style={styles.userAvatar} />
          <Text style={styles.userName}>{item.userName}</Text>
        </View>

        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => handleUnlike(item.id)}
        >
          <Ionicons name="heart" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={80} color="#ccc" />
      <Text style={styles.emptyTitle}>Aucun favori</Text>
      <Text style={styles.emptyText}>
        Les posts que vous aimez apparaîtront ici
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoris</Text>
        <Text style={styles.headerSubtitle}>
          {likedPostsData.length} {likedPostsData.length > 1 ? 'posts' : 'post'}
        </Text>
      </View>

      <FlatList
        data={likedPostsData}
        renderItem={renderPost}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#999',
    marginTop: 2,
  },
  listContent: {
    padding: 5,
  },
  postContainer: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    padding: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    marginLeft: 8,
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  likeButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
});
