import {useNavigation as useReactNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Types
import type {RootStackParams} from '@/types';

function useNavigation<K extends keyof RootStackParams>() {
  return useReactNavigation<NativeStackNavigationProp<RootStackParams, K>>();
}

export default useNavigation;
