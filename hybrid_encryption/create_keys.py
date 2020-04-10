import rsa
from cryptography.fernet import Fernet
# generate symmetric key and write it to file
key = Fernet.generate_key()

k = open('symmetric.key','wb')
k.write(key)
k.close()

# create the public & private keys and write them to file
(pubkey,privkey)=rsa.newkeys(2048)

pukey = open('publickey.key','wb')
pukey.write(pubkey.save_pkcs1('PEM'))
pukey.close()

prkey = open('privkey.key','wb')
prkey.write(privkey.save_pkcs1('PEM'))
prkey.close()


