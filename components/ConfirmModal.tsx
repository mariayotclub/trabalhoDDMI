import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }: any) => (
  <Modal visible={isOpen} transparent animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.msg}>{message}</Text>
        <View style={styles.btns}>
          <TouchableOpacity onPress={onClose}><Text>Cancelar</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { onConfirm(); onClose(); }}>
            <Text style={{color: 'red', fontWeight: 'bold'}}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  content: { backgroundColor: '#fff', padding: 25, borderRadius: 15, width: '80%' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  msg: { marginBottom: 20, color: '#666' },
  btns: { flexDirection: 'row', justifyContent: 'flex-end', gap: 25 }
});