import React, {FC, useCallback} from 'react';
import {SafeAreaView} from 'react-native';
import {Center, VStack, Button, Spacer} from 'native-base';

// Types
import type {Game} from '@/types';

// Constants
import {GameDifficulty, GameStatus} from '@/constants';

// Hooks
import {useNavigation, useSelector, useDispatch} from '@/hooks';

// Redux
import {useLazyGetBoardQuery} from '@/redux/queries';
import {setCurrent} from '@/redux/slices';

const PlayScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector(s => s.game);
  const [getBoard, getBoardProcess] = useLazyGetBoardQuery();

  const handleNavigateNewGame = useCallback(async () => {
    const {data} = await getBoard({
      difficulty: GameDifficulty.EASY,
    });

    const newGame: Game = {
      difficulty: GameDifficulty.EASY,
      board: data.board,
      status: GameStatus.UNSOLVED,
    };

    dispatch(setCurrent(newGame));

    navigation.push('Game', {
      game: newGame,
    });
  }, [navigation, dispatch, getBoard]);

  const handleNavigateContinueGame = useCallback(() => {
    navigation.push('Game', {
      game: state.current,
    });
  }, [navigation, state]);

  return (
    <SafeAreaView>
      <Center>
        <VStack space={8} paddingBottom={16}>
          <Spacer />
          {state.current && (
            <Button
              size="lg"
              colorScheme="secondary"
              onPress={handleNavigateContinueGame}>
              Continue
            </Button>
          )}
          <Button
            size="lg"
            colorScheme="primary"
            isLoading={getBoardProcess.isLoading}
            onPress={handleNavigateNewGame}>
            New Game
          </Button>
        </VStack>
      </Center>
    </SafeAreaView>
  );
};

export default PlayScreen;
