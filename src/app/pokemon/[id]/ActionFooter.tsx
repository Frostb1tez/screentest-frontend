'use client'
import { Pokemon } from '@/@types/pokemon'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import { useState } from 'react'
import DeleteDialog from './DeleteDialog'
import EditDialog from './EditDialog'

type ActionFooterProps = {
  pokemon: Pokemon
}

const ActionFooter = ({ pokemon }: ActionFooterProps) => {
  const [dialogDelete, setDialogDelete] = useState(false)
  const [dialogEdit, setDialogEdit] = useState(false)
  const handleDeleteButton = async () => {
    setDialogDelete(true)
  }
  const handleEditButton = async () => {
    setDialogEdit(true)
  }
  const handleCloseDeleteDialog = () => {
    setDialogDelete(false)
  }
  const handleCloseEditDialog = () => {
    setDialogEdit(false)
  }
  return (
    <CardActions>
      <Button variant="contained" color="error" sx={{ ml: 'auto' }} onClick={handleDeleteButton}>
        Delete
      </Button>
      <Button variant="contained" onClick={handleEditButton}>
        Edit
      </Button>
      <DeleteDialog open={dialogDelete} handleClose={handleCloseDeleteDialog} pokemon={pokemon} />
      <EditDialog open={dialogEdit} handleClose={handleCloseEditDialog} pokemon={pokemon} />
    </CardActions>
  )
}

export default ActionFooter
