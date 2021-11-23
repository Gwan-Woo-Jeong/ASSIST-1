/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View } from 'react-native';
import LineInput from './src/components/CustomInput/LineInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { Bold } from './src/theme/fonts';
import styled from 'styled-components/native';
import { fontsToLoad } from './src/assets/assets';
import { imagesToLoad } from './src/assets/assets';

const schema = yup.object({
  id: yup
    .string()
    .required('아이디는 필수입니다.')
    .typeError('영문을 포함해야 합니다.')
    .matches(/^.{4,14}$/s, '8 ~ 14자 사이여야 합니다.'),
  password: yup
    .string()
    .required('비밀번호는 필수입니다.')
    .matches(/^.{8,12}$/s, '8 ~ 13자 사이여야 합니다.')
    .matches(/^.*[a-zA-Z].*$/, '영문을 포함해야 합니다.')
    .matches(/\d/, '숫자를 포함해야 합니다.')
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/, '특수문자를 포함해야 합니다.'),
});

import { colors, fonts } from './src/theme/index';

const BlueText = styled(Bold)`
  color: red;
`;

const BigText = styled(BlueText)`
  font-size: 20px;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 5px;
`;
const Text = styled.Text`
  font-family: ${fonts.primary};
  font-size: 16px;
  text-align: center;
  color: #fff;
`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preloadAssets = async () => {
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagePromises = imagesToLoad.map((image: string | number | string[] | number[]) =>
      Asset.loadAsync(image),
    );
    await Promise.all<Promise<void> | Promise<Asset[]>>([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    return preloadAssets();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (data: string) => {
    console.log(data);
  };

  if (loading) {
    return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />;
  }

  return (
    <View>
      <BlueText>Open up App.tsx to start working on your app!</BlueText>
      <BigText>Big Text</BigText>
      <StatusBar style="auto" />
      <LineInput
        control={control}
        name="id"
        title="아이디"
        placeholder="아이디를 입력해주세요"
        errorMessage={errors.id?.message}
        conditions={[
          { name: '4~14자', regex: /^.{4,14}$/s },
          { name: '영문', regex: /^.*[a-zA-Z].*$/ },
        ]}
      />
      <LineInput
        control={control}
        name="password"
        title="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        conditions={[
          { name: '8~13자', regex: /^.{8,13}$/s },
          { name: '영문', regex: /^.*[a-zA-Z].*$/ },
          { name: '숫자', regex: /\d/ },
          { name: '특수문자', regex: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/ },
        ]}
        secureTextEntry={true}
        errorMessage={errors.password?.message}
      />
    </View>
  );
}
