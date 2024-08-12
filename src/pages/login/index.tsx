import React, { useEffect, useState } from 'react'
import Container from '@/components/base/container'
import { Box, Button, TextField } from '@mui/material'
import Image from '@/components/base/image'
import { useMutation } from '@tanstack/react-query'
import { IUserLoginFormValues } from './types'

const loginUser = async (formValues: IUserLoginFormValues) => {
  const response = await fetch('http://localhost:9000/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValues),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

function Page() {
  const initialFormValues: IUserLoginFormValues = {
    email: '',
    password: '',
  }

  const [formValues, setFormValues] = useState<IUserLoginFormValues>(initialFormValues)

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Login successful', data)
    },
    onError: (error) => {
      console.error('Login failed', error)
    },
  })

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    mutation.mutate(formValues)
  }

  const hanleChange = (key: keyof IUserLoginFormValues, value: any) => {
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    console.log('formValues', formValues)
  }, [formValues])

  return (
    <div className="user-login-singup">
      <Container size="medium">
        <div className="user-login-singup-in">
          <div className="header">
            <div className="logo">
              <Image
                src="/images/site/bygamelist-logo.png"
                alt="ByGameList Logo"
                priority
              />
            </div>
            <h1 className="title">Kullanıcı Girişi</h1>
          </div>
          <Box component="form" onSubmit={onSubmit} className="user-login-form">
            <TextField
              type="email"
              className="form-item"
              label="E-Mail"
              variant="filled"
              value={formValues.email}
              onChange={(e) => hanleChange('email', e.target.value)}
            />
            <TextField
              type="password"
              className="form-item"
              label="Şifre"
              variant="filled"
              value={formValues.password}
              onChange={(e) => hanleChange('password', e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              className="submit-button"
            >
              Giriş Yap
            </Button>
          </Box>
        </div>
      </Container>
    </div>
  )
}

export default Page
