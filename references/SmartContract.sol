// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract SmartContract {
    
    // identifier for various sequential project states
    // 1. INITIALIZED:  smart contract object created - nothing added yet
    // 2. CREATED:      smart contract details created by freelancer
    // 3. ACCEPTED:     project accepted by client
    // 4. FUNDED:       fundings added by client
    // 5. IN_PROGRESS:  project started by freelancer
    // 6. IN_REVIEW:    project finished and in review by client
    // 7. COMPLETED:    project confirmed by client and funds are released to freelancer
    // 8. CLOSED:       project is closed - cannot be modified further
    enum ProjectState {INITIALIZED, CREATED, FUNDED, ACCEPTED, IN_PROGRESS, IN_REVIEW, COMPLETED, PAID, CLOSED}
    string private name_freelancer;
    string private name_client;
    string private date_startProject;
    string private date_endProject;
    string private promises;
    string private signiture_freelancer;
    string private signiture_client;
    uint256 private paymentAmount;
    address payable public freelancerID;
    address public clientID;
    ProjectState public projectState;
    
    event projectCreated();
    event projectFunded();
    event projectAccepted();
    event projectIn_Progress();
    event projectIn_Review();
    event projectCompleted();
    event progressStatus(string status);
    event paymentReleased(uint256 _paymentAmount);
    event projectClosed();
    event contractModified(string message);

    modifier currProjectState(ProjectState _projectstate) {
        require(projectState == _projectstate);
        _;
    }

    modifier freelancerOnly() {
        require(msg.sender == freelancerID);
        _;
    }

    modifier clientOnly() {
        require(msg.sender == clientID);
        _;
    }

    modifier freelancerOrClientOnly() {
        require(msg.sender == freelancerID || msg.sender == clientID);
        _;
    }

    modifier ampleFunding(uint256 _payment) {
        require(paymentAmount == _payment);
        _;
    }
    

    // initialize project - ***can only be created by client <- this specification must be enforced in either FE or BE
    constructor() {
        clientID = msg.sender;
        projectState = ProjectState.INITIALIZED;
    }

    function modifyContract(address _freelancerID, string memory _name_freelancer, string memory _name_client, string memory _date_endProject, string memory _promises, uint256 _paymentAmount, string memory message) public currProjectState(ProjectState.INITIALIZED) freelancerOrClientOnly {
        freelancerID = payable(_freelancerID);

        name_freelancer = _name_freelancer;
        name_client = _name_client;
        date_endProject = _date_endProject;
        promises = _promises;
        paymentAmount = _paymentAmount;

        emit contractModified(message);
    }

    function acceptContract() public currProjectState(ProjectState.INITIALIZED) freelancerOrClientOnly {
        projectState = ProjectState.ACCEPTED;
        emit projectCreated();
    }

    function fundContract() public payable currProjectState(ProjectState.FUNDED) ampleFunding(msg.value) clientOnly {
        emit projectFunded();
    }

    function startProject() public currProjectState(ProjectState.ACCEPTED) freelancerOnly {
        projectState = ProjectState.IN_PROGRESS;
        emit projectIn_Progress();
    }

    function requestProjectReview() public currProjectState(ProjectState.IN_PROGRESS) freelancerOnly {
        projectState = ProjectState.IN_REVIEW;        
        emit projectIn_Review();
    }

    // review accepted
    function acceptReview() public currProjectState(ProjectState.IN_REVIEW) clientOnly {
        projectState = ProjectState.COMPLETED;
        emit projectCompleted();
    }

    // review rejected
    function rejectReview() public currProjectState(ProjectState.IN_REVIEW) clientOnly {
        projectState = ProjectState.IN_PROGRESS;
        emit projectIn_Progress();
    }

    function releasePayment() public payable currProjectState(ProjectState.COMPLETED) freelancerOnly{
        freelancerID.transfer(paymentAmount);
        projectState = ProjectState.PAID;
        emit paymentReleased(paymentAmount);  
    }
    
    function closeProject() public currProjectState(ProjectState.PAID) freelancerOrClientOnly {
        projectState = ProjectState.CLOSED;
        emit projectClosed();
    }

    // how the freelancer can update (give notes on) their current project status
    // this info should be visible and be pulled by the client 
    function updateProgress(string memory _status) public currProjectState(ProjectState.IN_PROGRESS) freelancerOnly{
        emit progressStatus(_status);
    }

    function getBalance() public view returns (uint256 payment) {
        return address(this).balance;
    }

}