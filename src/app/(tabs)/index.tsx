import { Platform, View, StyleSheet } from 'react-native';
 import { Image } from 'expo-image'; 
 import { SafeAreaView } from 'react-native-safe-area-context'; 
 import ImageViewer from '@/components/image-viewer';
 import Button from '@/components/button';
 import * as ImagePicker from 'expo-image-picker';
 import { useState } from 'react';
 
 const PlaceholderImage = require('@/assets/images/background-image.png');



export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
      <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
        <Image source={PlaceholderImage} style={styles.image} />
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
      <Button
          theme="primary"
          label="Choose a photo"
          onPress={pickImageAsync}

        />
        <Button label="Choose a photo" onPress={() => alert('You pressed a button.')} />
        <Button label="Use this photo" onPress={() => alert('You pressed a button.')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: Platform.select({ web: 96, default: 20 }),
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
