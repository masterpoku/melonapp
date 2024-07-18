// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://tds-melon-default-rtdb.asia-southeast1.firebasedatabase.app/Sensor.json');
        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Memuat data pertama kali
    fetchData();

    // Mengatur interval untuk memuat data setiap 2 detik
    const intervalId = setInterval(fetchData, 2000);

    // Membersihkan interval saat komponen dibongkar
    return () => clearInterval(intervalId);
  }, []);

  const getSweetnessLevelText = (value) => {
    if (value <= 20) {
      return 'Sedang Standby';
    } else if (value <= 70) {
      return 'Anyep';
    } else {
      return 'Manis';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#ff9a9e', '#fad0c4']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Sweetness Level</Text>
          <Text style={styles.dataText}>{data}</Text>
          <Text style={styles.sweetnessText}>{getSweetnessLevelText(data)}</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ff6347',
  },
  sweetnessText: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default App;
