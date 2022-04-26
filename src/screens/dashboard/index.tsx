import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Alert, ScrollView, View } from "react-native";
import { RootStackProps } from "../../navigation";

// Components
import FilesComponent, { IFileComponent } from "../../components/FilesComponent";

interface IProps {
  navigation: NativeStackNavigationProp<RootStackProps, "FilesModal">;
}

const Dashboard: React.FC<IProps> = ({ navigation }) => {
  
  // Dummy data
  const files: IFileComponent[] = [
    { id: 0, name: "Test name 1", extension: "jpg", file: "https://i.ytimg.com/vi/Ii8h7DCIcMo/maxresdefault.jpg" },
    { id: 1, name: "Test video 1", extension: "mp4", file: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { id: 2, name: "Larger Test name 1", extension: "mp3", file: "https://i.ytimg.com/vi/Ii8h7DCIcMo/maxresdefault.jpg" }, // Invalid file test
    { id: 3, name: "Test name 1", extension: "jpg", file: "https://i.ytimg.com/vi/Ii8h7DCIcMo/maxresdefault.jpg" },
    { id: 4, name: "Test document 1", extension: "pdf", file: "https://www.clickdimensions.com/links/TestPDFfile.pdf" },
    { id: 5, name: "Test video 2", extension: "mp4", file: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    { id: 6, name: "Test document 2", extension: "pdf", file: "http://www.africau.edu/images/default/sample.pdf" },
  ];

  return (
    <ScrollView>
      <View>
        <FilesComponent
          navigation={navigation}
          files={files}
          onDelete={id => Alert.alert(`On delete: ${id}`)}
          onEdit={id => Alert.alert(`On edit: ${id}`)}
          layout="grid"
          itemsInRow={2}
        />
      </View>
    </ScrollView>
  )
};

export default Dashboard;
