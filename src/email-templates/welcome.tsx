import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  render,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface WelcomeEmailProps {
  verificationLink?: string
}

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

export default function WelcomeEmail({ verificationLink }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>AWS Email Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/apple-touch-icon-114x114.png`}
                width='75'
                height='45'
                alt='Realestate'
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={mainText}>
                We are delighted to welcome you to Homez Real Estate, where we
                turn dreams into addresses and houses into homes. Your decision
                to embark on this exciting real estate journey with us is truly
                appreciated, and we are here to make the experience seamless and
                enjoyable.
              </Text>
              <Section style={verificationSection}>
                <Link style={codeText} href={verificationLink}>
                  Verify account
                </Link>
                <Text style={validityText}>
                  (This code is valid for 10 minutes)
                </Text>
              </Section>
            </Section>
            <Hr />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const PrimaryActionWelcomeEmailHtml = (props: WelcomeEmailProps) =>
  render(<WelcomeEmail {...props} />, { pretty: true })

const main = {
  backgroundColor: '#fff',
  color: '#212121',
}

const container = {
  padding: '20px',
  margin: '0 auto',
  backgroundColor: '#eee',
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '15px',
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
}

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
}

const imageSection = {
  backgroundColor: '#252f3d',
  display: 'flex',
  padding: '20px 0',
  alignItems: 'center',
  justifyContent: 'center',
}

const coverSection = { backgroundColor: '#fff' }

const upperSection = { padding: '25px 35px' }

const lowerSection = { padding: '25px 35px' }

const footerText = {
  ...text,
  fontSize: '12px',
  padding: '0 20px',
}

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: 'bold',
  textAlign: 'center' as const,
}

const codeText = {
  ...text,
  fontWeight: 'bold',
  fontSize: '36px',
  margin: '10px 0',
  textAlign: 'center' as const,
}

const validityText = {
  ...text,
  margin: '0px',
  textAlign: 'center' as const,
}

const verificationSection = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const mainText = { ...text, marginBottom: '14px' }

const cautionText = { ...text, margin: '0px' }
