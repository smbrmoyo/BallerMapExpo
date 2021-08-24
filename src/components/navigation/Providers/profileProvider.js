import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import {  useAuth, getUprofile } from "../realmAuthProvider";

export const ProfileContext = React.createContext();

let result;

const ProfileProvider = ({ children }) => {
  const tprofileDoc =  async () => {
      await getUprofile().then(res => result = res );
      return result;
  }

  const { user, profilePartition, profileDoc, setProfileDoc} = useAuth();
  const [username, setUsername] = useState(profileDoc.username);
  const [followers, setFollowers] = useState([{username:"yyy"}, {username:"iiii"}]);
  const [following, setFollowing] = useState(profileDoc.following);
  const profileRealmRef = useRef();

  // User profile realm config

  useEffect(() => {
    const config = {
      sync: {
        user: user,
        partitionValue: profilePartition,
      },
    };

    // Open the profile realm
    Realm.open(config)
      .then((profileRealm) => {
        profileRealmRef.current = profileRealm;
        const syncProfile = profileRealm.objects("uProfile")[0];
        const syncUsername = syncProfile.username;
        const syncFollowers = syncProfile.followers;
        const syncFollowing = syncProfile.following;
        if (syncUsername !== undefined && syncFollowers !== undefined) {
          setUsername(syncUsername);
          for (let i = 0; i < syncFollowers.length; i++){
              followers.push({username: syncFollowers[i]});
          }
          setFollowers(followers)
          setFollowing(syncFollowing);
          console.log(`PROFILEPROVIDER!!!! : 
         username: ${username}, followers: ${followers}`);
        } else {
          console.log("PROFILEPROVIDER!!!! : No profile found");
        }
      })
      .catch((error) => console.log(error));

    return () => {
      const profileRealm = profileRealmRef.current;
      if (profileRealm) {
        profileRealm.close();
        profileRealmRef.current = null;
      }
    };
  }, [username]);

  return (
    <ProfileContext.Provider
      value={{
        username,
        followers,
        setUsername,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useProfile = () => {
  //Valeurs du AuthProvider
  const profile = useContext(ProfileContext);
  if (profile == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return profile;
};

export { ProfileProvider, useProfile };
