
import React from 'react'
import { Image, View } from 'react-native'


type LayoutType = "grid" | "list"

interface IProps {
    src: string,
    borderRadius: number,
    layout?: LayoutType
}

const ImageComponent: React.FC<IProps> = ({ src, borderRadius, layout = "grid" }) => {
    if(layout === 'grid'){
        return (
            <Image 
                source={{ uri: src }} 
                style={{ 
                    width: '100%', 
                    height: '100%',
                    borderTopLeftRadius: borderRadius - 1,
                    borderTopRightRadius: borderRadius - 1
                }}
            />
        )
    }

    return(
        <Image 
            source={{ uri: src }} 
            style={{ 
                width: 54, 
                height: 54,
                borderRadius: borderRadius - 1
            }}
        />
    )
}

export default ImageComponent;