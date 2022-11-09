import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
} from 'react-native';
// import CountDown from 'react-native-countdown-component';
// import LottieView from 'lottie-react-native';

// Constants
import {SudokuDifficulty} from '@/constants/sudoku';

// APIs
import {SudokuAPI} from '@/api';

// Components
import {Board} from '@/components';

// Utils
// import {capitalize} from '@/utils';

export interface GameScreenRouteParams {
  difficulty: SudokuDifficulty;
}

const GameScreen: FC = () => {
  const {
    data: board,
    // isError,
    isLoading,
  } = SudokuAPI.useGetBoardQuery('easy');
  // const dispatch = useDispatch();
  // const playerName = useSelector(state => state.playerReducer.name);
  // const playerScore = useSelector(state => state.playerReducer.score);
  // const loading = useSelector(state => state.gameReducer.loading);
  // const difficulty = route.params.difficulty;
  // const board = useSelector(state => state.boardReducer.board);
  // const status = useSelector(state => state.boardReducer.status);
  // const playerDifficulty = useSelector(state => state.playerReducer.difficulty);

  // useEffect(() => {
  //   dispatch(setSudokuStatus('') as any);
  //   dispatch(fetchBoard(difficulty) as any);
  // }, [dispatch, difficulty]);

  // useEffect(() => {
  //   if (status.length > 0) {
  //     alert(`${capitalize(status)}!`);
  //     dispatch(setSudokuStatus(''));
  //   }
  // }, [dispatch, status]);

  // useEffect(() => {
  //   if (playerScore !== 0) {
  //     navigation.navigate('Finish');
  //   }
  // }, [navigation, playerScore]);

  // const countdownOnFinish = () => {
  //   alert(`Time's up!`);
  //   navigation.navigate('Finish');
  // };

  // const handleFinishButton = () => {
  //   navigation.navigate('Finish');
  // };

  // const decidePlayDuration = () => {
  //   switch (playerDifficulty) {
  //     case 'easy':
  //       return 60 * 15;

  //     case 'medium':
  //       return 60 * 12;

  //     case 'hard':
  //       return 60 * 9;

  //     default:
  //       return 60 * 15;
  //   }
  // };

  const renderBoardScreen = () => {
    return (
      <>
        {/* <View>
          <Text
            style={
              customStyles.playerGreeterText
            }>{`Happy solving, ${playerName}!`}</Text>
        </View> */}
        <View style={customStyles.playerDataContainer}>
          {/* <View style={customStyles.playerDataItem}>
            <Text
              style={customStyles.timeRemainingText}>{`Time Remaining`}</Text>
            <CountDown
              style={customStyles.countdown}
              until={decidePlayDuration()}
              size={20}
              onFinish={countdownOnFinish}
              // onChange={e => console.log(e)}
              digitStyle={{backgroundColor: '#FFF'}}
              digitTxtStyle={{color: 'blue'}}
              timeToShow={['M', 'S']}
            />
          </View> */}
          <View style={customStyles.playerDataItem}>
            <View style={customStyles.totalScoreContainer}>
              <View style={customStyles.totalScoreTitle}>
                <Text>Total Score</Text>
              </View>
              {/* <Text style={customStyles.totalScore}>{playerScore}</Text> */}
            </View>
            <View style={customStyles.difficultyStatusContainer}>
              <Text style={customStyles.difficultyStatus}>Difficulty</Text>
              {/* <Text style={customStyles.difficultyStatus}>
                {capitalize(playerDifficulty)}
              </Text> */}
            </View>
          </View>
        </View>

        <View>
          <Board board={board} />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={customStyles.buttonGroup}>
              {/* <View style={customStyles.difficultyPicker}>
                <Text>Pick a difficulty:</Text>
                <TouchableOpacity
                  style={customStyles.difficultyButtonEasy}
                  onPress={() => dispatch(fetchBoard('easy'))}>
                  <Text style={customStyles.difficultyText}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={customStyles.difficultyButtonMedium}
                  onPress={() => dispatch(fetchBoard('medium'))}>
                  <Text style={customStyles.difficultyText}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={customStyles.difficultyButtonHard}
                  onPress={() => dispatch(fetchBoard('hard'))}>
                  <Text style={customStyles.difficultyText}>Hard</Text>
                </TouchableOpacity>
              </View> */}
              {/* <View style={customStyles.boardAction}>
                <TouchableOpacity
                  style={customStyles.button}
                  onPress={() => dispatch(validateSudoku(board))}>
                  <Text style={customStyles.buttonText}>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={customStyles.button}
                  onPress={() => dispatch(solveSudoku(board))}>
                  <Text style={customStyles.buttonText}>Give Up!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={customStyles.button}
                  onPress={() => dispatch(resetSudoku(board))}>
                  <Text style={customStyles.buttonText}>Reset</Text>
                </TouchableOpacity>
              </View> */}
              <View style={customStyles.boardAction}>
                <TouchableOpacity
                  style={customStyles.runAwayButton}
                  // onPress={handleFinishButton}
                >
                  <Text style={customStyles.runAwayText}>RUN AWAY??</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </>
    );
  };

  const renderLoading = () => {
    if (Platform.OS !== 'ios') {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return (
        // <LottieView
        //   autoPlay
        //   loop
        //   style={customStyles.lottieLoading}
        //   source={require('../../assets/island.json')}
        // />
        <View />
      );
    }
  };

  return (
    <View style={customStyles.boardContainer}>
      {isLoading ? renderLoading() : renderBoardScreen()}
    </View>
  );
};

export default GameScreen;

const customStyles = StyleSheet.create({
  boardContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  playerDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'baseline',
  },
  playerDataItem: {
    flex: 3,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  playerGreeterText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  sudokuTimerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'baseline',
  },
  timeRemainingText: {
    marginVertical: 5,
  },
  countdown: {
    marginVertical: 5,
  },
  playerDetails: {
    alignItems: 'flex-start',
  },
  totalScoreTitle: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  totalScore: {
    marginVertical: 3,
    borderTopWidth: 2,
    borderTopColor: 'pink',
  },
  lottieLoading: {
    height: 200,
    width: 200,
  },
  buttonGroup: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: 'pink',
    padding: 12,
    margin: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  difficultyPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 10,
    margin: 10,
  },
  difficultyButtonEasy: {
    backgroundColor: 'green',
    padding: 8,
    margin: 8,
    borderRadius: 8,
  },
  difficultyButtonMedium: {
    backgroundColor: 'orange',
    padding: 8,
    margin: 8,
    borderRadius: 8,
  },
  difficultyButtonHard: {
    backgroundColor: 'red',
    padding: 8,
    margin: 8,
    borderRadius: 8,
  },
  difficultyText: {
    color: 'white',
  },
  boardAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  runAwayButton: {
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 8,
  },
  runAwayText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalScoreContainer: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
  },
  difficultyStatusContainer: {
    alignItems: 'center',
  },
  difficultyStatus: {
    marginVertical: 3,
  },
});
