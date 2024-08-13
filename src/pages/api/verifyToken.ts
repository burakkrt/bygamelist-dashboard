import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.userToken

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string)
    return res.status(200).json({ message: 'Token is valid', decodedToken })
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
