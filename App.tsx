// @ts-nocheck

import React, {useState, useRef, useEffect} from "react";
import { Image, StyleSheet, View } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import Button from './components/Button';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [hasCameraPermission, sethasCameraPermission] = useState(false)
  const [image, setimage] = useState(null)
  const [type, settype] = useState(CameraType.back)
  const [flash, setflash] = useState(Camera.Constants.FlashMode.off)
  const cameraRef = useRef(null)

  useEffect(() => {
    (async ()=> {
      MediaLibrary.requestPermissionsAsync()
    })
  }, [])

  async function takePicture() {
    if (hasCameraPermission == false) {
      MediaLibrary.requestPermissionsAsync()
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      sethasCameraPermission(true)
    }
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync()
      console.log(data)
      setimage(data.uri)
    }
  }

  async function saveImage() {
    if (image) {
      await MediaLibrary.createAssetAsync(image)
      alert('Picture saved!')
      setimage(null)
    }    
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      {!image ? 
      <View style={styles.camera}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
      >
        <View style={styles.buttons}>
        <Button icon='retweet' onPress={()=>{
          settype(type === CameraType.back ? CameraType.front : CameraType.back)
        }}/>
        <Button icon='flash' color={flash ? '#fff' : '#aaa'} onPress={()=>{
          setflash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)
        }}/>
        </View>
      </Camera>
      </View>
      :
      <Image source={{uri: image}} style={styles.camera}/>
      }

      {image ? 
      <View style={styles.buttons}>
        <Button title={'Re-take'} icon='retweet' onPress={()=>setimage(null)}/>
        <Button title={'Save'} icon='download' onPress={saveImage}/>
      </View>
      :
      <Button title={'Take a picture'} icon='camera' onPress={takePicture}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'none,'
  }
})