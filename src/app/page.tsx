import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Container from '@mui/material/Container'
import EmailSenderForm from './components/form/email-sender'

export default function Home() {
  return (
    <Container>
      <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Card sx={{ borderRadius: 2, width: '50%' }}>
          <CardHeader title="New Email" />
          <CardContent>
            <EmailSenderForm />
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
