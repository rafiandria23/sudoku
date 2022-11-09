import React, {FC, memo, useMemo} from 'react';
import {Platform} from 'react-native';
import {
  IIconProps as NativeBaseIconProps,
  Icon as NativeBaseIcon,
} from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';

export interface IconProps extends Omit<NativeBaseIconProps, 'as'> {
  focused?: boolean;
}

const Icon: FC<IconProps> = ({focused, name, ...rest}) => {
  const iconName = useMemo(() => {
    let finalName = '';

    switch (Platform.OS) {
      case 'android':
        finalName = `md-${name}-outline`;
        break;

      case 'ios':
        finalName = `ios-${name}-outline`;
        break;

      default:
        finalName = name;
        break;
    }

    if (focused) {
      finalName = finalName.replace('outline', 'sharp');
    }

    return finalName;
  }, [name, focused]);

  return <NativeBaseIcon as={Ionicon} name={iconName} {...rest} />;
};

export default memo(Icon);
