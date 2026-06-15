import React, { useEffect, useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Typography, IconButton, TextField, MenuItem, Grid, Button,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CloseIcon from '@mui/icons-material/Close'
import { PROGRAMS } from '../data/programs'
import { useApplyModal } from '../context/ApplyModalContext'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:4000'
  
const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  club: '',
  battingHand: '',
  bowlingHand: '',
  bowlingType: '',
  message: '',
}

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.05)',

    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.15)',
    },

    '&:hover fieldset': {
      borderColor: '#f5c842',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#f5c842',
    },
  },

  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.7)',
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: '#f5c842',
  },

  '& .MuiInputBase-input': {
    color: '#fff',
  },

  '& .MuiSelect-select': {
    color: '#fff',
  },

  '& .MuiSvgIcon-root': {
    color: '#f5c842',
  },
}

export default function ApplyModal() {
  const { open, selectedIndex, closeApplyModal } = useApplyModal()
  const [programIndex, setProgramIndex] = useState(selectedIndex)
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Sync the selected program whenever the modal is opened
  useEffect(() => {
    if (open) {
      setProgramIndex(selectedIndex)
    }
  }, [open, selectedIndex])

  const program = PROGRAMS[programIndex]

  const handleClose = () => {
    closeApplyModal()
    setSubmitted(false)
    setError(null)
    setForm(EMPTY_FORM)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleProgramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgramIndex(Number(e.target.value))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, program: program.label }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Could not reach the server. Please email us at info@tandhcricket.com.au')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#021a4a',
            backgroundImage:
              'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
            color: '#fff',
            border: '1px solid rgba(245,200,66,0.15)',
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          },
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box>
          <Typography variant="h6" sx={{ fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.04em', fontSize: '1.4rem', color: '#f5c842' }}>
            Apply — {program.label}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)' }}>
            Hoppers Crossing Cricket Store · {program.dates}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small" sx={{ color: 'rgba(255,255,255,0.5)' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          color: '#fff',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        {submitted ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontFamily: '"Bebas Neue", sans-serif', color: '#f5c842', mb: 1 }}>
              Application received!
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Thanks! We'll be in touch within 24 hours.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth select label="Program" name="program" value={programIndex} onChange={handleProgramChange} size="small" sx={inputSx}
                slotProps={{ select: { MenuProps: { slotProps: { paper: { sx: { bgcolor: '#021a4a', color: '#fff' } } } } } }}
              >
                {PROGRAMS.map((p, i) => (
                  <MenuItem key={p.label} value={i}>{p.label}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Full name" name="name" value={form.name} onChange={handleChange} required size="small" sx={inputSx} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} required size="small" sx={inputSx} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange} size="small" sx={inputSx} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Club" name="club" value={form.club} onChange={handleChange} placeholder="e.g. Werribee CC" size="small" sx={inputSx} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth select label="Batting hand" name="battingHand" value={form.battingHand} onChange={handleChange} size="small" sx={inputSx}
                slotProps={{ select: { MenuProps: { slotProps: { paper: { sx: { bgcolor: '#021a4a', color: '#fff' } } } } } }}
              >
                <MenuItem value="Right">Right handed</MenuItem>
                <MenuItem value="Left">Left handed</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth select label="Bowling hand" name="bowlingHand" value={form.bowlingHand} onChange={handleChange} size="small" sx={inputSx}
                slotProps={{ select: { MenuProps: { slotProps: { paper: { sx: { bgcolor: '#021a4a', color: '#fff' } } } } } }}
              >
                <MenuItem value="Right">Right handed</MenuItem>
                <MenuItem value="Left">Left handed</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth select label="Bowling type" name="bowlingType" value={form.bowlingType} onChange={handleChange} size="small" sx={inputSx}
                slotProps={{ select: { MenuProps: { slotProps: { paper: { sx: { bgcolor: '#021a4a', color: '#fff' } } } } } }}
              >
                <MenuItem value="Fast">Fast bowler</MenuItem>
                <MenuItem value="Spinner">Spinner</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth multiline rows={3} label="Anything else? (optional)" name="message" value={form.message} onChange={handleChange} size="small" sx={inputSx} />
            </Grid>
            {error && (
              <Grid size={{ xs: 12 }}>
                <Typography color="error" variant="caption">{error}</Typography>
              </Grid>
            )}
          </Grid>
        )}
      </DialogContent>

      {!submitted && (
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            bgcolor: 'rgba(0,0,0,0.15)',
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              color: 'rgba(255,255,255,0.75)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !form.name || !form.email}
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: '#f5c842',
              color: '#021a4a',
              fontWeight: 700,
              '&:hover': {
                bgcolor: '#e0b030',
              },
              '&.Mui-disabled': {
                bgcolor: 'rgba(245,200,66,0.3)',
                color: 'rgba(2,26,74,0.5)',
              },
            }}
          >
            {loading ? 'Sending...' : 'Submit'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}
