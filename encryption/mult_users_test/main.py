import rsa
from cryptography.fernet import Fernet


class User:
	def __init__(self,pubkey,isme,isrecipient):
		self.pubkey = pubkey
		self.isme = isme
		self.isrecipient = isrecipient

	def sendto(self,userlist):
		for user in userlist:
			if(user.isrecipient and not user.isme):
				pass
				#rsa.encrypt(key,user.pubkey)       #encrypt the symmetric key with user's pubkey
				#send_encrypted_sym(user,encryptedkey)
	def send_encrypted_sym(self,user,key):
		pass
# generate symmetric key and write it to file
key = Fernet.generate_key()
'''k = open('symmetric.key','wb')
k.write(key)
k.close()'''

# create the public & private keys and write them to file for all 3 users
(pubkeyuser1,privkeyuser1)=rsa.newkeys(2048)
'''pukeyuser1 = open('publickey.key','wb')
pukeyuser1.write(pubkeyuser1.save_pkcs1('PEM'))
pukeyuser1.close()
prkeyuser1 = open('privkeyuser1.key','wb')
prkeyuser1.write(privkeyuser1.save_pkcs1('PEM'))
prkeyuser1.close()'''

(pubkeyuser2,privkeyuser2)=rsa.newkeys(2048)
'''pukeyuser2 = open('publickey.key','wb')
pukeyuser2.write(pubkeyuser2.save_pkcs1('PEM'))
pukeyuser2.close()
prkeyuser2 = open('privkeyuser2.key','wb')
prkeyuser2.write(privkeyuser2.save_pkcs1('PEM'))
prkeyuser2.close()'''

(pubkeyuser3,privkeyuser3)=rsa.newkeys(2048)
'''pukeyuser3 = open('publickey.key','wb')
pukeyuser3.write(pubkeyuser3.save_pkcs1('PEM'))
pukeyuser3.close()
prkeyuser3 = open('privkeyuser3.key','wb')
prkeyuser3.write(privkeyuser3.save_pkcs1('PEM'))
prkeyuser3.close()'''

# create the cipher
cipher = Fernet(key)

# open file for encrypting
myfile = open('mysecretdata','rb')
myfiledata= myfile.read()

# encrypt the data with symetric key
encrypted_data = cipher.encrypt(myfiledata)
'''edata = open('encrypted_file','wb')
edata.write(encrypted_data)'''
print("Encrypted data:\n")
print(encrypted_data)


# encrypt the symmetric key file with the public key of user3
encrypted_key = rsa.encrypt(key,pubkeyuser3)


print("User 2 attempts to decrypt with his private key:")
try:
	dpubkey = rsa.decrypt(encrypted_key,privkeyuser2)
	cipher = Fernet(dpubkey)
	decrypted_data = cipher.decrypt(encrypted_data)
	#print(decrypted_data.decode())
except:
	print("User 2 failed to decrypt")
else:
	print("User 2 successfully decrypted the data")

print("User 3 attempts to decrypt with his private key:")
try:
	dpubkey = rsa.decrypt(encrypted_key,privkeyuser3)
	cipher = Fernet(dpubkey)
	decrypted_data = cipher.decrypt(encrypted_data)
	#print(decrypted_data.decode())
except:
	print("User 3 failed to decrypt")
else:
	print("User 3 successfully decrypted the data")





