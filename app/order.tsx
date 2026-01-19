import { StyleSheet, Text, View } from 'react-native'
import Navbar from '@/components/Navbar'
import SafeAreaViewWrapper from '@/components/SafeAreaViewWrapper'
import React from 'react'

const order = () => {
  return (
    <SafeAreaViewWrapper>
      <Navbar showBackButton={true} title="Order"/>
      <Text>order</Text>
    </SafeAreaViewWrapper>
  )
}

export default order

const styles = StyleSheet.create({})