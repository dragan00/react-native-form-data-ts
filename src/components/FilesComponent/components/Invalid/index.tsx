
import React from 'react'
import { Image, Text, View } from 'react-native'
import Pdf from 'react-native-pdf'


type LayoutType = "grid" | "list"

interface IProps {
    borderRadius: number,
    layout?: LayoutType
}

const InvalidComponent: React.FC<IProps> = ({ borderRadius, layout = "grid" }) => {
    if(layout === 'grid'){
        return (
            <View
                style={{ 
                    width: '100%', 
                    height: '100%',
                    borderTopLeftRadius: borderRadius - 1,
                    borderTopRightRadius: borderRadius - 1,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{ textAlign: 'center' }}>Invalid file format</Text>
            </View>
        )
    }

    return(
        <View
            style={{ 
                width: 54, 
                height: 54,
                borderRadius: borderRadius - 1,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text style={{ textAlign: 'center', fontSize: 8 }}>Invalid file format</Text>
        </View>
    )
}

export default InvalidComponent;