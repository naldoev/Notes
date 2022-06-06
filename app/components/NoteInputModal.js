import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Modal, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard,} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitulo(note.title);
      setConteudo(note.conteudo);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitulo(text);
    if (valueFor === 'conteudo') setConteudo(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !conteudo.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, conteudo, Date.now());
    } else {
      onSubmit(title, conteudo);
      setTitulo('');
      setConteudo('');
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitulo(''); //se nada for editado, fechar nota
      setConteudo('');
    }
    onClose(); 
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={text => handleOnChangeText(text, 'title')}
            placeholder='Título da nota'
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={conteudo}
            multiline
            placeholder='Conteúdo da nota'
            style={[styles.input, styles.conteudo]}
            onChangeText={text => handleOnChangeText(text, 'conteudo')}
          />
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={25}
              antIconName='check' //ícone do botão confirmar
              onPress={handleSubmit}
            />
            {title.trim() || conteudo.trim() ? (
              <RoundIconBtn
                size={25}
                style={{ marginLeft: 15 }}
                antIconName='close'
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 29,
    color: colors.DARK,
  },
  title: {
    height: 50,
    marginBottom: 25,
    fontWeight: 'bold',
    backgroundColor: '#eeeeee',
    borderRadius: 4,
    padding: 6,
  },
  conteudo: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

export default NoteInputModal;
