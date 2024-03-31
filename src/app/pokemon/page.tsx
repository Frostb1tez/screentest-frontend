import { Pokemon } from '@/@types/pokemon'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Image from 'next/image'
import Link from 'next/link'
import CreateDialog from './CreateDialog'

export interface PokemonPageProps {}
async function getPokemons(): Promise<Pokemon[]> {
  const res = await fetch('http://localhost:8000/pokemon', { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function PokemonPage() {
  const pokemons = await getPokemons()
  return (
    <Container>
      <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Card sx={{ width: '80%' }}>
          <CardHeader title="Pokemon List" />
          <CardContent>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <CreateDialog></CreateDialog>
              <nav>
                <List>
                  {pokemons.map((pokemon) => (
                    <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Image src={pokemon.imageUrl} alt={pokemon.name} width={40} height={40} />
                          </ListItemIcon>
                          <ListItemText
                            primary={`ID: ${pokemon.id} ${pokemon.name}`}
                            secondary={`height ${pokemon.height}cm | weight: ${pokemon.weight}g`}
                          />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </nav>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
