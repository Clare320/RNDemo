import React, { Component } from 'react';
import {
    View,
    Button,
    Text,
    StyleSheet
} from 'react-native';

export default class TestTransformScreen extends Component {
   static navigationOptions = {
        title:'Transform'
   };
   
   constructor(props) {
       super(props);

        this.state = {
            transform:[]
        }
   }

    render() {
        // 这里需要注意 除了rotate，skew之外其余transform全是数字
        // rn中的transform操作不保留状态的，每次操作都是基于最初状态
        let buttons = [
            {
                title:'reset',
                action:undefined
            },
            {
                title:'rotate',
                action:{rotate:'45deg'}
            },
            {
                title:'rotateZ',
                action:{rotate:'45deg'}
            },
            {
                title:'transformX+70',
                action:{translateX:70}
            },
            {
                title:'transformX-70',
                action:{translateX:-70}
            },
            {
                title:'transformY+70',
                action:{translateY:70}
            },
            {
                title:'skewX',
                action:{skewX:'45deg'}
            },
            {
                title:'skewY',
                action:{skewY:'45deg'}
            },
        ];
        return ( 
            <View style={styles.container}>
                <View style={styles.buttons}>
                   {
                        buttons.map((item, index) => {
                            return <Button 
                                key={String(index)}
                                title={item.title}
                                onPress={()=>{
                                    let arr = []
                                    if (item.action) {
                                       arr.push(item.action);
                                    }  
                                    this.setState({
                                        transform:arr
                                    });
                                }}
                            />
                       })
                   }
                </View>
                <View 
                    style={[styles.cube, {transform:this.state.transform}]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#f5f5f5'
    },
    buttons: {
        backgroundColor:'white',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-start',
        margin:12,
    },
    cube: {
        width: 80,
        height: 80,
        marginTop: 50,
        alignSelf: 'center',
        backgroundColor: 'cyan'
    }
});