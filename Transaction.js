import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class Transaction extends React.Component {
    constructor() {
        super()
        this.state = {
            hasCameraPermission: null,
            scan: false,
            scanedData: '',
            buttonState: 'normal',
        }
    }

    getPermission = async() => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission: status === 'granted',
            buttonState: 'clicked',
            scan: false
        })
        console.log(this.state.buttonState)
    }

    handlebarCodeScan = async({type , data}) => {
        this.setState({
            scan: true,
            scanedData: data,
            scan: true,
            buttonState: 'normal'
        })
        console.log(this.state.scanedData)
    }
    render() {
        const hasCameraPermission = this.state.hasCameraPermission
        const buttonState = this.state.buttonState
        const scan = this.state.scan

        if(buttonState === 'clicked' && hasCameraPermission) {
            return (
                <BarCodeScanner style={StyleSheet.absoluteFillObject} onBarCodeScanned={scan ? undefined : this.handlebarCodeScan} />

            )
        }else if(buttonState === 'normal') {
            return (
            <View>
                <TouchableOpacity onPress={this.getPermission} style={styles.opacity}><Text style={styles.text}>Scan QR Code</Text></TouchableOpacity>
                <Text>{hasCameraPermission === true ? this.state.scanedData : 'Request Camera Permision'}</Text>

            </View>
        )
        }


        
    }
    
}


const styles= StyleSheet.create({
    opacity: {
        backgroundColor: 'cyan',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50%'


    }
})