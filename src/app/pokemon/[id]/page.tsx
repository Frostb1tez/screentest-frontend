import { Pokemon } from '@/@types/pokemon'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ActionFooter from './ActionFooter'

type PokemonDetailPageProps = {
  params: {
    id: string
  }
}

async function getPokemon(id: string): Promise<Pokemon> {
  const res = await fetch(`http://localhost:8000/pokemon/${id}`, { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
export default async function PokemonDetailPage({ params }: Readonly<PokemonDetailPageProps>) {
  const pokemon = await getPokemon(params.id)
  return (
    <Container>
      <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Card sx={{ width: '80%' }}>
          <CardHeader title="Pokemon Detail" />
          <CardMedia sx={{ height: 400 }} image={pokemon.imageUrl} title={pokemon.name} />
          <CardContent>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <Stack spacing={2}>
                <Typography variant="h5">ID: {pokemon.id}</Typography>
                <Typography variant="h5">Name: {pokemon.name}</Typography>
                <Typography variant="h5">Weight: {pokemon.weight}</Typography>
                <Typography variant="h5">Height: {pokemon.height}</Typography>
              </Stack>
            </Box>
          </CardContent>
          <ActionFooter pokemon={pokemon} />
        </Card>
      </Box>
    </Container>
  )
}
