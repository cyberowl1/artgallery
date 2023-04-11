require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy", "Deploy the smart contracts", async(taskArgs, hre) => {

  const Artwork = await hre.ethers.getContractFactory("Artwork");
  const artwork = await Artwork.deploy("Artwork Contract", "ART");

  await artwork.deployed();

  await hre.run("verify:verify", {
    address: artwork.address,
    constructorArguments: [
      "Artwork Contract",
      "ART"
    ]
  })

})

module.exports = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: [
        process.env.PRIVATE_KEY || "867e1dbe27885589d7fd0b457169ddb59386ffad97c0bbccb7aabe1b7f0cbd35",
      ]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_KEY || "BB8I65N4NYGQ2IR5G6N8CBTBU4FVFGANW4",
  }
};
