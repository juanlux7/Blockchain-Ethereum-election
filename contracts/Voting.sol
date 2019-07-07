pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Voting {
    
  address public manager;        

  // struct of type candidate. Of couse we can add more feautures but I think this is fine
  struct Candidate {
    uint id;
    string name;
    string party;
    string photo;
    string description;
  }
  
  // it's better to work with mappings instead of arrays. With mappings we have constant time complexity
  // no matter how many voters and votes per candidate are. Think of these like hash tables, where we
  // only need to perform a look up and these mappings don't loop the entire mapping.

  mapping(address => bool) public voters;
  mapping(uint => uint) public voteCandidate;
  
  Candidate[] public candidates;
  uint public totalVotes;
  uint public blankVotes;
 
 
 
  uint public candidatesCount;
  
  // this modifier was intentionally created to restrict the access to certain methods like add candidate
  // so only the manager of the contract can add more candidades and not any people
  modifier restricted () {
      require(msg.sender == manager);
      _;
  }


  constructor() public {

    candidatesCount = 0;
    totalVotes = 0;
    blankVotes = 0;
    manager = msg.sender;
    
    // adding all the candidates available (5 persons and 1 vote blank option)
    // for images it would be a better option to store them in our own server but I just want to test this
    // the electoral programme will be loaded from another resource rather than include it here in the constructor.
    addCandidate("Pedro Sánchez", "PSOE", "https://estaticos.elperiodico.com/resources/jpg/0/0/pedro-sanchez-reclama-gente-que-acuda-las-urnas-28-a-1554202172600.jpg",
    "Partido Socialista Obrero Español (PSOE) seeks to change the economic structure of the actual government by applying a global tax reduction. In terms of migration policies, PSOE wants to guarantee the full integration of any legal migrant...");
    addCandidate("Albert Rivera", "Ciudadanos", "https://lacronicadelpajarito.com/wp-content/uploads/2019/07/albert-rivera1.jpg", "this is a description");
    addCandidate("Pablo Casado", "Partido Popular", "https://look.okdiario.com/img/2018/07/29/pablo-casado-destacada-655x368.jpg", "this is a description");
    addCandidate("Pablo Iglesias", "Unidas Podemos", "https://www.merca2.es/wp-content/uploads/2019/05/pp.jpg", "this is a description");
    addCandidate("Santiago Abascal", "VOX", "https://static1.abc.es/media/espana/2019/01/08/abascal-vox-U30861160104cAH--620x349@abc.jpg", "this is a description");
    addCandidate("Voto en blanco", " ", "https://fotos00.laopiniondemurcia.es/mmp/2019/03/11/690x278/voto-blanco.jpg", "this is a description");
  }
  
  // This method returns the array of candidades, this array is small so there is no problem with this approach
  function getCandidates() public view returns (Candidate[] memory) {
        
        return candidates;
        
    }

  function addCandidate(string memory _name, string memory _party, string memory _photo, string memory _description) public payable restricted {
      
    candidatesCount++;
      
    Candidate memory newCandidate = Candidate({
        id: candidatesCount,
        name: _name,
        party: _party,
        photo: _photo,
        description: _description
    }); 
    
      
    candidates.push(newCandidate);
  }
  
  // the vote function
  function vote(uint _candidateId) public {
      
      // this checks if a person has already voted
      require(!voters[msg.sender]);
      
      // this checks if the option is valid (it has to be greater than 0 and less or equal to 6)
      require(_candidateId > 0 && _candidateId <= candidatesCount);
      
      // this stores the voter with its address in the mapping
      voters[msg.sender] = true;
      
      // increments the total number of votes
      totalVotes++;
      
      if(_candidateId == 6) {
          blankVotes++;
      } else {
      
      voteCandidate[_candidateId] += 1;
      
      }
  }
 
}