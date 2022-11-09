import React, {FC, useCallback} from 'react';
import {SafeAreaView} from 'react-native';
import {Center, VStack, Button, Spacer} from 'native-base';

// Hooks
import {useNavigation} from '@/hooks';

const PlayScreen: FC = () => {
  const navigation = useNavigation();

  const handleNavigateNewGame = useCallback(() => {
    navigation.push('/play/new');
  }, [navigation]);

  return (
    <SafeAreaView>
      <Center>
        <VStack space={8} paddingBottom={16}>
          <Spacer />
          <Button size="lg" colorScheme="primary">
            Continue Game
          </Button>
          <Button size="lg" colorScheme="primary">
            New Game
          </Button>
        </VStack>
      </Center>
    </SafeAreaView>
  );
};

export default PlayScreen;
