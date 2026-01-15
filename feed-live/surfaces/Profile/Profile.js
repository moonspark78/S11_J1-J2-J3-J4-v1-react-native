import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const myPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500",
  },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts");

  const savedPosts = useSelector((state) => state.savedPosts.savedPosts);

  const renderPostGrid = ({ item }) => (
    <TouchableOpacity style={styles.gridItem}>
      <Image source={{ uri: item.image }} style={styles.gridImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1671016233693-53162078ca1c?q=80&w=1129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Omar</Text>
          <Text style={styles.profileUsername}>@omar</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>35</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1,552</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>128</Text>
              <Text style={styles.statLabel}>Follows</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "posts" && styles.activeTab]}
            onPress={() => setActiveTab("posts")}
          >
            <Ionicons
              name="grid-outline"
              size={24}
              color={activeTab === "posts" ? "#00BCD4" : "#999"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "saved" && styles.activeTab]}
            onPress={() => setActiveTab("saved")}
          >
            <Ionicons
              name="bookmark-outline"
              size={24}
              color={activeTab === "saved" ? "#00BCD4" : "#999"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          {activeTab === "posts" ? (
            <FlatList
              data={myPosts}
              renderItem={renderPostGrid}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              scrollEnabled={false}
            />
          ) : savedPosts.length > 0 ? (
            <FlatList
              data={savedPosts}
              renderItem={renderPostGrid}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="bookmark-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>Aucun post sauvegardé</Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  profileHeader: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#00BCD4",
  },
  profileName: {
    marginTop: 15,
    fontSize: 22,
    fontFamily: "Poppins_600SemiBold",
  },
  profileUsername: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#999",
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 25,
    width: "100%",
    justifyContent: "space-around",
  },
  statItem: { alignItems: "center" },
  statNumber: { fontSize: 20, fontFamily: "Poppins_600SemiBold" },
  statLabel: { fontSize: 14, fontFamily: "Poppins_400Regular", color: "#666" },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: { borderBottomColor: "#00BCD4" },
  gridContainer: { backgroundColor: "white", minHeight: 300 },
  gridItem: { flex: 1, aspectRatio: 1, padding: 1 },
  gridImage: { width: "100%", height: "100%" },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#999",
  },
});
