import React, { useEffect, useState, useRef } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { StatusBar, Text, View, Dimensions, Image, ActivityIndicator, StyleSheet, Pressable } from "react-native";
import { RootStackProps } from "../../navigation";
import { MediaFile } from "../../components/FilesComponent";
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import Carousel from "react-native-snap-carousel";
import Pdf from "react-native-pdf";

// Components
import VideoPlayer from './components/VideoPlayer'
import ImageZoom from "react-native-image-pan-zoom";
import Video from "react-native-video";

type IProps = NativeStackScreenProps<RootStackProps, "FilesModal">

type IOrientation = 'landscape' | 'portrait'

interface IRenderItem {
    item: MediaFile,
    index: number
}

const FilesModal: React.FC<IProps> = ({ route, navigation }) => {

    // Refs
    const videoRef = useRef(null);
    const ref: any = useRef(null);

    // Variables
    const [loading, set_loading] = useState<boolean>(false)
    const [currentIndex, set_currentIndex] = useState<number>(route.params?.index)
    const [width, set_width] = useState<number>(Dimensions.get('screen').width)
    const [height, set_height] = useState<number>(Dimensions.get('screen').height)
    const [orientation, set_orientation] = useState<IOrientation>('portrait')
    const currentFile = route.params?.files[currentIndex]!

    // Constants
    const _type = currentFile.type as keyof typeof metaIcon;
    let data: MediaFile[] = route.params?.files!

    useEffect(() => {
        ref.current.snapToItem(route.params.index, { animated: true, fireCallback: true })
    }, [])
  
    useEffect(() => {
        Orientation.addOrientationListener(handleOrientation);
        Orientation.lockToPortrait()
        return () => {
          Orientation.removeOrientationListener(handleOrientation);
          Orientation.unlockAllOrientations()
        };
    }, []);

    useEffect(() => {
        if(currentFile.type === 'image' || currentFile.type === 'document') Orientation.unlockAllOrientations()
        return () =>  Orientation.lockToPortrait()
    }, [currentFile]);
    
    function handleOrientation(orientation: string) {
        orientation === OrientationType["LANDSCAPE-LEFT"] || orientation === OrientationType["LANDSCAPE-RIGHT"]
          ? (set_orientation('landscape'), set_width(Dimensions.get('screen').width), set_height(Dimensions.get('screen').height))
          : (set_orientation('portrait'), set_width(Dimensions.get('screen').width), set_height(Dimensions.get('screen').height))
      }

    // Content
    const metaIcon = {
        image: <Image source={require('../../../assets/icons/image.png')} style={styles.icon} />,
        video: <Image source={require('../../../assets/icons/video.png')} style={styles.icon} />,
        document: <Image source={require('../../../assets/icons/document.png')} style={styles.icon} />,
        invalid: <Image source={require('../../../assets/icons/invalid.png')} style={styles.icon} />,
    }

    const Item = ({item, index}: IRenderItem) => {
        return (
            <View
                style={{ 
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {
                    item.type === 'image' ?
                    <ImageZoom 
                        cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={width}
                        imageHeight={height * .8}
                    >
                        <Image
                            style={{ width: '100%', height: '80%', resizeMode: 'contain', flex: 1 }}
                            source={{ uri: item.file }}
                        />
                    </ImageZoom>
                     :
                    item.type === 'video' ?
                    <View style={styles.videoWrapper}>
                        <Video
                            ref={videoRef}
                            source={{ uri: item.file }}
                            style={{ 
                                width: '100%', 
                                height: '100%'
                            }}
                            rate={1}
                            onError={e => {
                                console.log(e);
                            }}
                            paused={false}
                            muted={true}
                            resizeMode={'contain'}
                            repeat={true}
                        />
                        <Pressable
                            onPress={() => navigation.navigate('VideoPlayer', { source: item.file })}
                            style={styles.itemCTAWrapper}
                        >
                            <Image
                                style={{ width: 28, height: 28 }}
                                source={require('../../../assets/icons/play.png')}
                            />
                            <Text style={styles.itemCTA}>Reproducirajte videozapis</Text>
                        </Pressable>
                    </View> :
                    item.type === 'document' ?
                    <View style={styles.videoWrapper}>
                        <Pdf
                            source={{ uri: item.file }}
                            style={{ 
                                width, 
                                height: height * .8,
                            }}
                        />
                        <Pressable
                            onPress={() => navigation.navigate('PDFViewer', { source: item.file })}
                            style={styles.itemCTAWrapper}
                        >
                            <Image
                                style={{ width: 24, height: 24 }}
                                source={require('../../../assets/icons/document-cta.png')}
                            />
                            <Text style={styles.itemCTA}>Otvorite dokument</Text>
                        </Pressable>
                    </View>
                    :
                    <Image
                        style={{ width: '80%', height: '80%', resizeMode: 'contain', flex: 1 }}
                        source={require('../../../assets/icons/invalid_banner.png')}
                    />
                }
            </View>
        );
    }

    return (
        <>
            <StatusBar hidden backgroundColor="#FFFFFF" barStyle="dark-content"/>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: orientation === 'landscape' ? "#00000000" : "#00000080" }]}>
                <View style={styles.headerFlex}>
                    {/* Icon */}
                    { metaIcon[_type] }
                    <Text style={styles.fileName}>{ currentFile.name }</Text>
                </View>
                { orientation !== 'landscape' && <Text style={styles.count}>{ `${currentIndex + 1} / ${data.length}` }</Text> }
            </View>
            {/* Video player */}
            <View style={[styles.container]}>
                {/* Carousel */}
                <Carousel
                    ref={ref}
                    data={data}
                    renderItem={Item}
                    sliderWidth={width}
                    itemWidth={width}
                    sliderHeight={height}
                    itemHeight={height}
                    onScroll={() => set_currentIndex(ref.current.currentIndex)}
                />

                {/* Controls */}
                { orientation !== 'landscape' && 
                    <View style={styles.controls}>
                        <Pressable 
                            style={{ opacity: currentIndex === 0 ? .25 : 1 }}
                            disabled={currentIndex === 0}
                            hitSlop={40} 
                            onPress={() => ref.current.snapToPrev({ animated: true, fireCallback: true })}
                        >
                            <Image source={require('../../../assets/icons/previous.png')} style={styles.controlIcon} />
                        </Pressable>

                        <Pressable
                            style={{ opacity: currentIndex === data.length - 1 ? .25 : 1 }}
                            disabled={currentIndex === data.length - 1}
                            hitSlop={40} 
                            onPress={() => ref.current.snapToNext({ animated: true, fireCallback: true })}
                        >
                            <Image source={require('../../../assets/icons/next.png')} style={styles.controlIcon} />
                        </Pressable>
                    </View>
                }

                {/* Loading */}
                <View 
                    style={{
                        width: '12%',
                        height: '100%',
                        position: 'absolute',
                        top: 0, left: '44%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    { loading && <ActivityIndicator size="large" /> }
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000",
    },
    header:{
        width: Dimensions.get('screen').width,
        paddingHorizontal: 20,
        height: 64,
        zIndex: 100,
        position: 'absolute',
        top: 0,
        backgroundColor: "#00000080",
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    headerFlex:{
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    icon:{
        width: 20,
        height: 20
    },
    controlIcon:{
        width: 28,
        height: 28
    },
    fileName:{
        color: '#fff',
        fontFamily: "Poppins-SemiBold",
        paddingTop: 2,
        marginLeft: 10
    },
    count:{
        color: '#fff',
        fontFamily: "Poppins-SemiBold",
        paddingTop: 2
    },
    controls: {
        position: 'absolute', 
        width: Dimensions.get('screen').width, 
        height: 80,
        paddingHorizontal: 20,
        bottom: 0, 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: "#00000080",
        zIndex: 100,
        justifyContent: 'space-between'
    },
    videoWrapper:{
        width: '100%',
        height: '80%',
        alignItems: 'center'
    },
    itemCTA:{
        color: '#fff', 
        padding: 12, 
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        paddingTop: 15
    },
    itemCTAWrapper:{
        position: 'absolute',
        bottom: 40,
        minWidth: Dimensions.get('screen').width * .70,
        paddingHorizontal: 24,
        borderColor: "#ffffff77",
        borderWidth: 1,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000000aa"
    }
});

export default FilesModal;
