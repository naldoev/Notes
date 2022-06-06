import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {View, StyleSheet, Text, TextInput, StatusBar, Dimensions,ImageBackground,Image,} from 'react-native';
import RoundIconBtn from '../components/RoundIconBtn'; // importar botões
import colors from '../misc/colors'; // importar estilos
import Logo from '../imagens/logo.png'; //Definir imagem e importar de /imagens/logo.png

//const fundo = { uri: "https://p4.wallpaperbetter.com/wallpaper/366/934/534/blurred-colorful-chrome-os-chrome-digital-art-hd-wallpaper-preview.jpg" };

const Intro = ({ onFinish }) => { // ao carregar o app pela primeira vez, pedir nome de usuário
  const [nome, setName] = useState('');
  const handleOnChangeText = text => setName(text);

  const gravarNome = async () => {
    const usuario = { name: nome };
    await AsyncStorage.setItem('user', JSON.stringify(usuario));
    if (onFinish) onFinish();
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
      <Image source={Logo} style={styles.logo}/>
      <ImageBackground source={require('../imagens/bg-intro2.jpg')} blurRadius={90} style={styles.fundo}>
        <Text style={styles.tituloBoasVindas}>Bem-vindo!</Text>
        <TextInput
          value={nome}
          onChangeText={handleOnChangeText}
          placeholder='Digite o seu nome'
          style={styles.nomeUsuario}
        />
        {nome.trim().length >= 3 ? (
          <RoundIconBtn antIconName='arrowright' onPress={gravarNome} style={styles.botao}/> // botão avançar que ao pressionado grava o nome
        ) : null}
      </ImageBackground>
      </View>
    </>
  );
};

const width = Dimensions.get('window').width - 0;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tituloBoasVindas: {
    alignSelf: 'center',
    color: colors.LIGHT,
    marginBottom: 5,
    fontSize: 38,
    opacity: 0.8,
  },
  nomeUsuario: {
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    backgroundColor: '#fff',
    color: colors.DARK,
    width,
    height: 50,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 15,
    opacity: 0.8,
  },
  fundo: {
    resizeMode: 'cover',
    flex: 1,
    justifyContent: "center"
  },
  logo: {
    resizeMode: "contain",
    width: "100%",
    height: null,
    marginTop: 40,
    aspectRatio: 3000 / 450, // Image ratio
  },
  botao: {
    alignSelf: 'center',
    backgroundColor: colors.LIGHT,
    opacity: 0.5,
    marginTop: 20,
    width: 100,
    textAlign: 'center',
  },
});

export default Intro;