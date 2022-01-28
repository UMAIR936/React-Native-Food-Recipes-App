import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import {
  AdMobBanner, AdMobInterstitial,
  
} from 'expo-ads-admob';
import * as Analytics from 'expo-firebase-analytics'; 


export default class HomeScreen extends React.Component {
  
  

  static navigationOptions = ({ navigation }) => ({
    title: 'FOOD GALLERY',
    headerLeft: () => <MenuImage
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  });

  constructor(props) {
    super(props);
  }
 
  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(100,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );


  async componentDidMount(){
    await AdMobInterstitial.setAdUnitID('ca-app-pub-5133819967570825/1824480037');
    await AdMobInterstitial.requestAdAsync({servePersonalizedAds: true});
    await AdMobInterstitial.showAdAsync();

    Analytics.logEvent('share', {
      contentType: 'text', 
      itemId: 'Expo rocks!', 
      // method: 'facebook'
    });
  }

  render() {
    return (
   
      <View>
       
       
       
        <FlatList
          
          vertical
          showsVerticalScrollIndicator={true}
          numColumns={1}
          data={recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
      </View>
    );
  }
}
