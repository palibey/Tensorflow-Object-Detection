import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Platform, Button} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from '@tensorflow-models/mobilenet';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import {TensorFlowCamera} from "./TensorFlowCamera";
import {TensorFlowComp} from "./Functional";



export default function App() {
  const handleDetections = (e) => {
    console.log(e);
  }
  return (
        <TensorFlowComp handleDetections={handleDetections} modelConfig={null} renderPerFrame={60} developerMode={false}/>
  );
}

