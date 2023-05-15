import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';




const MapScreen = ( { route }) => {
  const [initialRegion, setInitialRegion] = useState(null); // Permission event
  const [data, setdata]=useState([]);   // data event
  const [isLoaded, setLoaded] = useState(false); // data loaded
  const [MarkerAddvisible, setMarkerAddvisible] = useState(false); // Add marker evenet
  const [inputValue, setInputValue] = useState('');
  const [text, setText] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {username}=route.params;

  const map_url = 'http://192.168.43.58:3000/map';


  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleButtonPress = () => {
    setText(inputValue);
    setMarkerAddvisible(false);
    setInputValue('')
  };

            //Get geocachings
  useEffect(() => {
    if (!isLoaded) {
      fetch(map_url)
        .then((res) => res.json())
        .then((data) => {
          setdata(data);
          setLoaded(true);
        })
        .catch((err) => alert.error(err));
    }
  }, [!isLoaded]);
 
            // Post new marker
    useEffect(() => {
        if (text) {
            fetch(map_url, {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    username: username,
                    position: {latitude: initialRegion.latitude,
                    longitude: initialRegion.longitude},
                    text: text,
                })
            
            })
            .then((res) => {res.json();
                setLoaded(false);
            })
            .then((data) => {
                setText('')
                
            })
            .catch((err) => alert.error(err));
            }

        }, [text]);


            // Request position permission
  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') { 
        // Handle permission not granted
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      // Handle location fetching error
    }
  };

 


  const handleAddMarker = () => {
    // Handle adding a marker
    setMarkerAddvisible(true);
  };

  

  return (
    <View style={styles.container}>
        <MapView style={styles.map} initialRegion={initialRegion} showsUserLocation={true}>
        {isLoaded &&
            data.map((item) => (
              <Marker
                key={item._id}
                coordinate={{
                  latitude: item.position.latitude,
                  longitude: item.position.longitude,
                }}
                pinColor={item.username.trim() === username ? 'blue' : 'red'}
                onPress={() => handleMarkerPress(item)}
              >

                <Callout><Text> "Hint : {item.text}"</Text></Callout>
              </Marker>
            ))}

        </MapView>
    
    <TouchableOpacity style={styles.addButton} onPress={handleAddMarker}>
        <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
    
    {MarkerAddvisible && <View style={styles.overlay} />}

    <Modal visible={MarkerAddvisible} animationType="slide" transparent={true} >
        <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Adding a GeoCach</Text>
        <TextInput
            value={inputValue}
            style={styles.input}
            onChangeText={handleInputChange}
            placeholder="Add your hint (e.g. Don't look up)"
        />

          <TouchableOpacity style={styles.closeButton} onPress={handleButtonPress}>
            <Text style={styles.closeButtonText}>add to the map</Text>
          </TouchableOpacity>

        </View>
      </Modal>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.MarkermodalContainer}>
          {selectedMarker && (
            <Text style={styles.modalText}>Hint :{"\n"} {selectedMarker.text}</Text>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({



  container: {
    flex: 1,
    flexDirection: 'column',
  },

    //Map
  map: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background color
    zIndex: 1,
  },
  
  addButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
  // Modal 

  input:{
    width:"50%",
    height:"50%",
    borderColor: 'rgba(0, 0, 0, 1)',
    },

  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width:"80%",
    height: "60%",
    position:'absolute',
    left:"10%",
    top:"20%",
    backgroundColor: 'rgba(224, 224, 224, 0.95)',
    borderRadius: 30,
    shadowColor: '#fff',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,

  },

  MarkermodalContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    width:"80%",
    height: "60%",
    position:'absolute',
    left:"10%",
    top:"20%",
    backgroundColor: 'rgba(224, 224, 224, 0.95)',
    borderRadius: 30,
    shadowColor: '#fff',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },

  modalText:{
    top:0,
    color:'red',
    fontSize: 20,
    borderColor:"#000",

  },
  closeButton:{
    backgroundColor:'red',
    width:"60%",
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.9)',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    justifySelf:'baseline'

  }
});

export default MapScreen;














