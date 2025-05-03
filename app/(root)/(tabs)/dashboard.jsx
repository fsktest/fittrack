// TabNavigation.js
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import icon from "../../../constants/icon";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("All Friends");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFriends, setFilteredFriends] = useState([]);

  const tabs = ["All Friends", "Add Friend"];

  const friendsData = [
    {
      id: "1",
      name: "Sarah Miller",
      steps: "12,456",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: "2",
      name: "Mike Rodriguez",
      steps: "9,823",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: "3",
      name: "Jessica Chen",
      steps: "15,341",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    // Rest of the friends data remains the same
    // Adding unique IDs to each friend for better list rendering
  ];

  useEffect(() => {
    // Simulate fetching friends with a small delay
    const fetchFriends = async () => {
      setLoading(true);
      setTimeout(() => {
        setFriends(friendsData);
        setFilteredFriends(friendsData);
        setLoading(false);
      }, 500);
    };
    fetchFriends();
  }, []);

  useEffect(() => {
    // Filter friends based on search query
    if (searchQuery.trim() === "") {
      setFilteredFriends(friends);
    } else {
      const filtered = friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFriends(filtered);
    }
  }, [searchQuery, friends]);

  const handleSearchFriend = (text) => {
    setSearchQuery(text);
  };

  const FriendItem = ({ friend }) => (
    <TouchableOpacity key={friend.id} style={styles.friendItem}>
      <View style={styles.friendInfo}>
        <Image source={{ uri: friend.avatar }} style={styles.avatar} />
        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>{friend.name}</Text>
          <View style={styles.stepsContainer}>
            <MaterialIcons name="emoji-events" size={16} color="#9BEC00" />
            <Text style={styles.stepsText}>{friend.steps} steps today</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "All Friends":
        return (
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.contentContainer}>
              {/* <View style={styles.searchContainer}> */}
              <FormField
                placeholder="Search your friend"
                value={searchQuery}
                onChangeText={handleSearchFriend}
              />
              {/* </View> */}

              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#9BEC00" />
                </View>
              ) : filteredFriends.length > 0 ? (
                <View>
                  {filteredFriends.map((friend) => (
                    <FriendItem
                      key={friend.id || friend.name}
                      friend={friend}
                    />
                  ))}
                </View>
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No friends found</Text>
                </View>
              )}
            </View>
          </ScrollView>
        );
      case "Add Friend":
        return (
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.contentContainer}>
              <View style={styles.addFriendContainer}>
                <Text style={styles.sectionTitle}>Add New Friend</Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>
                    Friend's Username or Email
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter username or email"
                    placeholderTextColor="#777777"
                  />
                </View>

                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>Send Friend Request</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>Friend Requests</Text>
                <Text style={styles.noRequestsText}>
                  No pending friend requests
                </Text>
              </View>
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.indicator} />}
            </TouchableOpacity>
          ))}
        </View>
        {renderTabContent()}
      </View>
    </SafeAreaView>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212", // Dark background
  },
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#333333", // Darker border for dark theme
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  activeTab: {
    backgroundColor: "#1E1E1E", // Slightly lighter than background for active tab
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#777777", // Muted text for inactive tabs
  },
  activeTabText: {
    color: "#9BEC00", // Primary color as requested
    fontWeight: "600",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#9BEC00", // Primary color for indicator
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    minHeight: "100%",
    paddingHorizontal: 10,
    paddingBottom: 70,
  },
  searchContainer: {
    padding: 16,
    marginBottom: 8,
  },
  loadingContainer: {
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#777777",
    fontSize: 16,
  },
  friendItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepsText: {
    color: "#777777",
    fontSize: 14,
    marginLeft: 6,
  },
  addFriendContainer: {
    padding: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    padding: 12,
    color: "#FFFFFF",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#9BEC00",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginBottom: 24,
  },
  addButtonText: {
    color: "#121212",
    fontWeight: "600",
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#333333",
    marginVertical: 24,
  },
  noRequestsText: {
    color: "#777777",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 20,
  },
  contentText: {
    fontSize: 18,
    color: "#FFFFFF", // White text for content in dark theme
  },
});
