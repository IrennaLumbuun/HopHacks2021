import React, {useState} from 'react';
import { StyleSheet, Text, Image, View, SafeAreaView, ScrollView, Dimensions, SectionList } from 'react-native';
import Classifier from 'ml-classify-text'
import { generateSlug } from "random-word-slugs"; 
// import brain from 'brainjs';

export default function imgResult({ navigation }) {
  const {b64Img, foodInImg} = navigation.state.params;
  const redirect = () => {
    navigation.navigate('Upload');
  }

// // not used
//   const brainClassifier = () => {
//     var net = new brain.NeuralNetwork();
//     let trainData = [];
//     let foodItems = foodName;
//     let nonFoodItems = new Set();

//     // generate non food items
//     const options = {
//       format: "camel",
//       partsOfSpeech: ["noun"],
//       categories: {
//         noun: ["animals", "people", "family", "education", "religion", "business", "thing", "transporation", "technology", "place", "profession", "media", "time", "health", "sports", "science"],
//       },
//     };

//     for (let i = 0; i < 5000; i++){
//       nonFoodItems.add(generateSlug(1, options))
//     }
//     nonFoodItems = Array.from(nonFoodItems);

//     foodItems.forEach( item => {
//       trainData.push({
//         input: item,
//         output: [0]
//       })
//     })

//     nonFoodItems.forEach( item => {
//       trainData.push({
//         input: item,
//         output: [1]
//       })
//     })

//     console.log(trainData)

//     net.train(trainData);
//     let output = net.run("sugar");
//     console.log(output)
//   }

// not used
  const trainClassifier = () => {
    let classifier = new Classifier();
    let foodItems = foodName;
    let nonFoodItems = new Set();

    // generate non food items
    const options = {
      format: "camel",
      partsOfSpeech: ["noun"],
      categories: {
        noun: ["animals", "people", "family", "education", "religion", "business", "thing", "transporation", "technology", "place", "profession", "media", "time", "health", "sports", "science"],
      },
    };

    for (let i = 0; i < 5000; i++){
      nonFoodItems.add(generateSlug(1, options))
    }
    console.log(typeof(foodItems));
    classifier.train(foodItems, 'food');
    classifier.train(Array.from(nonFoodItems), 'nonFood');
    return classifier;
  }

  const groupFoodByFirstLetter = () => {
    const map = foodInImg.reduce((acc, val) => {
        let char = val.charAt(0).toUpperCase();
        acc[char] = [].concat((acc[char] || []), val);
        return acc;
    }, {});
    const res = Object.keys(map).map(el => ({
        title: el,
        data: map[el]
    }));
    return (
      <SectionList sections={res}
      styles={{width:'100%', flexGrow: 1}}
      renderItem={({item}) => <Text style={styles.listItem}>{item}</Text>}
      renderSectionHeader={({section}) => <Text style={styles.listSectionHeader}>{section.title}</Text>}
      keyExtractor={(item, index) => index} />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.view}>
          <Image source={require('../assets/vegetables.jpg')} style={styles.imgHeader} />
          <Text style={styles.text}>Your food has been labeled here.</Text>
          <Image source={{ uri: b64Img }} style={styles.resultImg} />
          <View style={[styles.viewAvailableFood]}>
            <Text style={[styles.text, {marginBottom: 20}]}>Found: </Text>
            {groupFoodByFirstLetter()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(210,138,181,255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 40,
  },
  viewAvailableFood: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 20
  },
  imgHeader: {
    height: 200,
    width: Dimensions.get('window').width,
  },
  resultImg: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,
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
  listSectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  listItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: '#d3d3d3'
  },
});
