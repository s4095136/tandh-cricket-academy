import { Request, Response } from 'express'

export function getStatus(_req: Request, res: Response) {
  res.json({ status: 'ok', uptime: process.uptime() })
}
