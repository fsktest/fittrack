import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
} from "react-native";
import React, { useState } from "react";
// import { CameraView, useCameraPermissions } from "expo-camera";

const QRScannerModal = ({ onClose, onScanned, visible }) => {
  // const [facing, setFacing] = useState("back");
  // const [permission, requestPermission] = useCameraPermissions();

  // const toggleCameraFacing = () => {
  //   setFacing((prev) => (prev === "front" ? "back" : "front"));
  // };

  // const handleBarCodeScanned = ({ data }) => {
  //   onScanned(data);
  //   onClose();
  // };

  // if (!permission) return <View />;

  // if (!permission.granted) {
  //   return (
  //     <View style={styles.permissionContainer}>
  //       <Text style={styles.message}>
  //         We need your permission to show the camera
  //       </Text>
  //       <Button onPress={requestPermission} title="Grant Permission" />
  //     </View>
  //   );
  // }

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      {/* <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <CameraView
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={handleBarCodeScanned}
            style={styles.camera}
            facing={facing}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.text}>Close</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      </View> */}
    </Modal>
  );
};

export default QRScannerModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)", // Dark semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "70%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000", // Ensures clean border on camera
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "white",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-evenly",
    marginBottom: 30,
  },
  button: {
    alignSelf: "flex-end",
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: "black",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
