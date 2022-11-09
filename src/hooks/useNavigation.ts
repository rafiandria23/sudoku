import {useNavigation as useReactNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Screen Route Params
import type {GameScreenRouteParams} from '@/screens/GameScreen';

export type RootStackParams = {
  '/play/new': GameScreenRouteParams;
};

function useNavigation() {
  return useReactNavigation<
    NativeStackNavigationProp<RootStackParams, keyof RootStackParams>
  >();
}

export default useNavigation;
