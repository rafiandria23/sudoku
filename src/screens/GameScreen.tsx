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

// Types
import type {Game} from '@/types';

// Constants
import {GameStatus} from '@/constants';

// Hooks
import {useNavigation, useRoute, useDispatch} from '@/hooks';

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
  const dispatch = useDispatch();
  const timerRef = useRef(null);
  const [validateBoard, validateBoardProcess] = useValidateBoardMutation();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [time, setTime] = useState<Game['time']>(0);
  const [board, setBoard] = useState<Game['board']>([]);

  const spinner = useMemo(() => <Spinner />, []);
  const game = useMemo(() => route.params.game, [route]);

  useEffect(() => {
    setTime(game.time);
    setBoard(game.board);
    timerRef.current.start();
  }, [timerRef, game]);

  const handleSave = useCallback(() => {
    timerRef.current.stop();

    if (game.status === GameStatus.UNSOLVED) {
      dispatch(
        setCurrent(
          update(game, {
            board: {
              $set: board,
            },
            time: {
              $set: time,
            },
          }),
        ),
      );
    }
  }, [timerRef, dispatch, game, board, time]);

  useEffect(() => {
    navigation.addListener('beforeRemove', handleSave);

    return () => {
      navigation.removeListener('beforeRemove', handleSave);
    };
  }, [navigation, handleSave]);

  useEffect(() => {
    if (validateBoardProcess.isLoading) {
      navigation.setOptions({
        headerRight: () => spinner,
      });
      return;
    }

    navigation.setOptions({
      headerRight: null,
    });
  }, [navigation, validateBoardProcess, spinner]);

  const handlePause = useCallback(() => {
    timerRef.current.pause();
    setIsPaused(true);
  }, [timerRef]);
  const handleResume = useCallback(() => {
    timerRef.current.resume();
    setIsPaused(false);
  }, [timerRef]);
  const handleTime = useCallback((seconds: number) => {
    setTime(seconds);
  }, []);

  const handleChange = useCallback<BoardProps['onChange']>(
    async changedBoard => {
      const {status} = await validateBoard({
        board: changedBoard,
      }).unwrap();

      if (status === GameStatus.UNSOLVED) {
        setBoard(changedBoard);
      }
    },
    [validateBoard],
  );

  return (
    <>
      <VStack space="2" paddingX="6" paddingY={2}>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack width="1/3" justifyContent="flex-start">
            <Text fontSize="md">{capitalize(game.difficulty)}</Text>
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
              initialSeconds={game.time}
              onTimes={handleTime}
              formatTime="hh:mm:ss"
              textStyle={{
                fontSize: theme.fontSizes.md,
              }}
            />
          </HStack>
        </HStack>

        <Board board={board} onChange={handleChange} />
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
