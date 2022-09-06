import * as React from 'react';
import {TensorflowCameraComp} from "./TensorflowCameraComp";



export default function App() {
  const handleDetections = (e) => {
    console.log(e);
  }
  return (
        <TensorflowCameraComp handleDetections={handleDetections} modelConfig={null} renderPerFrame={60} developerMode={false}/>
  );
}

