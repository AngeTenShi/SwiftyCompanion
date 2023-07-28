import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';

export default function Project({ projectName, mark, validated, slug}) {
  const handleProjectClick = () => {
    const projectUrl = `https://projects.intra.42.fr/${slug}/mine`;
	Linking.openURL(projectUrl);
  };

	return (
	<View style={styles.container}>
		<View style={[styles.textContainer, { left: 20, position: 'absolute' }]}>
			<TouchableOpacity onPress={handleProjectClick}>
				<Text style={[styles.text, { color: '#65abd6', textDecorationLine: 'underline' }]}>{projectName}</Text>
			</TouchableOpacity>
		</View>
		<View style={[styles.textContainer, { right: 20, position: 'absolute' }]}>
		{validated ? (
		<Text style={[styles.text, { color: '#5cb85c' }]}>{mark}</Text>
		) : (
		<Text style={[styles.text, { color: 'red' }]}>{mark}</Text>
		)}
		</View>
	</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '70%',
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: '#fff',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
  },
});
