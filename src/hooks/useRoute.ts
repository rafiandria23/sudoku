import {useRoute as useReactRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';

// Types
import type {RootStackParams} from '@/types';

function useNavigation<K extends keyof RootStackParams>() {
  return useReactRoute<RouteProp<RootStackParams, K>>();
}

export default useNavigation;
