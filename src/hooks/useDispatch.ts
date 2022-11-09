import {useDispatch as useReduxDispatch} from 'react-redux';

// Redux Store
import {Dispatch} from '@/redux/store';

function useDispatch(): Dispatch {
  return useReduxDispatch();
}

export default useDispatch;
