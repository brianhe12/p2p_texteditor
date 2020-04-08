from cryptography.fernet import Fernet
encrypted = b"...encrypted bytes..."

f = Fernet(key)
decrypted = f.decrypt(encrypted)
