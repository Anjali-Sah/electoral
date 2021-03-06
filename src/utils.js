import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'
import { async } from 'regenerator-runtime'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')


export async function initContract() {
  
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  
  window.walletConnection = new WalletConnection(near)

  
  window.accountId = window.walletConnection.getAccountId()

  
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
   
    viewMethods: ['getGreeting','hello','voteCount','checkVote'],
    
    changeMethods: ['setGreeting','init','initializeCandidate','initializeUser','sendVote'],
   
  })
}


export async function onSubmit(event) {
  event.preventDefault()

  
  const { fieldset, greeting } = event.target.elements

  
  fieldset.disabled = true

  try {
    
    await contract.setGreeting({
     
      message: greeting.value
    })
  } catch (e) {
    alert(
      'Something went wrong! ' +
      'Maybe you need to sign out and back in? ' +
      'Check your browser console for more info.'
    )
    throw e
  } finally {
    
    fieldset.disabled = false
  }
}

export function logout() {
  window.walletConnection.signOut()
 
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

export async function hello(){
 await window.contract.hello()
}
