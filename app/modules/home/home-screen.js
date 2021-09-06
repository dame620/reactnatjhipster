import React from 'react';
import { ScrollView, Text, Image, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import LearnMoreLinks from './learn-more-links.component.js';
import { Images } from '../../shared/themes';
import styles from './home-screen.styles';

function HomeScreen(props) {
  const { account } = props;
  return (
    <View style={[styles.container, styles.mainContainer]} testID="homeScreen">
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.centered}>
          <Image source={Images.banquervlogo} style={styles.logo} />
          <Text style={styles.welcomeText}>Baamtu</Text>
          <Text style={styles.welcomeText}>Bienvenue dans votre systeme de planification de rendez vous.</Text>
        </View>
        {account && account.login ? (
          <View style={[styles.authContainer, styles.authContainerTrue]} testID="authDisplayTrue">
            <Text style={styles.authText}>
              <Ionicons name="md-checkmark-circle" size={22} color={'white'} /> Bienvenue {account.login}
            </Text>
          </View>
        ) : (
          <View style={[styles.authContainer, styles.authContainerFalse]} testID="authDisplayFalse">
            <Text style={styles.authText}>
              <Ionicons name="md-information-circle" size={22} color={'white'} /> Se Connecter.
            </Text>
          </View>
        )}
        <View style={styles.hairline} />
        {/* <Header /> */}
        {global.HermesInternal == null ? null : (
          <View style={styles.engine}>
            <Text style={styles.footer}>Engine: Hermes</Text>
          </View>
        )}
        <View style={styles.body}>
          {Platform.OS !== 'android' ? null : (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Vous etes</Text>
              <Text style={styles.sectionDescription}>
                Gerant <Text style={styles.highlight}>dans une entreprise</Text>prenez rendez vous
              </Text>
            </View>
          )}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Avec un conseiller banquier</Text>
            <Text style={styles.sectionDescription}>
              Vous pouvez <Text style={styles.highlight}>prendre</Text> rendez vous tous les jours du lundi au vendredi entre 8h et 17h
            </Text>
          </View>
          {/*
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Learn More</Text>
          </View>
          <LearnMoreLinks />
           */}
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => ({ account: state.account.account });
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
