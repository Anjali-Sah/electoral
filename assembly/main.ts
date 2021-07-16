
import { Context, logging, storage, PersistentMap } from "near-sdk-as";

const DEFAULT_MESSAGE = "Hello"

let votes= new PersistentMap<string,u64>("v:");
let voters=new PersistentMap<string,string>("s:")




export function getGreeting(accountId: string): string | null {
  return storage.get<string>(accountId, DEFAULT_MESSAGE);
}

export function setGreeting(message: string): void {
  const account_id = Context.sender;

  
  logging.log(
    'Saving greeting "' + message + '" for account "' + account_id + '"'
  );

  storage.set(account_id, message);
}


export function hello():string{
return('heyDorian')

}


export function initializeCandidate(newCandidate:string):string{
  if(!votes.contains(newCandidate)){ 
    votes.set(newCandidate,0)
    return 'candidate set'
  }
  return 'candidate already in register'
}

export function initializeUser(User:string):void{
  if(!voters.contains(User)){
    voters.set(User,"didnotvote")
  }


  
} 

// Retreiving Number of votes for the specified Candidate
export function voteCount(name:string):u64{
  logging.log(name.toString()+" Vote Count");
  if(!votes.contains(name)){
    return 0
  }
  return votes.getSome(name);
}


export function sendVote(candidate:string,Voter:string):void{
  let tick:i32=1;
  logging.log(Voter)
  logging.log(voters.contains('Jeff').toString())
  if(!voters.contains(Voter)){
  let currentVotes=voteCount(candidate)
  logging.log('adding vote')
  votes.set(candidate,currentVotes+tick)
  voters.set(Voter,'did Vote')
  logging.log('Thank you for Voting!')
  logging.log("vote count at:"+voteCount(candidate).toString())
 
  }
  else{
    logging.log("you have already voted!")
  
  }
}

export function checkVote(voter:string):string{
  return (!voters.contains(voter))?'Did not vote':"voted"
}

