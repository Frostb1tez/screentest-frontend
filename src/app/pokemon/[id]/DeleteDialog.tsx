'use client'
import { Pokemon } from '@/@types/pokemon'
import axios from '@/utils/axios'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { useRouter } from 'next/navigation'

type DeleteDialogProps = {
  open: boolean
  handleClose: () => void
  pokemon: Pokemon
}

const DeleteDialog = ({ open, handleClose, pokemon }: DeleteDialogProps) => {
  const { push } = useRouter()
  const handleDelete = async () => {
    try {
      await axios.delete(`/pokemon/${pokemon.id}`)
      alert('Delete success')
      push('/pokemon')
    } catch (error: any) {
      alert(error.message)
    }
  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Are you sure to delete {pokemon.name} ? </DialogTitle>
      {/* <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no
          apps are running.
        </DialogContentText>
      </DialogContent> */}
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
