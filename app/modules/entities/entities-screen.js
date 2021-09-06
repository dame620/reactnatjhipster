import React from 'react';
import { ScrollView, Text } from 'react-native';
// Styles
import RoundedButton from '../../shared/components/rounded-button/rounded-button';

import styles from './entities-screen.styles';

export default function EntitiesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="entityScreenScrollList">
      <Text style={styles.centerText}>LISTES DES ACTIONS</Text>
      <RoundedButton text="RENDEZ VOUS" onPress={() => navigation.navigate('Appointment')} testID="appointmentEntityScreenButton" />
      <RoundedButton text="GERANT" onPress={() => navigation.navigate('Manager')} testID="managerEntityScreenButton" />
      <RoundedButton text="ENTREPRISE" onPress={() => navigation.navigate('Company')} testID="companyEntityScreenButton" />
      <RoundedButton text="BANQUE" onPress={() => navigation.navigate('Bank')} testID="bankEntityScreenButton" />
      <RoundedButton text="CONSEILLER" onPress={() => navigation.navigate('Adviser')} testID="adviserEntityScreenButton" />
      {/* jhipster-react-native-entity-screen-needle */}
    </ScrollView>
  );
}
