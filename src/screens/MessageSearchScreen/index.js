import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import debounce from "lodash/debounce";

//import { CacheService, ChatClientService } from "../utils";
import { SCText } from "../../components/SCText";
//import { ChannelListItem } from "../components/ChannelListItem";
import { ModalScreenHeader } from "../../components/ModalScreenHeader";
import styles from "./styles";
//import { DirectMessagingConversationAvatar } from "../components/DirectMessagingConversationAvatar";

export default MessageSearchScreen = () => {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
  const [text, setText] = useState("");

  let endAncestor;
  let endNode;
  //const chatClient = ChatClientService.getClient();
  //const [results, setResults] = useState(CacheService.getRecentConversations());
  const onChangeText = async (text) => {
    setText(text);
    if (!text) {
      //return setResults(CacheService.getRecentConversations());
    }

    /*const result = await chatClient.queryChannels({
      type: "messaging",
      $or: [
        { "member.user.name": { $autocomplete: text } },
        {
          name: {
            $autocomplete: text,
          },
        },
      ],
    });*/
    setResults(result);
  };

  const onChangeTextDebounced = debounce(onChangeText, 1000, {
    leading: true,
    trailing: true,
  });

  const renderChannelRow = (channel, isUnread) => {
    return {
      /*<ChannelListItem
        isUnread={isUnread}
        channel={channel}
        client={chatClient}
        key={channel.id}
        currentUserId={chatClient.user.id}
        showAvatar
        presenceIndicator={false}
        changeChannel={(channelId) => {
          navigation.navigate("ChannelScreen", {
            channelId,
          });
        }}
      />*/
    };
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0.0)" /*transparent*/
        barStyle="dark-content"
      />
      <SafeAreaView
        style={{
          backgroundColor: "white",
          height: "100%",
          width: "100%",
        }}
      >
        <View>
          <View style={styles.headerContainer}>
            <TextInput
              autoFocus
              onChangeText={onChangeTextDebounced}
              value={text}
              placeholder="Search"
              placeholderTextColor={colors.text}
              style={[
                styles.inputBox,
                {
                  color: colors.text,
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  borderWidth: dark ? 1 : 0.5,
                },
              ]}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.cancelButton}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <SCText>Cancel</SCText>
            </TouchableOpacity>
          </View>

          <View style={styles.searchResultsContainer}>
            <SCText style={styles.searchResultsContainerTitle}>Recent</SCText>
            {/*<FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            data={results}
            renderItem={({ item }) => {
              return renderChannelRow(item);
            }}
          />*/}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
