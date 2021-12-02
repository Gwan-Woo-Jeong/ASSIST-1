import React from 'react';
import { colors } from '../../theme/colors';
import { Regular } from '../../theme/fonts';
import CommonButton from './CommonButton';

type ButtonProps = {
  color?: 'blue' | 'transparent' | 'whiteSmoke';
  text: string;
  onPress: () => void;
};

export default function CommonModalButton({ color, text, onPress }: ButtonProps) {
  const backgroundColor =
    color === 'blue' ? colors.blue : color === 'transparent' ? 'transparent' : colors.whiteSmoke;
  return (
    <CommonButton
      onPress={onPress}
      buttonRadius="15px"
      buttonBgColor={backgroundColor}
      width="100%"
      height="50px">
      <Regular gray={color !== 'blue'} white={color === 'blue'} size={13}>
        {text}
      </Regular>
    </CommonButton>
  );
}