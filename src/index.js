import React from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { Container, Button, View, Text, Form, Item, Input, Icon, Spinner,
Card, CardItem } from 'native-base'
import { Col, Row} from 'react-native-easy-grid'
import encoding from 'text-encoding';

import Header from './header'
var d = new Date();
var n = d.getTime();
var RNFS = require('react-native-fs');
var path = '/storage/emulated/0/' +n+'_'+'result.txt';

export default class DirFinder extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
        isLoading: false, 
        url: '',
        dataSource:[],
        level:'',
    }
  }

  handleCek(){
    this.setState({
      isLoading: true
    })
    let url = this.state.url
    const small = ['amin.go.id', 'bismawin', 'kjhjhj', 'popo', 'login', 'sadasdasd', 'sadasdasd', 'manager']
    const medium = ['amin.go.id', 'popo']
    const extreme = ['bismawin']

    const uri = 'https://'+`${url}`+'/'
        if (this.state.level === 'easy') {
            small.map((item)=>{

                return fetch(uri+item)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({
                          dataSource: this.state.dataSource.concat([response.url]),
                          isLoading:false
                        })
                    }else{
                        null
                    }
                })
                
        
            })
        }else if (this.state.level === 'medium') {
            medium.map((item)=>{

                return fetch(uri+item)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({
                          dataSource: this.state.dataSource.concat([response.url]),
                          isLoading: false
                        })
                    }else{
                        this.setState({
                            isLoading:false
                        })
                    }})
        
            })
        }else if (this.state.level === 'extreme') {
            extreme.map((item)=>{

                return fetch(uri+item)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({
                          dataSource: this.state.dataSource.concat([response.url]),
                          isLoading: false
                        })
                    }else{
                        this.setState({
                            isLoading:false
                        })
                    }})
        
                })
        }
  }

  toFile(){
    var uint8array = new encoding.TextEncoder("utf-8").encode(this.state.dataSource);
    var string = new encoding.TextDecoder().decode(uint8array);
    RNFS.writeFile(path, string, 'utf8')
      .then((success) => {
        alert('FILE TERSIMPAN di '+path);
    })
    .catch((err) => {
      alert(err.message);
    });
  
  }

  render(){
    return(
      <Container>
        <Header/>
        <Text> Choose Level : </Text>
            <Row style={{height:42, paddingLeft:16, paddingTop:16}}>
                <Col>
                    {
                        this.state.level === 'easy' ? (
                            <Icon name="md-checkmark-circle"  style={{color:'#86bc40', position:'absolute', zIndex:100, alignSelf:'center', width:42, height:42}}/>
                        ): null
                    }
                    <TouchableOpacity onPress={() => this.setState({level: 'easy'})}>
                        <Image source={require('./ico/easy.png')} style={{width:42, height:42}} /> 
                    </TouchableOpacity> 
                    <Text>Easy</Text>
                </Col>
                <Col>
                    {
                        this.state.level === 'medium' ? (
                            <Icon name="md-checkmark-circle"  style={{color:'#86bc40', position:'absolute', zIndex:100, alignSelf:'center', width:42, height:42}}/>
                        ): null
                    }
                    <TouchableOpacity onPress={() => this.setState({level: 'medium'})}>
                        <Image source={require('./ico/medium.png')} style={{width:42, height:42}} /> 
                    </TouchableOpacity> 
                    <Text>Medium</Text>
                </Col>
                <Col>
                    {
                        this.state.level === 'extreme' ? (
                            <Icon name="md-checkmark-circle"  style={{color:'#86bc40', position:'absolute', zIndex:100, alignSelf:'center', width:42, height:42}}/>
                        ): null
                    }
                    <TouchableOpacity onPress={() => this.setState({level: 'extreme'})}>
                        <Image source={require('./ico/extreme.jpg')} style={{width:42, height:42}} /> 
                    </TouchableOpacity> 
                    <Text>Extreme</Text>
                </Col>
            </Row>
           {
               this.state.level.length != 0 ? (
                <View>
                    <Form style={{paddingBottom:16, paddingTop:20}}>
                <Item floatingLabel>
                    <Input placeholder="site.com" onChangeText={(url) => this.setState({url : url})} />
                </Item>
                </Form>
                <Button block primary onPress={() => this.handleCek()}>
                    {
                        this.state.isLoading == true ? (
                            <Spinner color='white'/>
                        ):(
                            <Text style={{color:'white'}}>Scan : {this.state.level}</Text>
                        )
                    }
                </Button>
                <Text>Result :</Text>
                <Card>
                <CardItem>
                        <View>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({item}) => <Text>{item} <Icon style={{color:'#86bc40'}} name="md-checkmark" /></Text>}
                            keyExtractor={(item, index) => index}
                        />
                        </View>
                </CardItem>
                </Card>

                <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end', alignSelf:'flex-end'}}>
                {
                    this.state.dataSource.length == 0 ? (
                    <Button style={{backgroundColor:'grey', position:'absolute'}}>
                        <Text style={{color:'white'}}>Save Result</Text>
                    </Button>
                    ):(
                    <Button primary style={{position:'absolute'}} onPress={()=> this.toFile()}>
                        <Text style={{color:'white'}}>Save Result</Text>
                    </Button>
                    )
                }
                </View>
                </View>
               ):(
                   <View style={{flex:1, flexDirection:'column', alignSelf:'center', justifyContent:'center'}}>
                       <Text>Pilih Level Scanning Terlebih dahulu.</Text>
                       <Text>Follow ig : @penulis.bimbang</Text>
                   </View>
               )
           }
      </Container>
    );
  }
}
