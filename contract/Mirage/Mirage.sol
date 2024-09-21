// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Mirage {
    struct Message {
        address sender;
        address receiver;
        string subject; // Subject of the message
        string content; // IPFS hash or plain text
        string imageHash; // IPFS hash of the image
        uint256 timestamp;
        bool isDeleted; // Flag to mark message as deleted
        bool asset; // Indicates if an asset is attached
        uint256 assetAmount; // The amount of asset attached
        bool isRead; // Indicates if the message has been read
    }

    struct Contact {
        address account;
        string email;
        string chainId;
        bool verified; // Indicates if the contact is verified
    }

    struct VerificationRequest {
        address requester; // Address of the requester
        string email;      // Email of the requester
        string chainId;    // Chain ID of the requester
        address contact;   // Contact address to be verified
    }

    Message[] public messages;
    mapping(address => uint256[]) public userMessages;
    mapping(address => string) public userEmails; // Mapping user address to unique email id
    mapping(string => address) public emailToAddress; // Reverse mapping from email to user address
    mapping(address => Contact[]) public userContacts; // Mapping user to their contacts
    mapping(uint256 => bool) public isVerified; // Mapping message id to its verification status
    mapping(uint256 => bool) public isRedeemed; // Mapping message id to redeemed status

    VerificationRequest[] public verificationRequests;
    mapping(address => uint256[]) public userVerificationRequests; // Mapping from user address to verification request IDs

    event MessageSent(address indexed sender, address indexed receiver, uint256 messageId);
    event MessageDeleted(address indexed user, uint256 messageId);
    event MessageRead(address indexed user, uint256 messageId);
    event MessageVerified(address indexed user, uint256 messageId, bool verified);

    // Send message with default subject if none is provided
    function sendMessage(address _receiver, string memory _subject, string memory _content, string memory _imageHash, bool _asset, uint256 _assetAmount) public {
        if (bytes(_subject).length == 0) {
            _subject = string(abi.encodePacked("New Message from ", userEmails[msg.sender]));
        }

        uint256 messageId = messages.length;
        messages.push(Message({
            sender: msg.sender,
            receiver: _receiver,
            subject: _subject,
            content: _content,
            imageHash: _imageHash,
            timestamp: block.timestamp,
            isDeleted: false,
            asset: _asset,
            assetAmount: _assetAmount,
            isRead: false
        }));
        userMessages[_receiver].push(messageId);
        userMessages[msg.sender].push(messageId); // Add message to sender's message list
        emit MessageSent(msg.sender, _receiver, messageId);
    }

    // Set user email and update reverse mapping
    function setUserEmail(address _user, string memory _email) public {
        require(msg.sender == _user, "Only the user can set their email");
        userEmails[_user] = _email;
        emailToAddress[_email] = _user;
    }

    function getUserEmail(address _user) public view returns (string memory) {
        return userEmails[_user];
    }

    function addUserContact(address _user, Contact memory _contact) public {
        require(msg.sender == _user, "Only the user can add their contacts");
        userContacts[_user].push(_contact);
    }

    function getUserContacts(address _user) public view returns (Contact[] memory) {
        return userContacts[_user];
    }

    // Get the verification status of a contact by their email
    function isContactVerified(address _user, string memory _email) public view returns (bool) {
        Contact[] memory contacts = userContacts[_user];
        for (uint256 i = 0; i < contacts.length; i++) {
            if (keccak256(abi.encodePacked(contacts[i].email)) == keccak256(abi.encodePacked(_email))) {
                return contacts[i].verified;
            }
        }
        return false;
    }

    // Set the verification status of a contact by their email
    function setContactVerified(address _user, string memory _email, bool _status) public {
        require(msg.sender == _user, "Only the user can set the verification status of their contacts");
        Contact[] storage contacts = userContacts[_user];
        for (uint256 i = 0; i < contacts.length; i++) {
            if (keccak256(abi.encodePacked(contacts[i].email)) == keccak256(abi.encodePacked(_email))) {
                contacts[i].verified = _status;
                break;
            }
        }
    }

    // Request a contact verification
    function requestVerification(string memory _email, string memory _chainId, address _contact) public {
        verificationRequests.push(VerificationRequest({
            requester: msg.sender,
            email: _email,
            chainId: _chainId,
            contact: _contact
        }));
        userVerificationRequests[msg.sender].push(verificationRequests.length - 1);
    }

    // Get the verification requests for a user
    function getVerificationRequests(address _user) public view returns (VerificationRequest[] memory) {
        uint256[] memory requestIds = userVerificationRequests[_user];
        VerificationRequest[] memory requests = new VerificationRequest[](requestIds.length);

        for (uint256 i = 0; i < requestIds.length; i++) {
            requests[i] = verificationRequests[requestIds[i]];
        }

        return requests;
    }

    function setReadStatus(uint256 messageId, bool _isRead) public {
        require(messageId < messages.length, "Message does not exist");
        require(messages[messageId].receiver == msg.sender, "Not authorized to mark this message as read");
        messages[messageId].isRead = _isRead;
        emit MessageRead(msg.sender, messageId);
    }

    function isMessageRead(uint256 messageId) public view returns (bool) {
        require(messageId < messages.length, "Message does not exist");
        return messages[messageId].isRead;
    }

    function setVerificationStatus(uint256 messageId, bool _isVerified) public {
        require(messageId < messages.length, "Message does not exist");
        require(messages[messageId].receiver == msg.sender, "Only the receiver can verify the message");
        isVerified[messageId] = _isVerified;
        emit MessageVerified(msg.sender, messageId, _isVerified);
    }

    function getMessageById(uint256 messageId) public view returns (Message memory) {
        require(messageId < messages.length, "Message does not exist");
        require(isVerified[messageId], "Message is not verified");
        return messages[messageId];
    }

    function deleteMessage(uint256 messageId) public {
        require(messageId < messages.length, "Message does not exist");
        Message storage message = messages[messageId];
        require(message.receiver == msg.sender || message.sender == msg.sender, "Not authorized to delete this message");
        message.isDeleted = true;
        emit MessageDeleted(msg.sender, messageId);
    }

    function getUserInbox(address _user) public view returns (Message[] memory) {
        uint256[] memory messageIds = userMessages[_user];
        Message[] memory inbox = new Message[](messageIds.length);
        uint256 counter = 0;

        for (uint256 i = 0; i < messageIds.length; i++) {
            Message storage message = messages[messageIds[i]];
            if (!message.isDeleted && isVerified[messageIds[i]]) {
                inbox[counter] = message;
                counter++;
            }
        }

        // Resize the array to fit the number of non-deleted messages
        Message[] memory resizedInbox = new Message[](counter);
        for (uint256 j = 0; j < counter; j++) {
            resizedInbox[j] = inbox[j];
        }

        return resizedInbox;
    }
}
