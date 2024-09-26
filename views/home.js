import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, ImageBackground, Text, Button, ScrollView} from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function Home({navigation}) {
	const [username, setUsername] = useState('');
	const [notFound, setNotFound] = useState(false);
	const getTokenFromApi = async () => {
		try {
			const client_id = process.env.EXPO_PUBLIC_CLIENT_ID;
			const secret = process.env.EXPO_PUBLIC_SECRET;
			let token = null;
			const response = await fetch('https://api.intra.42.fr/oauth/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					grant_type: 'client_credentials',
					client_id: client_id,
					client_secret: secret,
				})
			})
			const json = await response.json();
			if (json.access_token)
			{
				token = json.access_token;
				saveTokenToKeychain(token);
			}
			return token;
		}
	  catch (error) {
		console.log('Erreur lors de la récupération du token : ', error);
		return null;
	  }
	}
	const getTokenFromKeychain = async () => {
		try {
		  const credentials = await SecureStore.getItemAsync("apiToken");
		  if (credentials) {
			const token = credentials.token;
			return token;
		  } else {
			return null;
		  }
		} catch (error) {
		  return null;
		}
	};
	const saveTokenToKeychain = async (token, createdAt, expireIn) => {
		try {
		  await SecureStore.setItemAsync('apiToken', JSON.stringify({ token : token, createdAt : createdAt, expireIn : expireIn }));
		  console.log('Token sauvegardé avec succès.');
		} catch (error) {
		  console.log('Erreur lors de la sauvegarde du token : ', error);
		}
	  };
	const checkTokenExpiration = async () => {
		try {
			const credentials = await SecureStore.getItemAsync("apiToken");
			if (credentials) {
				const token = credentials.token;
				const createdAt = credentials.createdAt;
				const expireIn = credentials.expireIn;
				const now = new Date();
				const diff = now - createdAt;
				if (diff > expireIn)
					await getTokenFromApi();
			}
		} catch (error) {
			console.log('Erreur lors de la vérification du token : ', error);
		}
	}
	const getUsers = async (username) => {
		try {
			let token = await getTokenFromKeychain();
			if (token == null)
				token =  await getTokenFromApi();
			if (!token)
				return ;
			checkTokenExpiration();
			console.log("Used token : ", token);
			const userInfo = await fetch("https://api.intra.42.fr/v2/users/" + username , {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + token
			}
			})
			let json = await userInfo.json();
			if (json.error || Object.keys(json).length == 0)
				return null;
			return json;
		}
		catch (error) {
			console.log(error);
		}
	}
	const handleSearch = async () => {
		if (username === '') {
			return;
		}
		const data = await getUsers(username);
		if (data)
		{
			navigation.navigate('Profile', { username: username, usersData: data });
			setNotFound(false);
		}
		else
			setNotFound(true);
		setUsername('');
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../assets/42image.png")} style={styles.imageBackground} resizeMode="cover">
				<View style={styles.textContainer}>
					<Text style={styles.title}>
						Switfty Companion
					</Text>
				</View>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', bottom : 50}}>
					<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								placeholder="Enter a username"
								textAlign="center"
								value={username}
								onChangeText={(text) => setUsername(text)}
							/>
					</View>
					{notFound && (
            <Text style={{fontSize: 16, color: "#e9383f", paddingTop : 15}}>Utilisateur non trouvé. Veuillez réessayer.</Text>
          )}
					<View style={styles.buttonContainer}>
						<Button title="Search" onPress={handleSearch}/>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
	flex: 1,
	width: '100%',
	height: '100%',
	},
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 50,
	width: 300,
	alignItems: 'center',
	justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
  },
  buttonContainer: {
	marginTop: 20,
	width: 100,
	borderRadius: 10,
	backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  textContainer: {
    paddingTop: 50,
	alignItems: 'center',
  },
  title: {
	fontSize: 32,
    color: 'white',
	fontWeight: 'bold',
	padding: 20,
  },
  searchContainer : {
	  flex: 1,
	  alignItems: 'center',
	  justifyContent: 'center',
	  width: '100%',
	  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});
