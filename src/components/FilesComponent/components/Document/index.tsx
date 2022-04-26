
import React from 'react'
import { Image, View } from 'react-native'
import Pdf from 'react-native-pdf'


type LayoutType = "grid" | "list"

interface IProps {
    src: string,
    borderRadius: number,
    layout?: LayoutType
}

const DocumentComponent: React.FC<IProps> = ({ src, borderRadius, layout = "grid" }) => {
    if(layout === 'grid'){
        return (
            <View
                style={{ 
                    width: '100%', 
                    height: '100%',
                    borderTopLeftRadius: borderRadius - 1,
                    borderTopRightRadius: borderRadius - 1,
                    position: 'relative'
                }}
            >
                <Pdf
                    source={{ uri: src }}
                    style={{ 
                        width: '100%', 
                        height: '100%',
                    }}
                />
                {/* Overlay */}
                <View 
                    style={{ 
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                    }}
                />
            </View>
        )
    }

    return(
        <View
                style={{ 
                    width: 54, 
                    height: 54,
                    borderRadius: borderRadius - 1,
                    position: 'relative'
                }}
            >
                <Pdf
                    source={{ uri: src }}
                    style={{ 
                        width: '100%', 
                        height: '100%',
                    }}
                />
                {/* Overlay */}
                <View 
                    style={{ 
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                    }}
                />
            </View>
    )
}
export default DocumentComponent;