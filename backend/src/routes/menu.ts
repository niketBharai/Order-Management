import { Router } from 'express'
import { menuItems } from '../data/menu'

const router = Router()

router.get('/', (req, res) => {
  res.json(menuItems)
})

export default router
