import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const gamesData = [
  { id: '1', title: 'The Legend of Zelda: Breath of the Wild' },
  { id: '2', title: 'Super Mario Odyssey' },
  { id: '3', title: 'Minecraft' },
  { id: '4', title: 'Fortnite' },
];

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogos Disponíveis</Text>
      <FlatList
        data={gamesData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#6200ea',
    borderRadius: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Home;
