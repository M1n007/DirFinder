import React, { Component } from 'react'
import {View,Text} from 'react-native'
import {Container, Body, Input, Button, Form, Textarea, Item} from 'native-base'
import { Col, Row } from 'react-native-easy-grid';

export default class DirFinder extends Component{

    state = {
        url:'',
        response:'',
        isLoading:false,
    }

    handleScan(){
        let url = this.state.url
        let dir = ['amin.go.id', 'bismawin', 'kjhjhj']
        const uri = 'https://'+`${url}`+'/'
        for (const start = 0; start < dir.length; start++) {

            const urin = uri+`${dir[start]}`

            return fetch(urin)
            .then((response) => {
                if (response.status === 200) {
                    console.log(urin[start]+"\n")
                }
            })
            .catch((response) =>{
                alert(response)
            });
        }
    }
    render(){
        return(
            <Container style={{padding:16,}}>
                    <Form style={{paddingBottom:16}}>
                        <Item>
                            <Input placeholder="site.com" onChangeText={(url) => this.setState({url : url})} />
                        </Item>
                    </Form>
                    <Button block primary onPress={() => this.handleScan()}>
                        <Text style={{color:'white'}}>Scan</Text>
                    </Button>
                    <Form>
                        <Textarea rowSpan={5} bordered placeholder="Textarea" value=""/>
                    </Form>
            </Container>
        )
    }
}