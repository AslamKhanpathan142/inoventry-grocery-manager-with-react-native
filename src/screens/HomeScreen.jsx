import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AllItem from './AllItem';
import CreateScreen from './CreateScreen';


const HomeScreen = () => {
  const [view, setView] = useState(0);
  const [data, setData] = useState([
  { id: 1, name: 'Wheat', stock: 25, unit: 'kg' },
  { id: 2, name: 'Rice', stock: 20, unit: 'kg' },
  { id: 3, name: 'Corn', stock: 10, unit: 'kg' },
  { id: 4, name: 'Basmati Rice', stock: 50, unit: 'kg' },
  { id: 5, name: 'Pulse', stock: 5, unit: 'kg' },
])
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inventory Manager</Text>

      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            view == 0 ? { backgroundColor: '#62e70fff' } : null,
          ]}
          onPress={() => setView(0)}
        >
          <Text
            style={[styles.buttonText, view == 0 ? { color: '#fff' } : null]}
          >
            All Item
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            view == 1 ? { backgroundColor: '#62e70fff' } : null,
          ]}
          onPress={() => setView(1)}
        >
          <Text
            style={[styles.buttonText, view == 1 ? { color: '#fff' } : null]}
          >
            Low Stock
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            view == 2 ? { backgroundColor: '#62e70fff' } : null,
          ]}
          onPress={() => setView(2)}
        >
          <Text
            style={[styles.buttonText, view == 2 ? { color: '#fff' } : null]}
          >
            Create
          </Text>
        </Pressable>
      </View>

      {view === 0 && <AllItem data={data} />}
      {view === 1 && <AllItem data={data.filter((item) => item.stock <= 10)}/>}
      {view === 2 && <CreateScreen  data={data} setData={setData}/>}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: '4%',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#62e70fff',
  },
  buttonText: {
    color: '#62e70fff',
    fontSize: 14,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 40,
  },
});
