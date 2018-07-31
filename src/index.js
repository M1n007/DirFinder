import React from 'react';
import { FlatList } from 'react-native';
import { Button, View, Text, Form, Item, Input, Icon, Spinner,
Card, CardItem } from 'native-base'

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
    }
  }

  handleCek(){
    this.setState({
      isLoading: true
    })
    let url = this.state.url
    let dir = ['amin.go.id', 'bismawin', 'kjhjhj', 'popo']
    const uri = 'https://'+`${url}`+'/'
        dir.map((item)=>{

        return fetch(uri+item)
        .then((response) => {
            if (response.status === 200) {
                this.setState({
                  dataSource: this.state.dataSource.concat([response.url]),
                })
            }else{
                
            }})

        })
    this.setState({
      isLoading: false
    })
  }

  toFile(){
    var uint8array = new TextEncoder("utf-8").encode(this.state.dataSource);
    var string = new TextDecoder().decode(uint8array);
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
      <View style={{flex: 1, paddingTop:20}}>
        <Form style={{paddingBottom:16}}>
            <Item>
                <Input placeholder="site.com" onChangeText={(url) => this.setState({url : url})} />
            </Item>
        </Form>
        <Button block primary onPress={() => this.handleCek()}>
            <Text style={{color:'white'}}>Scan</Text>
        </Button>
        <Text>Result :</Text>
        <Card>
          <CardItem>
            {
              this.state.isLoading == true ? (
                  <Spinner color='green'/>
              ):(
                <View>
                  <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text>{item} <Icon style={{color:'green'}} name="md-checkmark" /></Text>}
                    keyExtractor={(item, index) => index}
                  />
                </View>
              )
            }
          </CardItem>
        </Card>

        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end', alignSelf:'flex-end'}}>
          {
            this.state.dataSource.length == 0 ? (
              <Button style={{backgroundColor:'grey'}}>
                <Text style={{color:'white'}}>Save Result</Text>
              </Button>
            ):(
              <Button primary onPress={()=> this.toFile()}>
                <Text style={{color:'white'}}>Save Result</Text>
              </Button>
            )
          }
        </View>
      </View>
    );
  }
}
