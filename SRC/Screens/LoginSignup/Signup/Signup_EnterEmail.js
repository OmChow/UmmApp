import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { containerFull, goback, hr80, logo1 } from '../../../CommonCss/pagecss'
import icon from '../../../../assets/icon.png'

import { formbtn, formHead, formHead2, formInput, formTextLinkCenter, formTextLinkRight } from '../../../CommonCss/Formcss'
import { MaterialIcons } from '@expo/vector-icons';
const Signup_EnterEmail = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const handleEmail = () => {
        // setLoading(true)
        // navigation.navigate('Signup_EnterVerificationCode')
        if (email == '') {
            alert('Please enter email')
        }
        else {
            setLoading(true)
            fetch('http://10.0.2.2:3000/verify', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            })
                .then(res => res.json()).then(
                    data => {
                        if (data.error === "Invalid Credentials") {
                            // alert('Invalid Credentials')
                            alert('Invalid Credentials')
                            setLoading(false)
                        }
                        else if (data.message === "Verification Code Sent to your Email") {
                            setLoading(false)
                            alert(data.message);
                            navigation.navigate('Signup_EnterVerificationCode', {
                                useremail: data.email,
                                userVerificationCode: data.VerificationCode
                            })

                        }
                    }
                )
        }
    }
    return (
        <View style={containerFull}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={goback}>

                <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                <Text style={{
                    color: 'white',
                    fontSize: 16,
                }}

                >Go Back</Text>

            </TouchableOpacity>

            <Image source={icon} style={logo1} />
            <Text style={formHead2}>Create a new account</Text>
            <TextInput placeholder="Enter Your Email" style={formInput}

                onChangeText={(text) => {
                    setEmail(text)
                }}
            />
            {
                loading ?
                    <ActivityIndicator size="large" color="white" />
                    :
                    <Text style={formbtn}
                        onPress={() => handleEmail()}
                    >
                        Next
                    </Text>
            }
        </View>
    )
}

export default Signup_EnterEmail

const styles = StyleSheet.create({})