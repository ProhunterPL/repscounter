import { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Audio } from 'expo-av';
import * as Device from 'expo-device';
import * as LinkingExpo from 'expo-linking';

export default function App() {
  const [count, setCount] = useState(0);
  const [sound, setSound] = useState();

  // Load click sound
  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/click.mp3')
    );
    setSound(sound);
  }

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, []);

  // TEMP BUTTON TO SIMULATE VOLUME UP PRESS
  const handleAdd = async () => {
    setCount(count + 1);
    if (sound) await sound.replayAsync();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Image source={require('./assets/logo.png')} style={{ width: 150, height: 150, marginBottom: 20 }} />
      <Text style={{ color: 'white', fontSize: 48, fontWeight: 'bold' }}>{count}</Text>

      <TouchableOpacity onPress={handleAdd} style={{ marginTop: 30, backgroundColor: '#FF6A00', padding: 20, borderRadius: 12 }}>
        <Text style={{ color: 'white', fontSize: 20 }}>+1 REP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setCount(0)} style={{ marginTop: 15 }}>
        <Text style={{ color: 'gray', fontSize: 16 }}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL('https://incoresports.eu')} style={{ position: 'absolute', bottom: 40 }}>
        <Text style={{ color: '#FF6A00', fontSize: 16 }}>Visit incoreports.eu</Text>
      </TouchableOpacity>
    </View>
  );
}
