import React, { Component } from 'react'
import { Image, View, } from 'react-native'
import { Header, Left, Text, Body,
Right, Icon, Item, Input
} from 'native-base'

export default class headerBookmark extends Component{

    render(){
       return(
            <View>
                <Header androidStatusBarColor="#86bc40" style={{backgroundColor: "#86bc40"}}>
                    <Left/>
                    <Body>
                       <Text style={{fontFamily:'Roboto', fontSize:20, fontWeight:'bold', color:'white', alignSelf:'center', justifyContent:'center'}}>DirFinder</Text>
                    </Body>
                    <Right/>
                </Header>
            </View>
        )
    }
}