from Crypto.Cipher import DES, DES3
from Crypto.Util.Padding import pad, unpad
from base64 import b64encode, b64decode


def des_decrypt(ciphertext, key):
    keylen = len(key)
    if keylen == 8:
        key = key.encode('utf-8')
        cipher = DES.new(key, DES.MODE_ECB)
        decrypted = unpad(cipher.decrypt(b64decode(ciphertext)), DES.block_size)
        return decrypted.decode('utf-8')

    if keylen == 16 or keylen == 24:
        key = key.encode('utf-8')
        cipher = DES3.new(key, DES3.MODE_ECB)
        decrypted = unpad(cipher.decrypt(b64decode(ciphertext)), DES3.block_size)
        return decrypted.decode('utf-8')

