from cryptography.fernet import Fernet

file = open('key.key', 'rb')
key = file.read() # The key will be type bytes
file.close()
