import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';

// Redux Store
import {RootState} from '@/redux/store';

const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default useSelector;
