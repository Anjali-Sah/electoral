import 'regenerator-runtime/runtime';
import React,{useState}from 'react';
import { login, logout, onSubmit, hello } from './utils';
import './global.css';
import Candidate from './Container/Candidate/Candidate';
import Navbar from './Components/Navbar/Navbar';
import Leslie from './assets/aashna.png';
import Ron from './assets/anushka.png'

import getConfig from './config'
import { async } from 'regenerator-runtime';
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {

  const [sayhello,sethello]=useState('not yet')
  
  const [greeting, setGreeting] = React.useState()

  
  const [buttonDisabled, setButtonDisabled] = React.useState(true)

  
  const [showNotification, setShowNotification] = React.useState(false)

  const [didVote,setDidVote]=useState(false)

  const [signIn,setSignIn]=React.useState(false)

  
  React.useEffect(
    () => {
      
      if (window.walletConnection.isSignedIn()) {
        window.contract.getGreeting({ accountId: window.accountId })
          .then(greetingFromContract => {
            setGreeting(greetingFromContract)
          })
      }
    },
    []
  ) 
  const checkVoter=()=>{
    let voteStatus=false;
    window.contract.checkVote({voter:window.accountId})
    .then(res=>{
     setDidVote((res==="Did not vote")?false:true)
     console.log((res==="Did not vote")?false:true)
    
    })
   
  }

  checkVoter();
 
  const sendVoteToReg=(Name,Sender)=>{
    console.log(Name + Sender)
    window.contract.sendVote({candidate:Name,Voter:Sender})
  }


 const getVotes=(Person)=>{
  return window.contract.voteCount({name:Person})
 }



  return (
    <React.Fragment>
      <Navbar accName={window.accountId} signedIn={window.walletConnection.isSignedIn()}/>
      <div className="pollingBooth">
      <div className="Candidate">
        <Candidate 
        setCandidate={window.contract.initializeCandidate}
        voter={window.accountId} 
        checkVoter={didVote} 
        sendVote={sendVoteToReg} 
        signedIn={window.walletConnection.isSignedIn()} 
        Name="Leslie" Overview={<p>Ashana Anand</p>} 
        picture={Leslie}
        getTotal={getVotes}
        /></div>
      <div className="VotingTopic">{!didVote?'Which one is your favorite?':'Thanks for Voting!'}</div>
  <div className="Candidate">
        <Candidate 
      setCandidate={window.contract.initializeCandidate} 
      voter={window.accountId} checkVoter={didVote} 
      sendVote={sendVoteToReg} 
      signedIn={window.walletConnection.isSignedIn()} 
      Name="Ron" Overview={<p>Anushka Pandey</p>} 
      picture={Ron}
      getTotal={getVotes}
      />
  </div>
      </div>
    </React.Fragment>
  )
}


