import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'

export default function Button({title, onPress, icon, color}:any) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Entypo name ={icon} size={28} color={color ? color : '#f1f1f1'}/>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f1f1f1',
    marginLeft: 10,
  }
})