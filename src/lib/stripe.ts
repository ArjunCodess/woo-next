import Stripe from 'stripe'
import { STRIPE_API_VERSION } from './constants'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: STRIPE_API_VERSION,
})