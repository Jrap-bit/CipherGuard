def key_generation(accepted_plaintext, accepted_key):
    newkey = ""
    if len(accepted_key) < len(accepted_plaintext):
        for i in range(len(accepted_plaintext)):
            newkey += accepted_key[i % len(accepted_key)]
        return newkey
    else:
        return accepted_key


def vignere_decrypt(ciphertext_rec, key):
    decrypt_cipher = ""
    ciphertext = ciphertext_rec.upper()
    keyword_func = key_generation(ciphertext, key).upper()
    for i in range(len(ciphertext)):
        if ciphertext[i] == " ":
            decrypt_cipher += " "
        else:
            char = ((ord(ciphertext[i]) - 65) - (ord(keyword_func[i]) - 65))
            decrypt_cipher += chr((char % 26) + 65)
    return decrypt_cipher
