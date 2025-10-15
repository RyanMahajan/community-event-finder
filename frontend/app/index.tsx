import { Text, View } from "react-native";
import Card from "../components/card"
import Header from "../components/header"
import Footer from "../components/footer"


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
  <div className="bg-white rounded-xl shadow-lg overflow-hidden m-4 max-w-md">
  <Header title={"title"} />
  <Card imageSource={"/Users/amrabuazizah/community-event-finder/frontend/assets/images/react-logo.png"} caption={"caption"} />
  <Footer buttons={[
          {
            label: "Like",
            onPress: () => console.log("Liked!"),
            variant: "primary",
          },
          {
            label: "Share",
            onPress: () => console.log("Shared!"),
            variant: "secondary",
          },
        ]} />
</div>
    </View>
  );
}
