import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import filter from 'lodash.filter';
import {set} from 'lodash';

const HomePage = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [breeds, setBreeds] = useState({});
  const [query, setQuery] = useState('');
  const [dataBreed, setDataBreed] = useState({});
  const assembledBreedObject = {};

  useEffect(() => {
    setLoading(true);
    axios.get('https://dog.ceo/api/breeds/list/all').then(({data}) => {
      setLoading(false);
      const breedsObject = data.message;
      const breedKeys = Object.keys(breedsObject);

      breedKeys.map((key) => {
        if (breedsObject[key].length > 0) {
          //sub breeds
          breedsObject[key].forEach((subBreed) => {
            assembledBreedObject[key + '_' + subBreed] = key + '/' + subBreed;
          });
        } else {
          assembledBreedObject[key] = key;
          //no sub breed
        }
      });
      setBreeds(assembledBreedObject);
      setDataBreed(assembledBreedObject);
    });
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(breeds, (user) => {
      return contains(user, formattedQuery);
    });
    setDataBreed(filteredData);
    setQuery(text);
    // console.log(query);
  };

  const contains = (message, query) => {
    if (message.includes(query)) {
      return true;
    }

    return false;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#006b76',
      }}>
      <View style={{flex: 1}}>
        <Image style={styles.img} source={require('../dog.jpg')} />
      </View>
      <View
        style={{
          padding: 5,
          marginVertical: 10,
          borderRadius: 20,
        }}>
        <TextInput
          style={styles.img}
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search the breed"
          style={{backgroundColor: '#ffffff', paddingHorizontal: 20}}
        />
      </View>
      <View style={{flex: 4, flexDirection: 'row'}}>
        <FlatList
          style={{
            backgroundColor: '#006b76',
          }}
          extraData={dataBreed}
          keyExtractor={(item) => item}
          // ListHeaderComponent={renderHeader} //render at first
          data={Object.keys(dataBreed)}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 10,
                }}
                onPress={() => {
                  navigation.navigate('DogPage', {breed: dataBreed[item]});
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    borderBottomWidth: 1,
                    borderBottomColor: '#26a69a',
                    paddingLeft: 30,
                    paddingRight: 30,
                    textShadowOffset: {width: 5, height: 5},
                    textShadowRadius: 10,
                    fontSize: 24,
                  }}>
                  <View>
                    <Image
                      source={require('../pic2.jpg')}
                      style={styles.img1}
                    />
                  </View>
                  <Text> </Text>

                  {dataBreed[item]}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img1: {
    height: 25,
    width: 25,
  },
  img: {
    backgroundColor: 'black',
  },
});

export default HomePage;
