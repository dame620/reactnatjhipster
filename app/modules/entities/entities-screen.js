import React from 'react';
import { ScrollView, Text } from 'react-native';
// Styles
import RoundedButton from '../../shared/components/rounded-button/rounded-button';

import styles from './entities-screen.styles';

export default function EntitiesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="entityScreenScrollList">
      <Text style={styles.centerText}>JHipster Entities will appear below</Text>
      <RoundedButton text="Appointment" onPress={() => navigation.navigate('Appointment')} testID="appointmentEntityScreenButton" />
      <RoundedButton text="Manager" onPress={() => navigation.navigate('Manager')} testID="managerEntityScreenButton" />
      <RoundedButton text="Company" onPress={() => navigation.navigate('Company')} testID="companyEntityScreenButton" />
      <RoundedButton text="Bank" onPress={() => navigation.navigate('Bank')} testID="bankEntityScreenButton" />
      <RoundedButton text="Adviser" onPress={() => navigation.navigate('Adviser')} testID="adviserEntityScreenButton" />
      {/* jhipster-react-native-entity-screen-needle */}
    </ScrollView>
  );
}
