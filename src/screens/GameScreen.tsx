import React, {
  FC,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  useTheme,
  Spinner,
  Center,
  VStack,
  HStack,
  Text,
  IconButton,
  Button,
  Modal,
} from 'native-base';
import {Timer} from 'react-native-element-timer';
import update from 'immutability-helper';

// Constants
import {GameStatus} from '@/constants';

// Hooks
import {useNavigation, useRoute, useDispatch, useSelector} from '@/hooks';

// Redux
import {setCurrent} from '@/redux/slices';
import {useValidateBoardMutation} from '@/redux/queries';

// Components
import {Icon} from '@/components/shared';
import {BoardProps, Board} from '@/components';

// Utils
import {capitalize} from '@/utils';

const GameScreen: FC = () => {
  const navigation = useNavigation();
  const route = useRoute<'Game'>();
  const theme = useTheme();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector(s => s.game);
  const [validateBoard, validateBoardProcess] = useValidateBoardMutation();

  const spinner = useMemo(() => <Spinner />, []);

  useEffect(() => {
    if (validateBoardProcess.isLoading) {
      navigation.setOptions({
        headerRight: () => spinner,
      });
    } else {
      navigation.setOptions({
        headerRight: null,
      });
    }
  }, [navigation, validateBoardProcess, spinner]);

  const handlePause = useCallback(() => {
    timerRef.current.pause();
    setIsPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    timerRef.current.resume();
    setIsPaused(false);
  }, []);

  const handleChange = useCallback<BoardProps['onChange']>(
    async board => {
      const {status} = await validateBoard({
        board,
      }).unwrap();

      if (status === GameStatus.UNSOLVED) {
        dispatch(
          setCurrent(
            update(state.current, {
              board: {
                $set: board,
              },
            }),
          ),
        );
      }
    },
    [validateBoard, dispatch, state],
  );

  return (
    <>
      <VStack space="2" paddingX="6" paddingY={2}>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack width="1/3" justifyContent="flex-start">
            <Text fontSize="md">
              {capitalize(route.params.game.difficulty)}
            </Text>
          </HStack>
          <HStack width="1/3" justifyContent="center">
            <IconButton
              icon={<Icon name="pause" sharp />}
              onPress={handlePause}
            />
          </HStack>
          <HStack width="1/3" justifyContent="flex-end">
            <Timer
              ref={timerRef}
              formatTime="hh:mm:ss"
              autoStart
              textStyle={{
                fontSize: theme.fontSizes.md,
              }}
            />
          </HStack>
        </HStack>

        <Board board={route.params.game.board} onChange={handleChange} />
      </VStack>

      {/* Pause Modal */}
      <Modal isOpen={isPaused}>
        <Modal.Content>
          <Modal.Body>
            <Center>
              <VStack
                space={8}
                justifyContent="space-between"
                alignItems="center">
                <Text bold fontSize="2xl">
                  Paused
                </Text>

                <Button
                  size="lg"
                  startIcon={<Icon name="play" sharp />}
                  onPress={handleResume}>
                  Resume
                </Button>
              </VStack>
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default GameScreen;
