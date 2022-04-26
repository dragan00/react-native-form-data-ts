import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Text, StatusBar, Linking, Image, Pressable } from 'react-native';
 
import Pdf from 'react-native-pdf';
import { RootStackProps } from '../../../../navigation';

type IProps = NativeStackScreenProps<RootStackProps, "PDFViewer">

// Constants
const { width, height } = Dimensions.get("window")

const PDFViewer: React.FC<IProps> = ({ route, navigation }) => {
    

    // Variables
    const [ numberOfPages, setNumberOfPages ] = useState<number>(1)
    const [ currentPage, setCurrentPage ] = useState<number>(1)
    const [ ifError, setIfError ] = useState<boolean>(false)

    // Methods
    function onLoadComplete(numberOfPages: number) {
        setNumberOfPages(numberOfPages)
    }

    function onPageChange(page: number) {
        setCurrentPage(page)
    }

    function onError(error: any) {
        console.log(error)
        setIfError(true)
    }

    function onPressLink(uri: string) {
        Linking.openURL(uri);
    }

    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <>
            {/* Hiding Status Bar */}
            <StatusBar hidden />
            {/* Displaying error message if error exists */}
            {
                ifError &&
                    <Text style={styles.errorText}>Došlo je do pogreške.</Text>
            }
            <View style={styles.container}>
                {/* PDF component */}
                <Pdf
                    source={{ uri: route.params?.source, cache: true }}
                    onLoadComplete={onLoadComplete}
                    onPageChanged={onPageChange}
                    onError={onError}
                    onPressLink={onPressLink}
                    style={styles.pdf}/>

                {/* Go back button */}
                <Pressable onPress={handleGoBack} style={styles.goBackView}>
                    <Image style={styles.goBackImage} source={require('../../../../../assets/icons/previous.png')}/>
                </Pressable>

                {/* Pagination view */}
                <View style={styles.paginationView}>
                    <Text style={styles.paginationText}>{ `${currentPage} / ${numberOfPages}` }</Text>
                </View>
            </View>
        </>
    )
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    errorText:{
        position: "absolute",
        top: height * .5,
        zIndex: 99,
        width: width,
        paddingHorizontal: 20,
        fontFamily: "Poppins-SemiBold",
        textAlign: "center"
    },
    pdf: {
        flex:1,
        width: width,
        height: height,
    },
    goBackView:{
        position: "absolute",
        top: 12,
        left: 12,
        backgroundColor: "#000000bb",
        borderRadius: 50,
        padding: 6
    },
    goBackImage:{
        width: 26,
        height: 26
    },
    paginationView:{
        position: "absolute",
        borderRadius: 100,
        height: 40,
        width: 40,
        backgroundColor: "#4675ff",
        alignItems: "center",
        justifyContent: "center",
        bottom: 20,
        right: 20
    },
    paginationText:{
        fontFamily: "Poppins-Medium",
        color: "#fff",
        fontSize: 9,
        paddingTop: 2,
    }
});
 
export default PDFViewer;