import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

// Hooks
import {useRoute, useDispatch, useSelector} from '@/hooks';

// Components
import {Board} from '@/components';

// Utils
import {capitalize} from '@/utils';

const GameScreen: FC = () => {
  const route = useRoute<'Game'>();
  const dispatch = useDispatch();
  const state = useSelector(s => s.game);

  // useEffect(() => {
  //   if (playerScore !== 0) {
  //     navigation.navigate('Finish');
  //   }
  // }, [navigation, playerScore]);

  const renderBoardScreen = () => {
    return (
      <>
        <View style={customStyles.playerDataContainer}>
          <View style={customStyles.playerDataItem}>
            <View style={customStyles.difficultyStatusContainer}>
              <Text style={customStyles.difficultyStatus}>Difficulty</Text>
              <Text style={customStyles.difficultyStatus}>
                {capitalize(route.params.game.difficulty)}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Board board={route.params.game.board} />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={customStyles.buttonGroup}>
              <View style={customStyles.difficultyPicker}>
                <Text>Pick a difficulty:</Text>
                <TouchableOpacity style={customStyles.difficultyButtonEasy}>
                  <Text style={customStyles.difficultyText}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={customStyles.difficultyButtonMedium}>
                  <Text style={customStyles.difficultyText}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity style={customStyles.difficultyButtonHard}>
                  <Text style={customStyles.difficultyText}>Hard</Text>
                </TouchableOpacity>
              </View>
              <View style={customStyles.boardAction}>
                <TouchableOpacity style={customStyles.button}>
                  <Text style={customStyles.buttonText}>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity style={customStyles.button}>
                  <Text style={customStyles.buttonText}>Give Up!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={customStyles.button}>
                  <Text style={customStyles.buttonText}>Reset</Text>
                </TouchableOpacity>
              </View>
              <View style={customStyles.boardAction}>
                <TouchableOpacity style={customStyles.runAwayButton}>
                  <Text style={customStyles.runAwayText}>RUN AWAY??</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </>
    );
  };

  // const renderLoading = () => {
  //   if (Platform.OS !== 'ios') {
  //     return <ActivityIndicator size="large" color="#0000ff" />;
  //   } else {
  //     return (
  //       <LottieView
  //         autoPlay
  //         loop
  //         style={customStyles.lottieLoading}
  //         source={require('../../assets/island.json')}
  //       />
  //       <View />
  //     );
  //   }
  // };

  return <View style={customStyles.boardContainer}>{renderBoardScreen()}</View>;
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
