# Getting Started with tensor-flow-comp

The component is an object detection capable camera component
it takes a model config, the rate for detections per frame,
the handleChange which lifts the detections state up so user can access the detections list,
and a boolean for the built-in developer mode.


## How To Start The Project
you need to run the following commands
```sh
npm install tensor-flow-comp
```
then you need to wait for the installation
then you can use the component by the following structure
```
<TensorflowCameraComp handleDetections={handleDetections} modelConfig={null} renderPerFrame={60} developerMode={false}/>
```

