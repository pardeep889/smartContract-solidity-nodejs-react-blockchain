pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign (uint256 minimum) public {
        address newCampaign = new Compaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
    
}


contract Compaign {
    
    //  members declarations
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public reqeusts;
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    uint256 public approversCount;
    
    // modifiers 
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    // constructors
    constructor(uint256 minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    // member functions
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint256 value, address recipient) public restricted {
      Request memory newRequest = Request({
         description: description,
         value: value,
         recipient: recipient,  
         complete: false,
         approvalCount: 0
       });
       reqeusts.push(newRequest);
    }
    
    function approveRequest(uint256 index) public {
        Request storage reqeust = reqeusts[index];
        require(approvers[msg.sender]);
        require(!reqeust.approvals[msg.sender]);
        
        reqeust.approvals[msg.sender] = true;
        reqeust.approvalCount++;
        
    }
    
    function finalizeRequest(uint256 index) public restricted{
        Request storage reqeust = reqeusts[index];
        require(reqeust.approvalCount > (approversCount / 2 ));
        require(!reqeust.complete);
        
        reqeust.recipient.transfer(reqeust.value);
        reqeust.complete = true;
    }
}