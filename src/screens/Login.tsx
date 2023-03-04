import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppRouteParams } from 'navigation/type'
import Modal from 'react-native-modal'

type LoginScreenProps = NativeStackScreenProps<AppRouteParams, 'Login'>

const Login = ({ navigation }: LoginScreenProps) => {
     const [usernameInput, setUsernameInput] = useState('')
     const [passwordInput, setPasswordInput] = useState('')
     const [loading, setLoading] = useState(false)
     const [modalError, setModalError] = useState(false)

     const toggleModalError = () => {
          setModalError(!modalError)
     }

     const doLogin = () => {
          if (usernameInput === 'kholiq' && passwordInput === '123') {
               navigation.navigate('HalamanUtama')
          } else {
               setModalError(true)
          }
     }

     return (
          <ScrollView style={styles.container}>
               <View style={styles.viewLogin}>
                    <Text style={styles.loginText}>Login</Text>
               </View>
               <View style={styles.containerTextInput}>
                    <TextInput placeholder='username' style={styles.textInput} onChangeText={(usernameInput) => setUsernameInput(usernameInput)} value={usernameInput} />
               </View>
               <View style={styles.containerTextInput}>
                    <TextInput placeholder='password' style={styles.textInput} secureTextEntry={true} onChangeText={(passwordInput) => setPasswordInput(passwordInput)} value={passwordInput} />
               </View>
               <TouchableOpacity onPress={doLogin} style={styles.button}>
                    <View style={styles.itemButton}>
                         <Text style={styles.textButton}>Sign in</Text>
                    </View>
               </TouchableOpacity>
               <Modal isVisible={modalError} style={{ justifyContent: "center", alignItems: "center" }} onBackdropPress={toggleModalError} onBackButtonPress={toggleModalError}>
                    <View style={styles.modal}>
                         <Text style={{ fontSize: 15, padding: 10, textAlign: "center", color: 'white' }}>Username atau password salah !</Text>
                    </View>
               </Modal>
          </ScrollView>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1
     },
     viewLogin: {
          justifyContent: 'center',
          alignItems: 'center'
     },
     loginText: {
          fontSize: 30,
          marginTop: 150
     },
     containerTextInput: {
          flexDirection: 'row',
          borderColor: 'blue',
          borderWidth: 1,
          marginHorizontal: 30,
          height: 50,
          borderRadius: 25,
          marginTop: 20
     },
     textInput: {
          flex: 1,
          paddingHorizontal: 25
     },
     button: {
          flexDirection: 'row',
          backgroundColor: 'blue',
          marginHorizontal: 30,
          height: 50,
          borderRadius: 25,
          marginTop: 20,
     },
     itemButton: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10
     },
     textButton: {
          flex: 1,
          color: 'white',
          fontSize: 20
     },
     modal: {
          width: 300,
          height: 100,
          backgroundColor: 'blue',
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center'
     }
})

export default Login