import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import axios from "axios";

const AppContext = createContext();

export function AppProvider({ children }) {
  const name = "Marcelo Bracet";
  const [posts, setPosts] = useState(null);
  const [myPosts, setMyPosts] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("https://dev.codeleap.co.uk/careers/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      let json = await response.data;
      setPosts(json.results);

      const userPosts = json.results.filter((post) => post.username === name);
      setMyPosts(userPosts);
    };
    getData();
  }, []);

  const value = { name, posts, myPosts };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
