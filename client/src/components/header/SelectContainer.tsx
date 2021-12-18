import React from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Bold } from '../../theme/fonts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';

const Container = styled.View`
  flex-direction: row;
  padding: 0px 20px;
  margin-bottom: 10px;
`;

const TeamSelector = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const TeamName = styled(Bold)`
  color: ${colors.blue};
  font-size: 17px;
  margin-right: 2px;
`;

export default function SelectContainer() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Container>
      <TeamSelector onPress={() => navigation.navigate('TeamSelect')}>
        <TeamName>팀 선택</TeamName>
        <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.blue} />
      </TeamSelector>
      <TeamSelector>
        <TeamName style={{ color: colors.lightGray }}>용병활동</TeamName>
      </TeamSelector>
    </Container>
  );
}