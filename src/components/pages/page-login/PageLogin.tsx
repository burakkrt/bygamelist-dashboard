import React, { useEffect, useState } from 'react'
import Container from '@/components/base/container'
import { Box, TextField } from '@mui/material'
import Image from '@/components/base/image'
import useUserLogin from '@/hooks/useUserLogin'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Button from '@/components/base/button'

import { IPageLoginProps, IUserLoginFormValues } from './types'

function PageLogin({}: IPageLoginProps) {
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
      const errorMessage = mutation.error.message
      toast.error(`${errorMessage}`)
    }
  }, [mutation.error, mutation.isSuccess, mutation.isError, router])

  const handleChange = (key: keyof IUserLoginFormValues, value: any) => {
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
          <Box component="form" onSubmit={onSubmit} className="user-login-form">
            <TextField
              type="email"
              className="form-item"
              label="E-Mail"
              variant="filled"
              required
              autoComplete="email"
              value={formValues.email}
              onChange={(e) => handleChange('email', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="password"
              className="form-item"
              label="Şifre"
              variant="filled"
              autoComplete="current-password"
              required
              value={formValues.password}
              onChange={(e) => handleChange('password', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              className="submit-button"
              isLoading={mutation.isPending || mutation.isSuccess}
            >
              Giriş Yap
            </Button>
          </Box>
        </div>
      </Container>
    </div>
  )
}

export default PageLogin
