def RSA_decrypt(ciphertext, d, n):
    plaintext = ""
    for i in ciphertext:
        char = pow(int(i), int(d), int(n))
        plaintext += chr(char + 65)
    return plaintext
