import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import * as admin from 'firebase-admin/auth'

const credentials = process.env.FIREBASE_SERVICE_ACCOUNT_KEY

if(!credentials)
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is missing')

const buffer = Buffer.from(credentials, 'base64')

export const app = initializeApp({
    credential: cert(JSON.parse(buffer.toString('ascii'))),
});


export const firestore = getFirestore()
export const auth = admin.getAuth()