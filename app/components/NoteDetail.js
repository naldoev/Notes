import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, Image, } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../contexts/NoteProvider';
import NoteInputModal from './NoteInputModal';
import Logo from '../imagens/logo.png'; //Definir imagem e importar de /imagens/logo.png


// início da constante de data e hora

const formatDate = ms => {
  const data = new Date(ms);
  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();
  const hora = data.getHours();
  const min = data.getMinutes();
  // const seg = data.getSeconds(); se quiser mostrar segundos, deve rtornar ${seg}

  return `${dia}/${mes}/${ano} às ${hora}h${min}.`;
};
// início da constante de data e hora


const NoteDetail = props => {
  const [note, setNote] = useState(props.route.params.note);
  const headerHeight = useHeaderHeight();
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const excluirNota = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const novaNota = notes.filter(n => n.id !== note.id);
    setNotes(novaNota);
    await AsyncStorage.setItem('notes', JSON.stringify(novaNota));
    props.navigation.goBack();
  };
// início da constante para excluir as notas
  const alertaDeExclusao = () => {
    Alert.alert(
      'Excluir nota?',
      'Essa ação excluirá sua nota permanentemente. Deseja continuar?',
      [
        {
          text: 'Excluir',
          onPress: excluirNota,
        },
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelar'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };
// fim da constante para excluir as notas

  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const novaNota = notes.filter(n => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;

        setNote(n);
      }
      return n;
    });

    setNotes(novaNota);
    await AsyncStorage.setItem('notes', JSON.stringify(novaNota));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <ScrollView contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}>
      <Image source={Logo} style={styles.logo}/>
        <Text style={styles.time}>
          {note.isUpdated
            ? `Atualizada em ${formatDate(note.time)}`
            : `Nota criada em ${formatDate(note.time)}`}
        </Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName='delete'
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={alertaDeExclusao}
        />
        <RoundIconBtn antIconName='edit' onPress={openEditModal} />
      </View>
      <NoteInputModal
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 15,
    backgroundColor:'transparent',
    height: "100%",
  },
  logo: {
    resizeMode: "contain",
    width: "100%",
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    borderRadius: 10,
    height: null,
    marginTop: 10,
    aspectRatio: 3000 / 450, // Image ratio
  },
  title: {
    fontSize: 30,
    color: colors.DARK,
    fontWeight: 'bold',
    marginTop: 20,
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
    marginTop: 20,
    backgroundColor: colors.BG,
    borderWidth: 2,
    borderColor: colors.BG,
    borderRadius: 10,
    padding: 10,
  },
  time: {
    textAlign: 'right',
    marginTop: 20,
    fontSize: 13,
    opacity: 0.5,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

export default NoteDetail;
