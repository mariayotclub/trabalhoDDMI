import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../services/firebase';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AlbumReview } from '../types';
import { AlbumModal } from '../components/AlbumModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { ReviewDetail } from './ReviewDetail';

export const HomeScreen = () => {
  const [reviews, setReviews] = useState<AlbumReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<AlbumReview | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<AlbumReview | null>(null);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "reviews"), where("userId", "==", auth.currentUser?.uid));
    return onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AlbumReview)));
    });
  }, []);

  const handleSave = async (data: any) => {
    if (editingReview?.id) {
      await updateDoc(doc(db, "reviews", editingReview.id), data);
    } else {
      await addDoc(collection(db, "reviews"), { ...data, userId: auth.currentUser?.uid });
    }
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (idToDelete) await deleteDoc(doc(db, "reviews", idToDelete));
  };

  if (selectedReview) return <ReviewDetail review={selectedReview} onBack={() => setSelectedReview(null)} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Reviews</Text>
        <TouchableOpacity onPress={() => auth.signOut()}><Text style={{color: 'red'}}>Sair</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnAdd} onPress={() => { setEditingReview(null); setIsModalOpen(true); }}>
        <Text style={styles.btnAddText}>+ Nova Review</Text>
      </TouchableOpacity>

      <FlatList 
        data={reviews}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => setSelectedReview(item)} style={{flex: 1}}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text>{item.artist} • {item.rating}⭐</Text>
            </TouchableOpacity>
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => { setEditingReview(item); setIsModalOpen(true); }}>
                <Text style={styles.editBtn}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setIdToDelete(item.id!); setIsConfirmOpen(true); }}>
                <Text style={styles.deleteBtn}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <AlbumModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} initialData={editingReview} />
      <ConfirmModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={confirmDelete} title="Excluir?" message="Deseja apagar esta review?" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#0f172a' }, // Fundo Dark Moderno
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#f8fafc' },
  addBtn: { 
    backgroundColor: '#8b5cf6', // Roxo vibrante
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 20, 
    alignItems: 'center',
    shadowColor: "#8b5cf6",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5
  },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: { 
    backgroundColor: '#1e293b', // Azul escuro para o card
    padding: 20, 
    borderRadius: 16, 
    marginBottom: 15, 
    flexDirection: 'row', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155'
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  cardArtist: { color: '#94a3b8' },
  editLink: { color: '#7b23ee', fontWeight: 'bold', marginHorizontal: 10 },
  deleteLink: { color: '#ca49fd', fontWeight: 'bold' },
  btnAdd: { backgroundColor: '#3b82f6', padding: 15, borderRadius: 8, marginBottom: 20, alignItems: 'center' },
  btnAddText: { color: '#fff', fontWeight: 'bold' },
  cardActions: { flexDirection: 'row', gap: 10 },
  editBtn: { color: 'blue', marginRight: 10 },
  deleteBtn: { color: 'red' }
});