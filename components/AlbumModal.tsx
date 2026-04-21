import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export const AlbumModal = ({ isOpen, onClose, onSave, initialData }: any) => {
  const [form, setForm] = useState({ title: '', artist: '', rating: '5', listenDate: '', comment: '' });

  useEffect(() => {
    if (initialData) setForm({...initialData, rating: String(initialData.rating)});
    else setForm({ title: '', artist: '', rating: '5', listenDate: new Date().toISOString().split('T')[0], comment: '' });
  }, [isOpen]);

  return (
    <Modal visible={isOpen} animationType="slide" transparent>
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.mTitle}>{initialData ? 'Editar Review' : 'Nova Review'}</Text>
          <TextInput style={styles.input} placeholder="Nome do Álbum" value={form.title} onChangeText={t => setForm({...form, title: t})} />
          <TextInput style={styles.input} placeholder="Artista" value={form.artist} onChangeText={t => setForm({...form, artist: t})} />
          <TextInput style={styles.input} placeholder="Data (AAAA-MM-DD)" value={form.listenDate} onChangeText={t => setForm({...form, listenDate: t})} />
          <TextInput style={styles.input} placeholder="Nota (1-5)" keyboardType="numeric" value={form.rating} onChangeText={t => setForm({...form, rating: t})} />
          <TextInput style={[styles.input, {height: 100}]} placeholder="Comentário" multiline value={form.comment} onChangeText={t => setForm({...form, comment: t})} />
          
          <View style={styles.btns}>
            <TouchableOpacity onPress={onClose} style={styles.btnOff}><Text>Cancelar</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => onSave({...form, rating: Number(form.rating)})} style={styles.btnSave}>
              <Text style={{color: '#fff'}}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.9)', justifyContent: 'center', padding: 20 },
  content: { backgroundColor: '#1e293b', padding: 25, borderRadius: 24, borderWidth: 1, borderColor: '#334155' },
  mTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  input: { 
    backgroundColor: '#0f172a', 
    color: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155'
  },
  btns: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15, marginTop: 15 },
  btnSave: { backgroundColor: '#8b5cf6', padding: 12, borderRadius: 10, minWidth: 100, alignItems: 'center' },
  btnOff: { padding: 12, color: '#94a3b8' }
});