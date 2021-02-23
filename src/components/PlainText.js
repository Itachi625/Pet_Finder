import React from 'react';
import {Text} from 'react-native';

const PlainText = ({text}) => {
  if (!text) {
    return null;
  }
  const plainText = text.replace(/<[^>]*>?/gm, '').replace(/\&quot\;/gm, "'");

  return (
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
      {plainText}
    </Text>
  );
};

export default PlainText;
