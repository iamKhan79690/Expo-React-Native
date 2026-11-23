import { Platform, View, StyleSheet } from 'react-native';
 import { Image } from 'expo-image'; 
 import { SafeAreaView } from 'react-native-safe-area-context'; 
 import ImageViewer from '@/components/image-viewer';
 import Button from '@/components/button';
 
 const PlaceholderImage = require('@/assets/images/background-image.png');



export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
      <Button
          theme="primary"
          label="Choose a photo"
          onPress={() => alert('You pressed a button.')}
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
