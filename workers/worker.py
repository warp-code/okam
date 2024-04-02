from web3 import Web3, HTTPProvider
from eth_account import Account
from web3.middleware import geth_poa_middleware
from dotenv import load_dotenv
import os

load_dotenv()


# Ethereum node endpoint
infura_url = os.getenv("INFURA_URL")
contract_address = os.getenv("CONTRACT_ADDRESS")

# Initialize web3 with Infura endpoint
web3 = Web3(HTTPProvider(infura_url))
web3.middleware_onion.inject(geth_poa_middleware, layer=0)

# Generate Ethereum wallet
def generate_wallet():
    account = Account.create()
    private_key = account.privateKey.hex()
    address = account.address
    return private_key, address

# Watch for incoming NFTs
def watch_nft(wallet_address):
    # Ethereum NFT contract address
    nft_contract_address = contract_address
    
    # ABI of the NFT contract
    nft_contract_abi = [
        # ABI of your NFT contract
        # You need to fill this with the actual ABI of your NFT contract
    ]
    
    # Contract instance
    nft_contract = web3.eth.contract(address=nft_contract_address, abi=nft_contract_abi)
    
    # Filter for the event indicating NFT minting
    event_filter = nft_contract.events.Transfer.createFilter(
        argument_filters={'to': wallet_address}
    )
    
    # Event listener
    for event in event_filter.get_all_entries():
        print("NFT Minted:", event['args'])

if __name__ == "__main__":
    private_key, address = generate_wallet()
    print("New Wallet Generated:")
    print("Address:", address)
    print("Private Key:", private_key)
    
    print("\nWaiting for NFTs...")
    watch_nft(address)
