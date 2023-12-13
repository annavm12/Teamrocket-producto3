import { useState } from 'react'
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatLis,
} from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'

const Welcome = () => {
  const router = useRouter();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeMessage}>Mi Viaje por España</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.searchInput}>

          </TextInput>
        </View>
      </View>
    </View>
  )
}

export default Welcome