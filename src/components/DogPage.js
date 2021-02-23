import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import PlainText from './PlainText';

const DogPage = ({route, navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [images, setImages] = useState([]);
  const [desc, setDesc] = useState();
  useEffect(() => {
    const {breed} = route.params; //RETRIEVING FURTHER INFO
    axios.get(`https://dog.ceo/api/breed/${breed}/images`).then(({data}) => {
      console.log(data);
      setImages(data.message);
    });

    axios
      .get(
        `https://en.wikipedia.org/w/api.php?format=json&explaintext&prop=extracts&explaintext&exintro&action=query&list=search&srsearch=${breed}%20dog`,
      )
      .then(({data}) => {
        console.log(data);

        setDesc(data.query.search[0].snippet);
      });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#006b76'}}>
      <View style={{flex: 1}}>
        <FlatList
          snapToAlignment={'left'}
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{justifyContent: 'center'}}
          data={images}
          renderItem={({item}) => {
            return (
              <View style={{margin: 10, padding: 10}}>
                <Image
                  source={{uri: item}}
                  style={{width: width - 20, height: height * 0.3}}
                />
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          padding: 10,
        }}>
        <PlainText text={desc} />
      </View>
    </View>
  );
};

export default DogPage;
