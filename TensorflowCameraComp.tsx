import React, {useEffect, useState} from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import {Camera, CameraType} from "expo-camera";
import {cameraWithTensors} from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs";
import {View, StyleSheet, Platform, Text, Button} from "react-native";

const TensorCamera = cameraWithTensors(Camera);

const initialiseTensorflow = async () => {
    await tf.ready();
    tf.getBackend();
}

const textureDims = Platform.OS === 'ios' ?
    {
        height: 1920,
        width: 1080,
    } :
    {
        height: 1200,
        width: 1600,
    };

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        flex: 1,
    },
    camera: {
        flex: 10,
        width: '100%',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        margin: 64,
    },
    error: {
        margin: 64,
    }
});

export function TensorflowCameraComp(props) {
    const [permission, setPermission] = useState<boolean>(false);
    const [detections, setDetections] = useState<string[]>([]);
    const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
    const [model, setModel] = useState<mobilenet.MobileNet>(null);
    let frame = Number(0);
    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setPermission(status === "granted");
            await initialiseTensorflow();
            if (props.modelConfig == null)
                setModel(await mobilenet.load());
            else
                setModel(await mobilenet.load(props.modelConfig));
        })();
    }, []);
    const handleCameraStream = (images: IterableIterator<tf.Tensor3D>) => {
        const loop = async () => {
            if (model) {
                if (frame % props.renderPerFrame === 0) {
                    const nextImageTensor = images.next().value;
                    if (nextImageTensor) {
                        const objects = await model.classify(nextImageTensor);
                        if (objects && objects.length > 0) {
                            setDetections(objects.map(object => object.className));
                            props.handleDetections(objects.map(object => object.className));
                        }
                        tf.dispose([nextImageTensor]);
                    }
                }
                frame = frame + 1;
                frame = frame % props.renderPerFrame;
            }

            requestAnimationFrame(loop);
        }
        loop();
    }
    const changeType = () => {
        if (cameraType == CameraType.back) {
            setCameraType(CameraType.front);
        } else {
            setCameraType(CameraType.back);
        }
    }

    const footer = props.developerMode ?
        <View style={styles.buttonContainer}>
            <View style={styles.text}>
                {detections.map((detection, index) =>
                    <Text key={index}>{detection}</Text>
                )}
            </View>
        </View>
        :
        <>
        </>
    if (permission == false) {
        return (
            <View>
                <Text style={styles.error}>Please Give Permission</Text>
            </View>
        );
    } else if (model == null) {
        return (
            <View>
                <Text style={styles.error}>Model Is Not Loaded Yet</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <TensorCamera
                    style={styles.camera}
                    onReady={handleCameraStream}
                    type={cameraType}
                    cameraTextureHeight={textureDims.height}
                    cameraTextureWidth={textureDims.width}
                    resizeHeight={200}
                    resizeWidth={152}
                    resizeDepth={3}
                    autorender={true}
                    useCustomShadersToResize={false}
                />
                <Button onPress={() => changeType()} title={"Flip Camera"}></Button>
                {footer}
            </View>
        );
    }

}
