import { View, Text, TextInput, FlatList, SafeAreaView } from 'react-native';
import InfoProfile from '../components/infoProfile';
import Project from '../components/project';
import { useState } from 'react';

export default function Profile({ route }) {
  const [letterSearchProject, setLetterSearchProject] = useState('');
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
  console.log(usersData);

  const filteredProjects = projects.filter((project) =>
    project.project.name.includes(letterSearchProject)
  );
  const filteredSkills = skills.filter((skill) =>
    skill.name.includes(letterSearchSkill)
  );

  const renderHeader = () => (
    <View style={{ paddingLeft: 20, paddingTop: 50, paddingRight: 20 }}>
      <InfoProfile
        username={username}
        profilePhoto={profilePhoto}
        email={email}
        mobile={mobile}
        level={level}
        location={location}
        wallet={wallet}
      />
      <View style={{ alignItems: 'center', width: '100%' }}>
        <Text style={{ fontSize: 30, paddingBottom: 10 }}>Projects :</Text>
        <TextInput
          placeholder="Search for a project"
          style={{ borderColor: 'black', paddingTop: 5, paddingBottom: 20 }}
          onChangeText={(text) => setLetterSearchProject(text)}
        />
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={{ alignItems: 'center', paddingBottom: 50, paddingTop: 20 }}>
      <Text style={{ fontSize: 30 }}>Skills :</Text>
      <TextInput
        placeholder="Search for a skill"
        style={{ borderColor: 'black', paddingTop: 5, paddingBottom: 20 }}
        onChangeText={(text) => setLetterSearchSkill(text)}
      />
      {filteredSkills.map((skill) => (
        <View
          key={skill.name}
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16 }}>{skill.name}</Text>
          <Text style={{ fontWeight: 'bold' }}>{skill.level}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={filteredProjects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: project }) => {
          if (project.status === 'finished' && project.cursus_ids[0] === 21) {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 20,
                  paddingBottom: 10,
                }}
              >
                <Project
                  key={project.id}
                  projectName={project.project.name}
                  mark={project.final_mark}
                  validated={project['validated?']}
                  slug={project.project.slug}
                />
              </View>
            );
          }
          return null;
        }}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        nestedScrollEnabled={true}
      />
    </SafeAreaView>
  );
}
