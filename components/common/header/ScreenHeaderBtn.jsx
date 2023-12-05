import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import styles from './screenheader.style'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ScreenHeaderBtn = () => {
  return (
    <TouchableOpacity>
      <Image
        source={iconUrl}
      />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn