'use client'
import { Pokemon } from '@/@types/pokemon'
import EditPokemonForm from '@/components/form/edit-pokemon'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useRouter } from 'next/navigation'

type EditDialogProps = {
  open: boolean
  handleClose: () => void
  pokemon: Pokemon
}

const EditDialog = ({ open, handleClose, pokemon }: EditDialogProps) => {
  const { push } = useRouter()

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Are you sure to delete {pokemon.name} ? </DialogTitle>
      <DialogContent>
        <EditPokemonForm pokemon={pokemon} />
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button variant="contained" onClick={handleClose} color="inherit" fullWidth>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditDialog
