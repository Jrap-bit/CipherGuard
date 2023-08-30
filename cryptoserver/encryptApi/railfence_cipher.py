def railfence_encrypt(plaintext, key):
    ciphertext = ""
    for i in range(key):
        for j in range(i, len(plaintext), key):
            ciphertext += plaintext[j]
    return ciphertext
