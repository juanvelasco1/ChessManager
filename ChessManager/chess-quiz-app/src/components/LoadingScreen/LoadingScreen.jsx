import React, { useEffect } from "react";
import { View, ActivityIndicator, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoadingScreen = ({ loading, duration = 3000 }) => {
    const navigation = useNavigation();

    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => {
                navigation.navigate("Login");
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [loading, navigation, duration]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Image
                    source={require("https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/994864e6d407751510742627ffb6c58aa3d305d5/LOGO%20AZUL.svg")} // Ruta de tu logo
                    style={styles.logo}
                />
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 150, // Ajusta el tamaño del logo
        height: 150,
        marginBottom: 20,
    },
});

export default LoadingScreen;