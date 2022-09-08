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
if the project gives the following error:
```
Invariant Violation: ViewPropTypes has been removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.
at node_modules\expo\build\environment\react-native-logs.fx.js:null in error
at node_modules\react-native\Libraries\Core\ExceptionsManager.js:null in reportException
at node_modules\react-native\Libraries\Core\ExceptionsManager.js:null in handleException
at node_modules\react-native\Libraries\Core\setUpErrorHandling.js:null in handleError
at node_modules\expo\build\errors\ExpoErrorManager.js:null in errorHandler
at node_modules\expo\build\errors\ExpoErrorManager.js:null in <anonymous>
at node_modules\@react-native\polyfills\error-guard.js:null in ErrorUtils.reportFatalError
at node_modules\metro-runtime\src\polyfills\require.js:null in guardedLoadModule
at http://i5-u6c.anonymous.my-app1111.exp.direct/node_modules%5Cexpo%5CAppEntry.bundle?platform=android&dev=true&hot=false&strict=false&minify=false:nul
l in global code



Invariant Violation: "main" has not been registered. This can happen if:
* Metro (the local dev server) is run from the wrong folder. Check if Metro is running, stop it and restart it in the current project.
* A module failed to load due to an error and `AppRegistry.registerComponent` wasn't called.
at node_modules\expo\build\environment\react-native-logs.fx.js:null in error
at node_modules\react-native\Libraries\Core\ExceptionsManager.js:null in reportException
at node_modules\react-native\Libraries\Core\ExceptionsManager.js:null in handleException
at node_modules\react-native\Libraries\Core\setUpErrorHandling.js:null in handleError
at node_modules\expo\build\errors\ExpoErrorManager.js:null in errorHandler
at node_modules\expo\build\errors\ExpoErrorManager.js:null in <anonymous>
at node_modules\@react-native\polyfills\error-guard.js:null in ErrorUtils.reportFatalError
at node_modules\react-native\Libraries\BatchedBridge\MessageQueue.js:null in __guard
at node_modules\react-native\Libraries\BatchedBridge\MessageQueue.js:null in callFunctionReturnFlushedQueue
```

set the react-native version as 0.69.0
