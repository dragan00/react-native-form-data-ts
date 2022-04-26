
import React, { useRef } from 'react'
import Video from 'react-native-video';

type LayoutType = "grid" | "list"

interface IProps {
    src: string,
    borderRadius: number,
    layout?: LayoutType
}

const VideoComponent: React.FC<IProps> = ({ src, borderRadius, layout = "grid" }) => {

    // Variables
    const videoRef = useRef(null);

    if(layout === 'grid'){
        return (
            <Video
                ref={videoRef}
                source={{ uri: src }}
                style={{ 
                    width: '100%', 
                    height: '100%',
                    borderTopLeftRadius: borderRadius - 1,
                    borderTopRightRadius: borderRadius - 1
                }}
                rate={1}
                onError={e => {
                    console.log(e);
                }}
                paused={false}
                muted={true}
                resizeMode={'cover'}
                repeat={true}
            />
        )
    }

    return(
        <Video
            ref={videoRef}
            source={{ uri: src }}
            style={{ 
                width: 54, 
                height: 54,
                borderRadius: borderRadius - 1
            }}
            rate={1}
            onError={e => {
                console.log(e);
            }}
            paused={false}
            muted={true}
            resizeMode={'cover'}
            repeat={true}
        />
    )

}

export default VideoComponent;