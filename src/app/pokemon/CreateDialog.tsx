'use client'
import CreatePokemonForm from '@/components/form/create-pokemon'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'

const CreateDialog = () => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Please input pokemon infomation</DialogTitle>
        <DialogContent>
          <CreatePokemonForm handleClose={handleClose} />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button variant="contained" onClick={handleClose} color="inherit" fullWidth>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateDialog
