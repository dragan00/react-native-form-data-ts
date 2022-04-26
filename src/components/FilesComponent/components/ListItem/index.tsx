import React, { useState } from 'react'
import Dialog from "react-native-dialog";
import { Image, Pressable, Text, View } from "react-native";
import { Dimensions } from 'react-native';

// Components
import ImageComponent from '../Image'
import VideoComponent from '../Video'
import DocumentComponent from '../Document';
import InvalidComponent from '../Invalid';

type Size = 'small' | 'large'

interface IProps {
    name: string,
    mediaType: string,
    index: number,
    id: number,
    title: string,
    itemsInRow: number,
    hideActions?: boolean,
    hideDelete?: boolean,
    hideEdit?: boolean,
    onDelete: (id: number) => void,
    onEdit: (id: number) => void
    openFileViewer: (v: number) => void,
}

const ListItem: React.FC<IProps> = ({ name, title, id, hideActions, hideEdit, hideDelete, onEdit, onDelete, mediaType, itemsInRow, index, openFileViewer }) => {

    // Constants
    const { width, height } = Dimensions.get('window');
    const _type = mediaType as keyof typeof cover;
    const size: Size = itemsInRow === 3 ? 'small' : 'large'
    const pickerHidden = hideActions || (hideDelete && hideEdit)
    const [visible, setVisible] = useState<boolean>(false);
    const [editVisible, setEditVisible] = useState<boolean>(false);

    // Sizes
    const sizes = {
        meta:{
            small: 14,
            large: 20,
        },
        text: {
            small: pickerHidden ? '80%' : '55%',
            large: pickerHidden ? '85%' : '65%'
        },
        borderRadius:{
            small: 4,
            large: 6
        },
        cover:{
            small: 122,
            large: 202,
        },
        document:{
            small: 200,
            large: 300,
        }
    }

    // Content
    const cover = {
        image: <ImageComponent src={name} borderRadius={sizes.borderRadius[size]} layout="list" />,
        video: <VideoComponent src={name} borderRadius={sizes.borderRadius[size]} layout="list" />,
        document: <DocumentComponent src={name} borderRadius={sizes.borderRadius[size]} layout="list" />,
        invalid: <InvalidComponent borderRadius={sizes.borderRadius[size]} layout="list" />
    }



    const metaIcon = {
        image: <Image source={require('../../../../../assets/icons/image.png')} style={{ width: sizes.meta[size], height: sizes.meta[size] }} />,
        video: <Image source={require('../../../../../assets/icons/video.png')} style={{ width: sizes.meta[size], height: sizes.meta[size] }} />,
        document: <Image source={require('../../../../../assets/icons/document.png')} style={{ width: sizes.meta[size], height: sizes.meta[size] }} />,
        invalid: <Image source={require('../../../../../assets/icons/invalid.png')} style={{ width: sizes.meta[size], height: sizes.meta[size] }} />,
    }

    // Methods
    const showDialog = () => {
        setVisible(true);
    };
    
    const handleEdit = () => {
        if(editVisible){
            onEdit(id)
            setVisible(false)
            setEditVisible(false)
        }
        else{
            setEditVisible(true)
        }
    };

    const handleDelete = () => {
        if(editVisible){
            setVisible(false)
            setEditVisible(false)
        }
        else{
            onDelete(id)
            setVisible(false);
        }
    };

    const handleCancel = () => {
        setVisible(false)
    };

    return(
        <View 
            style={{ 
                overflow: 'hidden',
                padding: 8,
                width,
                height: 80,
                position: 'relative',
                marginBottom: 0,
            }}
        >
            <View
                style={{ 
                    width: '100%',
                    height: '100%',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: "#dadada",
                    borderRadius: sizes.borderRadius[size],
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 4
                }}
            >
                <View
                    style={{ 
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    {/* Rendering file */}
                    <Pressable onPress={() => openFileViewer(index)}>
                        { cover[_type] }
                    </Pressable>
                    <View
                        style={{ 
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 4,
                            paddingLeft: 6,
                        }}
                    >
                        <Text 
                            numberOfLines={1} 
                            style={{ fontFamily: 'Poppins-Medium', fontSize: 12, paddingTop: 2, marginLeft: 4, width: sizes.text[size] }}
                        >
                            { title }
                        </Text>
                        { metaIcon[_type] }
                        {
                        !pickerHidden && <View style={{ marginRight: 64, marginLeft: 12 }}>
                            <Pressable hitSlop={20} onPress={showDialog}>
                                <Image style={{ width: 16, height: 16 }} source={require('../../../../../assets/icons/more.png')} />
                            </Pressable>
                            <Dialog.Container visible={visible}>
                                <Dialog.Title style={{ fontFamily: 'Poppins-Medium' }}>{ title }</Dialog.Title>
                                <Dialog.Description style={{ fontFamily: 'Poppins-Light', fontSize: 14  }} >
                                    Želite li urediti ili izbrisati ovu datoteku?
                                </Dialog.Description>
                                { editVisible && 
                                    <Dialog.Input
                                        style={{ fontFamily: 'Poppins-Medium' }}
                                        placeholder="Uredite ime datoteke..."
                                    /> 
                                }
                                { !hideEdit && 
                                    <Dialog.Button 
                                        style={{ fontFamily: 'Poppins-Medium', color: '#4675FF'  }} 
                                        label={editVisible ? 'Potvrdi' : 'Uredi'} 
                                        onPress={handleEdit} 
                                    /> 
                                }
                                { !hideDelete && 
                                    <Dialog.Button 
                                        style={{ fontFamily: 'Poppins-Medium', color: editVisible ? '#777' : '#4675FF'  }} 
                                        label={editVisible ? 'Odustani' : 'Izbriši'} 
                                        onPress={handleDelete}
                                    /> 
                                }
                                {
                                    !editVisible &&
                                        <Dialog.Button 
                                            style={{ fontFamily: 'Poppins-Medium', color: '#777'  }} 
                                            label='Odustani' 
                                            onPress={handleCancel} 
                                        />
                                }
                            </Dialog.Container>
                        </View>
                    }
                    </View>
                </View>                
            </View>
        </View>
    )
}

export default ListItem;