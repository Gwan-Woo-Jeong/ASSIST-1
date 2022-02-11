import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import LoadingView from '../../components/view/LoadingView';
import useMatchDetail from '../../hooks/useMatchDetail';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { MatchInfo } from '../../../@types/global/types';

type MatchVoteProps = StackScreenProps<RootStackParamList, 'MatchVote_Main'>;

export default function MatchVote_Main({ route }: MatchVoteProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { isLoading, data } = useMatchDetail({ matchId: route.params?.matchId });

  useEffect(() => {
    if (!isLoading) {
      getMatchVoteScreen(data);
    }
  }, [isLoading]);

  const getMatchVoteScreen = (data: MatchInfo) => {
    if (data?.condition === '경기 확정') {
      // 경기 확정
      navigation.replace('MatchVote_3', { data });
    } else if (data?.condition === '인원 모집 중') {
      if (data.vote === 'nonRes') {
        // 인원 모집 중
        navigation.replace('MatchVote_1', { data });
      } else {
        // 투표 완료
        navigation.replace('MatchVote_2', { data });
      }
    } else if (data?.condition === '경기 취소') {
      // 경기 취소
      navigation.replace('MatchVote_4', { data });
    } else if (data?.condition === '경기 완료') {
      navigation.replace('MatchVote_5', { data });
    } else if (data?.condition === '경기중') {
      navigation.replace('MatchVote_5', { data, inGame: true });
    }
    return null;
  };

  return <LoadingView />;
}
