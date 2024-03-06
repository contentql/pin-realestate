import AboutView from '@/views/AboutView'

export const metadata = {
  title: 'About',
}

const About = async () => {
  //const { user } = await getMeUser();
  // console.log('user: ' + user);

  return <AboutView />
}

export default About
