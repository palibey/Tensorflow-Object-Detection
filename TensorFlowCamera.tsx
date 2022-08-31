import {cameraWithTensors} from "@tensorflow/tfjs-react-native";
import {Camera, CameraType} from "expo-camera";
import * as tf from "@tensorflow/tfjs";
import React from "react";
import {MobileNet, ModelConfig} from "@tensorflow-models/mobilenet";
import {Button, StyleSheet, View, Text, Platform, TouchableOpacity} from "react-native";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { ExpoWebGLRenderingContext } from "expo-gl";


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
});

type MyProps = { modelConfig: ModelConfig, renderPerFrame: number, developerMode: boolean };
type MyState = { detections: string[], permission: boolean, cameraType: CameraType, model: mobilenet.MobileNet };

export class TensorFlowCamera extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            detections: [],
            permission: false,
            cameraType: CameraType.back,
            model: null,
        };
    }
    componentDidMount() {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            this.setState({
                permission: status === 'granted',
            });
            await initialiseTensorflow();
            if (this.props.modelConfig == null)
                this.setState({
                    model: await mobilenet.load(),
                })
            else
                this.setState({
                    model: await mobilenet.load(this.props.modelConfig),
                })
        })();
    }

    changeType() {
        if (this.state.cameraType == CameraType.back) {
            this.setState({
                cameraType: CameraType.front,
            })
        } else {
            this.setState({
                cameraType: CameraType.back,
            })
        }
    }


    render() {
        const detected = this.state.detections;
        let frame = 1;
        const handleCameraStream = (images: IterableIterator<tf.Tensor3D>) => {
            const loop = async () => {
                if(this.state.model) {
                    if(frame % this.props.renderPerFrame === 0){
                        const nextImageTensor = images.next().value;
                        if(nextImageTensor){
                            const objects = await this.state.model.classify(nextImageTensor);
                            if(objects && objects.length > 0){
                                this.setState({
                                    detections: objects.map(object => object.className)
                                });
                            }
                            tf.dispose([nextImageTensor]);
                        }
                    }
                    frame += 1;
                    frame = frame % this.props.renderPerFrame;
                }

                requestAnimationFrame(loop);
            }
            loop();
        }
        const footer = this.props.developerMode ?
            <View style={styles.buttonContainer}>
                <View style={styles.text}>
                    {detected.map((detection, index) =>
                        <Text key={index}>{detection}</Text>
                    )}
                </View>
            </View>
            :
            <>
            </>


        return (
            <View style={styles.container}>
                <TensorCamera
                    style={styles.camera}
                    onReady={handleCameraStream}
                    type={this.state.cameraType}
                    cameraTextureHeight={textureDims.height}
                    cameraTextureWidth={textureDims.width}
                    resizeHeight={200}
                    resizeWidth={152}
                    resizeDepth={3}
                    autorender={true}
                    useCustomShadersToResize={false}
                />
                <Button onPress={() => this.changeType()} title={"Flip Camera"}></Button>
                {footer}
            </View>
        );
    }
}
