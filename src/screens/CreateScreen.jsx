import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';
import React, { useState } from 'react';

const CreateScreen = ({ data, setData }) => {
  const [itemName, setitemName] = useState('');
  const [stock, setStock] = useState('');
  const [isEdit, setEdit] = useState(false);
  const [editItemId, setEditItemId] = useState(null)

  const hadlerAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: itemName,
      stock: stock,
    };
    setData([...data, newItem]);
    setitemName('');
    setStock('');
    setEdit(false)
  };

  const deleteHandle = (id) => {
    setData(data.filter((item) => item.id !== id))
  }

  const editHandle = (item) => {
    setitemName(item.name)
    setEdit(true)
    setEditItemId(item.id)
  }

  const updateItemHandle = () => {
   setData(data.map((item) => (
    item.id === editItemId ? {...item, name: itemName, stock : stock} : item
   )))
  }
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter an stock amount..."
        placeholderTextColor="#62e70fff"
        style={styles.input}
        value={itemName}
        onChangeText={item => setitemName(item)}
      />

      <TextInput
        placeholder="Enter an item name"
        placeholderTextColor="#62e70fff"
        style={styles.input}
        value={stock}
        onChangeText={item => setStock(item)}
      />

      <Pressable style={styles.button} onPress={isEdit ? updateItemHandle :hadlerAddItem}>
        <Text style={{ color: 'white', fontSize: 16 }}>
        {isEdit ? 'Edit Item in the Stack' : 'Add Item in the Stack'}
        </Text>
      </Pressable>

      <View>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>All Items in the Stock</Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.itemContainer,
                item.stock <= 10
                  ? { backgroundColor: '#FFCCCC' }
                  : { backgroundColor: '#D7F6BFFF' },
              ]}
            >
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>
                {item.stock}.{item.unit}
              </Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Pressable onPress={() => editHandle(item)}>
                  <Text style={styles.itemText}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => deleteHandle(item.id)}>
                  <Text style={styles.itemText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '4%',
    gap: 15,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#62e70fff',
  },
  button: {
    backgroundColor: '#62e70fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '400',
  },
});
