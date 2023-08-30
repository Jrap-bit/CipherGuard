from Crypto.Cipher import DES, DES3
from Crypto.Util.Padding import pad, unpad
from base64 import b64encode, b64decode


def des_encrypt(plaintext, key):
    keylen = len(key)
    if keylen == 8:
        key = key.encode('utf-8')
        cipher = DES.new(key, DES.MODE_ECB)
        ciphertext = cipher.encrypt(pad(plaintext.encode('utf-8'), DES.block_size))
        ciphertext = b64encode(ciphertext).decode('utf-8')
        return ciphertext

    if keylen == 16 or keylen == 24:
        key = key.encode('utf-8')
        cipher = DES3.new(key, DES3.MODE_ECB)
        ciphertext = cipher.encrypt(pad(plaintext.encode('utf-8'), DES3.block_size))
        ciphertext = b64encode(ciphertext).decode('utf-8')
        return ciphertext

