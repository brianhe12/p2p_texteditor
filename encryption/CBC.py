import rsa
from cryptography.fernet import Fernet
import keyring
import os

#Fernet is a AES CBC with 128 bit key encryption using PKCS7 padding
    #AES: Security-grade Block cipher (AES-128) using 128 bit long symmetric key. It consists of 10 rounds in each round consists of subsitution, tranposition, and mixing PT input
        #data is put into an array before being put into transformations
        #Subsitution subsitutes texts with subsitution table
        #transposition shifts the rows of data
        #mixing mixes the columns
    #CBC: Each block of PT is xored with IV or previous CT and encrypted by key to generate corresponding CT to each block of PT
        # provides secrecy (not readable/encrypted) does not gurantee integrity (no tampering) and authenticity (does it come from the user)
        # Authenticity and Integrity comes from HMAC using SHA256
            #HMAC: hash a MAC (message authenticiation code) that authenticates and ensures integrity and generates MAC using SHA 256
            #SHA 256: set of cryptographic hash functions with digests/hash values of 256 bits
    #PCKCS7: Public Key Cryptography Standards or issued constraints provied by RSA Authority. Size of AES blocks and padding (if PT block is not big enough) is standardized by RSA
    
#Hybrid cryptography: blends combination of both asymmetric and symmetric encryption/decryption
    #need a cipher to decrypt and encrypt
    #File only needs symkey to encrypt
    #Users need encrypted key and public key to decrypt
    #encrypted key is generated with symkey and private key
    #Each file has a unique sym key
    #Each user has a unique priv and pub key

#all encapsualtions will be hidden
#User object encapsulates its own username, pubkey, priv key
class User:
    def __init__(self, name):
        self.pubkey = None
        self.privkey = None
        self.username = name
        
    def generate_userkeys():
        (pubkey, privkey) = rsa.newkeys(2048)
        
#File encapsulates its own user list, user, filename, and symkey
class File:
    def __init__(self, User, file):
        self.user_list = [User]
        self.owner = User
        self.filename = file
        self.symkey = None
        self.cipher = None
        
    def generate_filekey():
        symkey = Fernet.generate_key()

    def add_user(User):
        user_list.append(User)
  
    def cipher_gen():
        ciper = Fernet(symkey)
        
    def encrypt_data(input):
        print("encrypting data: "+ input)
        encrypted_data = cipher.encrypt(input)
        return encrypted_data
        
    def encrypt_file():
        with open(file_name, 'rb') as myfile:
            myfiledata = myfile.read()
            
        print("encrypting "+file_name+" ...")
        encrypted_data = cipher.encrypt(myfiledata)
        
        with open(file_name, 'rb') as myfile:
            myfile.write(encrypted_data)
    
#general oeprations for decryption (only visible to user)
def encrypt_key(File, User):
    symkey = File.filename
    encrypted_key = rsa.encrypt (symkey, User.pubkey)
    return encrypted_key
  
def decrypt_file(encrypted_key, User, File):
    print(User.username + " attempts to decrypt with his private key...")
    try:
        dpubkey = rsa.decrypt(encrypted_key, User.privkey)
        cipher = Fernet(dpubkey)
        
        myfile = File.filename
        
        with open(file_name, 'rb') as myfile:
            encrypted_data = myfile.read()
            
        decrypted_data = cipher.decrypt(encrypted_data)
        
        with open(file_name, 'rb') as myfile:
            myfile.write(encrypted_data)
    except:
        print(User.username + " failed to decrypt")
    else:
        print(User.username + " successfully decrypted the data")

def decrypt_data(encrypted_key, User, File, input):
    print("decrypting data: "+ input)
    print(User.username + " attempts to decrypt with his private key...")
    try:
        dpubkey = rsa.decrypt(encrypted_key, User.privkey)
        cipher = Fernet(dpubkey)
        
        myfile = File.filename
            
        decrypted_data = cipher.decrypt(input)
        
        return decrypted_data
    except:
        print(User.username + " failed to decrypt")
    else:
        print(User.username + " successfully decrypted the data")
        
def save_key(sys, user, key):
    keyring.set_password(sys, user, key)

def get_key(sys, user):
    keyring.get_password(sys, user)
