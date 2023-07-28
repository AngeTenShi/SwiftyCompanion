import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function infoProfile({username, profilePhoto, email, mobile, level, location, wallet, skills, projects}) {
	{/*get user info
	const user = fetch("etc...")
	*/ }
	navigation = useNavigation();
	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<View style={styles.rowContainer}>
					<TouchableOpacity style={{width: 50, height: 50,  alignSelf :'flex-start', left : 0, position : 'absolute'}} onPress={() => navigation.goBack()}>
						<Image source={require("../assets/42_Logo.png")} style={styles.backButton} />
					</TouchableOpacity>
					<Image source={{uri : profilePhoto}} style={styles.profilePicture} />
				</View>
				<View style={{alignItems : 'center', paddingTop: 15}}>
					<Text style={styles.infoText}>{username}</Text>
					<Text style={styles.infoText}>{email}</Text>
					<Text style={styles.infoText}>{ mobile != "hidden" ? mobile : "Phone Number is hidden"}</Text>
					<View style = {{flexDirection : 'row', justifyContent : 'space-around', width : "95%", flexWrap: "wrap"}}>
						<Text style={styles.infoText}>Level: 10.78</Text>
						<Text style={styles.infoText}>Location: Nice</Text>
						<Text style={styles.infoText}>Wallet: 1000</Text>
					</View>
				</View>
			</View>
		{ /*<Text style={styles.skillsHeader}>Skills:</Text>
			<FlatList
				data={user.skills}
				renderItem={renderSkillItem}
				keyExtractor={(item) => item.id.toString()}
			/>

			<Text style={styles.projectsHeader}>Projects:</Text>
			<FlatList
				data={user.projects}
				renderItem={renderProjectItem}
				keyExtractor={(item) => item.id.toString()}
			/> */ }
		</View>
	);
}

const styles = StyleSheet.create({
  profilePicture: {
    width: 150,
    height: 100,
    borderRadius: 50,
	marginVertical: 20,
 },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
},
  projectsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  projectItem: {
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
 },
  backButton : {
	width: "100%",
	height: "100%",
	resizeMode : 'contain',
	},
  rowContainer: {
	flexDirection: 'row',
	width: "100%",
	justifyContent : 'center',
	borderBottomColor : 'grey',
	borderBottomWidth : 2,
}
});
