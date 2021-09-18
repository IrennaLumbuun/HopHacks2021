import React, {useState} from 'react';
import { StyleSheet, Text, Image, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import Config from 'react-native-config'; // automatically gets all variables in file .env
import axios from 'axios';

export default function imgResult({ navigation }) {
  // TODO: delete later
  const b64img = "data:image/jpeg;base64,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PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPAPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPAOHHPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPHGPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPOPPPPMPDCPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPJDDHKPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPODDDHBDDHNDDDDDDDDDNPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPIDPPPPPPPPPPPPPPPPDEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPFPPPPPPPPPPPPPOMMNPKPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPFPPPPNGAIOPPPPKAAFPKPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPFPPKMPPPLKGPPPPPPPPKPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPFPPEPPPPPPNNPPPPPPPKPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPFPLAPOMMNPLHPPPPPPPKPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPFPLGPLPKHPOPPPPPPPPKPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPFPPJPPPOHPNHPKGNPPPKPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPFJIOMPPPPNLHEKLHNPNIPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPBEAEKBKONHFKBAPKKKGCPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPBDFFFBICGJFPCDMCJLGNFPPPPPPPPPPPPPPPPPPPPPPPPPPPPPEPPPPPPPPPPPPPPPPPPIPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPHPOPNMPPPOPPPPPOFNPLPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPHPFFKJMKKBLOLIHLPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPEGKKLKDICDKAFPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPDDKPHDLLDLPLPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP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";
  // ----

  // TODO: uncomment later
  // const {b64img} = navigation.state.params.b64Img;
  const [hasLabels, setHasLabels] = useState(false);
  // list: https://reactnative.dev/docs/using-a-listview 

  const redirect = () => {
    navigation.navigate('Upload');
  }

  const getCleanB64String = (b64string) => {
    // We want to remove the first chunk (e.g. "data:image/jpeg;base64,")
    // so we find the comma and return the string after it
    const idx = b64string.indexOf(',');
    return b64string.substring(idx + 1) 
  }

  const getLabels = () =>{
    const content = getCleanB64String(b64img);
    let data =JSON.stringify({"requests":[{"image":{"content":content},"features":[{"type":"LABEL_DETECTION"}]}]});

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        if (this.status === 200) {
          const response = this.responseText;
          console.log(response);
        }
      }
    });

    xhr.open("POST", `https://vision.googleapis.com/v1/images:annotate?key=${process.env.API_KEY}`);

    xhr.send(data);
  }

  if (!hasLabels) {
    getLabels();
  }

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.view}>
          <Image source={require('../assets/vegetables.jpg')} style={styles.imgHeader} />
          <Text style={styles.text}>Your food has been labeled here.</Text>
          <Image source={{ uri: b64img }} style={styles.resultImg} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 40,
  },
  imgHeader: {
    height: 200,
    width: Dimensions.get('window').width,
  },
  resultImg: {
    width: Dimensions.get('window').width * 0.9,
    aspectRatio: 1,
    marginVertical: 20,

    //TODO: delete this
    borderColor: 'black',
    borderWidth: 2,
  },
  text: {
    marginTop: 40,
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
});
