import React, { Component } from 'react'
import {View,Text} from 'react-native'
import {Container, Body, Input, Button, Form, Textarea, Item} from 'native-base'
import { Col, Row } from 'react-native-easy-grid';

export default class DirFinder extends Component{

    state = {
        url:'',
        result:[],
        koneksi:[],
        notfound:[],
        forbidden:[],
        isLoading:false,
    }

    handleScan(){
        let url = this.state.url
        let dir = ['amin.go.id', 'bismawin', 'kjhjhj', 'kaka', 'baaaksakjd', 'dapram_']
        const uri = 'https://'+`${url}`+'/'
        dir.map(dirin => {
            const urin = uri+`${dirin}`
            return fetch(urin)
            .then((response) => {
                if (response) {
                    this.setState({
                        isLoading:true
                    })
                    this.setState({
                        result: response
                    })
                    setTimeout(() => {
                        this.setState({
                            isLoading:false
                        })
                    }, 10000);
                }
            })
        })
    }
    render(){
        if (this.state.koneksi.length == 0) {
            null
        }else{
            alert(this.state.koneksi)
        }
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
                        {
                            this.state.result.length == 0 ? (
                                <Textarea bordered value="..."/>
                            ):
                            this.state.isLoading == false ? (
                                <Textarea bordered value="done"/>
                            ):(
                                <Textarea bordered value={this.state.result+" "+"scanning...."}/>
                            )
                        }
                    </Form>
                    <Text>Result :</Text>
                    {
                        this.state.result.map(results => (
                            <Text>{result}</Text>
                        ))
                    }
            </Container>
        )
    }
}