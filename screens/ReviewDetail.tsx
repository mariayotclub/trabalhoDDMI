import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const ReviewDetail = ({ review, onBack }: any) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onBack}><Text style={styles.back}>← Voltar</Text></TouchableOpacity>
    <View style={styles.content}>
      <Text style={styles.emoji}>💿</Text>
      <Text style={styles.title}>{review.title}</Text>
      <Text style={styles.artist}>{review.artist}</Text>
      <Text style={styles.date}>Ouvido em: {review.listenDate}</Text>
      <Text style={styles.rating}>Nota: {"⭐".repeat(review.rating)}</Text>
      <View style={styles.commentBox}>
        <Text style={styles.commentText}>{review.comment}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 60, backgroundColor: '#0f172a' },
  back: { fontSize: 16, color: '#8b5cf6', marginBottom: 20, fontWeight: 'bold' },
  content: { alignItems: 'center' },
  emoji: { fontSize: 80, marginBottom: 10, textShadowColor: '#8b5cf6', textShadowRadius: 10 },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#fff' },
  artist: { fontSize: 22, color: '#8b5cf6', marginBottom: 20, fontWeight: '500' },
  date: { fontSize: 14, color: '#64748b' },
  rating: { fontSize: 24, marginVertical: 15 },
  commentBox: { 
    backgroundColor: '#1e293b', 
    padding: 25, 
    borderRadius: 20, 
    width: '100%',
    borderWidth: 1,
    borderColor: '#334155'
  },
  commentText: { fontSize: 17, color: '#e2e8f0', fontStyle: 'italic', lineHeight: 26, textAlign: 'center' }
});