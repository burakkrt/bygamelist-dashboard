import React, { useEffect, useState } from 'react'
import Container from '@/components/base/container'
import { Box, Button, TextField } from '@mui/material'
import Image from '@/components/base/image'
import useUserLogin from '@/hooks/useUserLogin'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { IUserLoginFormValues } from './types'

function Page() {
  const initialFormValues: IUserLoginFormValues = {
    email: '',
    password: '',
  }
  const [formValues, setFormValues] = useState<IUserLoginFormValues>(initialFormValues)
  const mutation = useUserLogin()
  const router = useRouter()

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    mutation.mutate(formValues)
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('Giriş işlemi başarılı.')
      const redirectTo = router.query.redirect || '/'
      router.push(redirectTo as string)
    }

    if (mutation.isError) {
      toast.error(`Giriş işlemi başarısız.`)
    }
  }, [mutation.isSuccess, mutation.isError, router])

  const hanleChange = (key: keyof IUserLoginFormValues, value: any) => {
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

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
          <Box
            component="form"
            onSubmit={onSubmit}
            className="user-login-form"
            autoComplete="on"
          >
            <TextField
              type="email"
              className="form-item"
              label="E-Mail"
              variant="filled"
              required
              value={formValues.email}
              onChange={(e) => hanleChange('email', e.target.value)}
            />
            <TextField
              type="password"
              className="form-item"
              label="Şifre"
              variant="filled"
              required
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
