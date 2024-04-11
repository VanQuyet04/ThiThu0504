import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Banner = () => {
    return (
        <View style={styles.banner}>
            <Image style={{ width: '100%', height: 100 }} source={{ uri: 'https://th.bing.com/th/id/R.35913690ac734a92b76b71f47bb19bf9?rik=upVsrwgKHXLjaQ&pid=ImgRaw&r=0' }} />
        </View>
    )
}

export default Banner

const styles = StyleSheet.create({
    banner: {
        borderRadius: 15,
    }
})