import React, { useState } from 'react'

// Components
import Card from './components/Card'
import ListItem from './components/ListItem'
// import FileViewer from './components/FileViewer'
import { Alert, GestureResponderEvent, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackProps } from '../../navigation';

type TImageExtensions = "jpg" | "png";
type TVideoExtensions = "mp4";
type TDocumentExtensions = "pdf";

type MediaType = "image" | "video" | "document" | "invalid" | string
type MediaExtension = TImageExtensions | TVideoExtensions | TDocumentExtensions | string

type LayoutType = "grid" | "list"
type ItemsInRow = 2 | 3

export interface MediaFile {
    id: number,
    file: string,
    name: string,
    type: MediaType,
    extension: MediaExtension
}

export interface IFileComponent {
    name: string,
    file: string,
    extension: string,
    id: number,
}

interface IProps {
    files: IFileComponent[],
    layout?: LayoutType,
    itemsInRow: ItemsInRow,
    hideActions?: boolean,
    hideDelete?: boolean,
    hideEdit?: boolean,
    onDelete: (id: number) => void,
    onEdit: (id: number) => void,
    navigation: NativeStackNavigationProp<RootStackProps, "FilesModal">;
}

const FilesComponent: React.FC<IProps> = ({ files, navigation, onDelete, onEdit, hideActions = false, hideDelete = false, hideEdit = false, itemsInRow = 2, layout = "grid" }) => {

    // Variables
    const [layoutType] = useState<LayoutType>(layout)
    const media_files: MediaFile[] = []

    const generateMediaFile = (item: IFileComponent): MediaFile => {

        let type: MediaType = ""

        if(item.extension === "jpg" || item.extension === "png")
            type = "image"
        else if(item.extension === "mp4")
            type = "video"
        else if(item.extension === "pdf")
            type = "document"
        else
            type = "invalid"

        return{
            id: item.id,
            file: item.file,
            name: item.name,
            type,
            extension: item.extension,
        }
    }

    files.map(item => {
        media_files.push(generateMediaFile(item))
    })

    const onOpenFileViewer = (index: number) => {
        navigation.navigate('FilesModal', { files: media_files, index })
    }

    return(
        <View 
            style={{
                display:'flex', 
                flexDirection: 'row', 
                flexWrap: 'wrap', 
                justifyContent: 'space-between',
                position: 'relative',
                width: '100%' 
            }}
        >
            {
                layoutType === 'grid' ?
                    media_files.map((item, index) => (
                        <Card
                            id={item.id}
                            key={index}
                            index={index}
                            name={item.file}
                            mediaType={item.type}
                            title={item.name}
                            openFileViewer={onOpenFileViewer}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            itemsInRow={itemsInRow}
                            hideActions={hideActions}
                            hideDelete={hideDelete}
                            hideEdit={hideEdit}
                        />
                    ))
                    :
                    <SafeAreaView>
                        <FlatList
                            data={media_files}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <ListItem
                                    id={item.id}
                                    key={index}
                                    index={index}
                                    name={item.file}
                                    mediaType={item.type}
                                    title={item.name}
                                    openFileViewer={onOpenFileViewer}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    itemsInRow={2}
                                    hideActions={hideActions}
                                    hideDelete={hideDelete}
                                    hideEdit={hideEdit}
                                />
                            )}
                        />
                    </SafeAreaView>
            }

            {/* File Viewer */}
            {/* { fileViewer } */}
        </View>
    )
}

export default FilesComponent;