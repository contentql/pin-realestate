import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  render,
} from '@react-email/components'
import * as React from 'react'
interface UserContactEmailProps {
  userName: 'string'
  email: 'string'
  subject: 'string'
  message: 'string'
}

export const ContactEmail = ({
  userName,
  email,
  subject,
  message,
}: UserContactEmailProps) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/images/apple-touch-icon-114x114.png`
  return (
    <Html>
      <Head />
      <Preview>Yelp recent login</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img src={imageUrl} />
          </Section>

          <Section style={content}>
            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Name: </b>
                  {userName}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Email: </b>
                  {email}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Subject: </b>
                  {subject}
                </Text>
                <Text style={paragraph}>{message}</Text>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img style={image} width={620} src={imageUrl} />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
export const newContactForm = (props: UserContactEmailProps) =>
  render(<ContactEmail {...props} />, { pretty: true })

const main = {
  backgroundColor: '#0f0232',
  color: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const paragraph = {
  fontSize: 16,
}

const logo = {
  padding: '30px 20px',
}

const containerButton = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
}

const image = {
  maxWidth: '100%',
}

const boxInfos = {
  padding: '20px',
}

const containerImageFooter = {
  padding: '45px 0 0 0',
}
