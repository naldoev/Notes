import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground,Image,} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//importando imagens
import Logo from './app/imagens/logo.png'; //Definir imagem e importar de /imagens/logo.png
const fundo = { uri: "https://iphone11papers.com/wp-content/uploads/papers.co-sf42-sky-blue-clear-love-gradation-blur-41-iphone-wallpaper.jpg" };

// importando telas
import Intro from './app/screens/Intro'; // tela intro que pede o nome de usuário
import NoteScreen from './app/screens/NoteScreen'; // tela que exibe todas as notas
import NoteDetail from './app/components/NoteDetail'; //tela exibida ao abrir uma nota
import NoteProvider from './app/contexts/NoteProvider'; //tela que fornece a nota pequisada

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
  }, []);

  const renderNoteScreen = props => <NoteScreen {...props} user={user} />;

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{ headerTitle: '', headerTransparent: true }}
        >
          <Stack.Screen component={renderNoteScreen} name='NoteScreen' />
          <Stack.Screen component={NoteDetail} name='NoteDetail' />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
