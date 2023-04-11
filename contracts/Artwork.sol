// SPDX-LIicense-Identifier: MIT
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Artwork is ERC721{
    uint public tokenCounter;
    mapping (uint256 => string) private _tokenURIs;
    constructor(string memory name,string memory symbol)ERC721(name,symbol){
        tokenCounter=0;
    }

    function mint(string memory _tokenURI) public{
        _safeMint(msg.sender,tokenCounter);
        _setTokenURI(tokenCounter, _tokenURI);
        tokenCounter++;

    }
    
    

    function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal virtual{
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI set of non existent token"
            );
            _tokenURIs[_tokenId] = _tokenURI;
        
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns(string memory) {
    require(
        _exists(_tokenId),
        "ERC721Metadata: URI set of nonexistent token"
    );
    return _tokenURIs[_tokenId];
}

}