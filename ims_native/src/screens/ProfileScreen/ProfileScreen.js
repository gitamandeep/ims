
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View, Modal } from "react-native"
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Container from "../../components/Container";
import { Avatar, Card, Switch, Text } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Grid } from "../../components/GlobalStyle"
import { useEffect, useState, useContext } from "react";
import { Context as UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/authContext";
import Spinner from "../../components/Spinner";

const getIcon = (iconName, iconLibrary) => {
    if (iconLibrary === "MaterialIcons") {
        return <MaterialIcons name={iconName} size={20} color="#64696E" />
    } else if (iconLibrary === "FontAwesome") {
        return <FontAwesome name={iconName} size={20} color="#64696E" />
    }
    else if (iconLibrary === "FontAwesome5") {
        return <FontAwesome5 name={iconName} size={20} color="#64696E" />
    }

}

const CardItem = ({ icon, fieldName, fieldValue }) => {
    return (
        <View style={[styles.cardItem, Grid.row]}>
            <View style={[styles.itemLeft, Grid.row]}>
                {icon}
                <Text variant="bodySmall">{fieldName}</Text>
            </View>
            <Text variant="bodySmall" numberOfLines={1} style={[styles.itemRight, styles.textColor, Grid['1col']]}>{fieldValue}</Text>
        </View>
    )
}

function capitalizeFirstLetter(sentence) {
    const words = sentence.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const capitalizedSentence = capitalizedWords.join(' ');
    return capitalizedSentence;
}

function avatarLabel(name) {
    return name.split(" ").map((word) => word.charAt(0)).join("");
}

const ProfileScreen = () => {
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const navigation = useNavigation();
    const { state, fetchUser } = useContext(UserContext)
    const { handleLogout } = useContext(AuthContext);
    const [profile, setProfile] = useState({
        name: "",
        username: "",
        email: "",
        phoneNumber: "",
        address: "",
        role: ""
    });

    const updateState = (newData) => {
        setProfile((prevState) => ({ ...prevState, ...newData }));
    };

    const fetchProfile = (godownHeadId) => {
        fetchUser(godownHeadId)
            .then(response => {
                updateState({
                    godownHeadId: response.godownHeadId,
                    name: response.godownHeadName,
                    username: response.username,
                    email: response.email,
                    phoneNumber: response.godownheadNo,
                    role: response.role,
                    address: response.address
                });
            })
            .catch(error => {
                // console.log(error);
            })
            .finally(() => setLoading(false));;
    }

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const isFocused = useIsFocused();

    useEffect(() => {
        fetchProfile();
    }, [isFocused]);

    return (
        <>
        {
            loading ? <Spinner animating={loading} size={"large"} color={"#0BA5A4"} /> : (
                <ScrollView showsVerticalScrollIndicator={false} style={styles.profileContainer} >
                    <Container>
                        <View style={[Grid.row, styles.themeSwitch]}>
                            {getIcon(isSwitchOn? "dark-mode": "sunny", "MaterialIcons")}
                            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                        </View>
                        <View style={styles.avatarView}>
                            <Avatar.Text style={styles.avatar} size={100} label={avatarLabel(capitalizeFirstLetter(profile.name))} />
                            <Text variant="titleLarge">{capitalizeFirstLetter(profile.name)}</Text>
                            <Text variant="bodyMedium"  >{capitalizeFirstLetter(profile.role)}</Text>
                        </View>
                        <View style={Grid["2col"]}>
                            <View style={styles.cardContainer}>
                                    <Text variant="titleSmall" style={styles.textColor}>Personal Information</Text>
                                    <Card style={styles.card}>
                                        <Card.Content>
                                            <CardItem
                                                icon={getIcon("alternate-email", "MaterialIcons")}
                                                fieldName="Username"
                                                fieldValue={profile.username ? profile.username : "Not Available"}
                                            />
                                            <CardItem
                                                icon={getIcon("email", "MaterialIcons")}
                                                fieldName="Email"
                                                fieldValue={profile.email ? profile.email : "Not Available"}
                                            />
                                            <CardItem
                                                icon={getIcon("phone", "MaterialIcons")}
                                                fieldName="Phone Number"
                                                fieldValue={profile.phoneNumber ? profile.phoneNumber : "Not Available"}
                                            />
                                            <CardItem
                                                icon={getIcon("location-on", "MaterialIcons")}
                                                fieldName="Address"
                                                fieldValue={profile.address ? profile.address : "Not Available"}
                                            />
                                        </Card.Content>
                                    </Card>
                                </View>
                                <View style={styles.cardContainer}>
                                    <Text variant="titleSmall" style={styles.textColor}>Settings</Text>
                                    <Card style={styles.card}>
                                        <Card.Content>
                                            <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                                                <CardItem
                                                    icon={getIcon("edit", "MaterialIcons")}
                                                    fieldName="Edit Profile"
                                                    fieldValue={getIcon("chevron-right", "MaterialIcons")}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")} >
                                                <CardItem
                                                    icon={getIcon("password", "MaterialIcons")}
                                                    fieldName="Change Password"
                                                    fieldValue={getIcon("chevron-right", "MaterialIcons")}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={openModal}>
                                                <CardItem
                                                    icon={getIcon("logout", "MaterialIcons")}
                                                    fieldName="Sign Out"
                                                    fieldValue={getIcon("chevron-right", "MaterialIcons")}
                                                />
                                            </TouchableOpacity>
                                            <Modal
                                                visible={modalVisible}
                                                animationType="slide"
                                                transparent={true}
                                                onRequestClose={closeModal}
                                            >
                                                <View style={styles.modalContainer}>
                                                    {/* <View style={styles.modalContent}>
                                                        <Text style={styles.modalText}>Are you sure you want to Sign Out?</Text>
                                                        <TouchableOpacity onPress={handleLogout} style={styles.modalButton}>
                                                            <Text style={styles.buttonText}>Sign Out</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                                                            <Text style={styles.buttonText1}>Cancel</Text>
                                                        </TouchableOpacity>
                                                    </View> */}

                                                    <View style={styles.modalContent}>
                                                        <Text style={styles.modalText}>Are you sure you want to Sign Out?</Text>
                                                        <View style={styles.modalButtonsContainer}>
                                                            <TouchableOpacity onPress={handleLogout} style={styles.modalButton}>
                                                                <Text style={styles.buttonText}>Sign Out</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                                                                <Text style={styles.buttonText}>Cancel</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>

                                                </View>
                                            </Modal>


                                        </Card.Content>
                                    </Card>
                                </View>
                            </View>
                        </Container>
                    </ScrollView>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        marginTop: Dimensions.get("window").height * 0.04,
        backgroundColor: "#fff",
    },
    themeSwitch: {
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center",
        gap: Dimensions.get("window").height * 0.01,
    },
    card: {
        backgroundColor: "#fff",
    },
    avatarView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: Dimensions.get("window").height * 0.02,
    },
    avatar: {
        marginBottom: Dimensions.get("window").height * 0.02,
        backgroundColor: "#0BA5A4",

    },
    cardContainer: {
        gap: Dimensions.get("window").height * 0.01,
        marginBottom: Dimensions.get("window").height * 0.02,

    },

    cardItem: {
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: Dimensions.get("window").height * 0.01,
        gap: Dimensions.get("window").width * 0.1,
    },
    itemLeft: {
        gap: Dimensions.get("window").width * 0.02,
        alignItems: "center",
    },
    itemRight: {
        textAlign: "right",
    },
    textColor: {
        color: "#64696E"
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      modalText: {
        fontSize: 17,
        marginBottom: 10,
        // fontWeight: 'bold',
      },
      modalButtonsContainer: {
        flexDirection: 'row', // Arrange buttons horizontally
        justifyContent: 'center', // Center buttons horizontally
        marginTop: 10, // Adjust the space between text and buttons
      },
      modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 10, // Adjust the button width
        marginHorizontal: 10, // Adjust the space between buttons
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007AFF',
      },
      buttonText: {
        fontSize: 14,
        paddingHorizontal: 5,
        color: 'white',
        // fontWeight: 'bold',
      },

});

export default ProfileScreen;