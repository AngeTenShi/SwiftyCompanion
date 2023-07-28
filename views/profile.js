import { View, Text, ScrollView, TextInput, FlatList, SafeAreaView } from 'react-native';
import InfoProfile from '../components/infoProfile';
import Project from '../components/project';
import { useState } from 'react';

export default function Profile({ route }) {
  // Accessing user information from the route prop
  // profilePhoto, email, mobile, level, location, wallet, skills, projects
  const [letterSearchProject, setLetterSearch] = useState('');
  const [letterSearchSkill, setLetterSearchSkill] = useState('');
  const { username, usersData } = route.params;
  const email = usersData.email;
  const profilePhoto = usersData.image.link;
  const mobile = usersData.phone;
  const level = usersData.cursus_users[1].level;
  const location = usersData.campus[0].city;
  const wallet = usersData.wallet;
  const skills = usersData.cursus_users[1].skills;
  const projects = usersData.projects_users;
  const filteredProjects = projects.filter((project) =>
    project.project.name.includes(letterSearchProject)
  );
  const filteredSkills = skills.filter((skill) =>
    skill.name.includes(letterSearchSkill)
	  );

	  return (
		<SafeAreaView style={{ flex: 1}}>
		<ScrollView style={{ flex: 1, paddingLeft: 20, paddingTop: 50, paddingRight: 20}}>
		  <InfoProfile
			username={username}
			profilePhoto={profilePhoto}
			email={email}
			mobile={mobile}
			level={level}
			location={location}
			wallet={wallet}
			skills={skills}
			projects={projects}
		  />

		  <View style={{ alignItems: 'center', width: '100%' }}>
			<Text style={{ fontSize: 30, paddingBottom: 10 }}>Projects :</Text>
			<TextInput
			  placeholder="Search for a project"
			  style={{ borderColor: 'black', paddingTop: 5, paddingBottom: 20 }}
			  onChangeText={(text) => setLetterSearch(text)}
			/>
			<View style={{ flex: 1, width: "100%", height: 300}}>
				<FlatList
				data={filteredProjects}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item: project }) => {
					if (project.status === 'finished' && project.cursus_ids[0] === 21)
					return (
						<View style={{flex: 1, flexDirection: "row", width: '100%', paddingHorizontal: 20, paddingBottom: 10}}>
						<Project
							key={project.id}
							projectName={project.project.name}
							mark={project.final_mark}
							validated={project['validated?']}
							slug={project.project.slug}
							/>
						</View>
					);
					return null; // Skip rendering if conditions are not met
				}}
				/>
			</View>
			<Text style={{ fontSize: 30, paddingTop: 20 }}>Skills :</Text>
			<TextInput
			  placeholder="Search for a skill"
			  style={{ borderColor: 'black', paddingTop: 5, paddingBottom: 20 }}
			  onChangeText={(text) => setLetterSearchSkill(text)}
			/>
			<ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 50 }} style={{ width: '100%'}}>
			  {filteredSkills.map((skill) => {
				return (
				  <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between" , width: '100%', paddingHorizontal: 20, paddingBottom: 10}}>
					<Text style={{fontSize: 16}}>{skill.name}</Text>
					<Text style={{fontWeight: "bold"}}>{skill.level}</Text>
				  </View>
				)
			  })}
			</ScrollView>
		  </View>
		</ScrollView>
		</SafeAreaView>
	  );
}
