import { Platform, View, StyleSheet } from 'react-native';
 import { Image } from 'expo-image'; 
 import { SafeAreaView } from 'react-native-safe-area-context'; 
 import ImageViewer from '@/components/image-viewer';
 import Button from '@/components/button';
 import type { ImageSource } from 'expo-image';
 import * as ImagePicker from 'expo-image-picker';
 import { useState } from 'react';
 import IconButton from '@/components/icon-button';
 import CircleButton from '@/components/circle-button';
 import EmojiPicker from '@/components/emoji-picker';
 import EmojiList from '@/components/emoji-list';
 import EmojiSticker from '@/components/emoji-sticker';

 const PlaceholderImage = require('@/assets/images/background-image.png');



export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };
  const onReset = () => {
    setShowAppOptions(false);
  };


  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
      <View>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        <Image source={PlaceholderImage} style={styles.image} />
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      {showAppOptions ? (
          <View style={styles.footerContainer}>
            <View style={styles.optionsRow}>
              <IconButton
                icon={{
                  android: require('@expo/material-symbols/refresh.xml'),
                  ios: 'arrow.counterclockwise',
                  web: 'refresh',
                }}
                label="Reset"
                onPress={onReset}
              />
              <CircleButton onPress={onAddSticker} />
              <IconButton
                icon={{
                  android: require('@expo/material-symbols/download.xml'),
                  ios: 'square.and.arrow.down',
                  web: 'download',
                }}
                label="Save"
                onPress={onSaveImageAsync}
              />
            </View>
          </View>

      ) : (
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo"  onPress={() => setShowAppOptions(true)} />
      </View>
      )}
      )
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
      <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
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
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
