def key_generation(accepted_plaintext, accepted_key):
    newkey = ""
    if len(accepted_key) < len(accepted_plaintext):
        for i in range(len(accepted_plaintext)):
            newkey += accepted_key[i % len(accepted_key)]
        return newkey
    else:
        return accepted_key


def vignere_encrypt(plaintext_rec, key):
    plaintext = plaintext_rec.upper()
    cipher = ""
    keyword_func = key_generation(plaintext, key).upper()
    for i in range(len(plaintext)):
        if plaintext[i] == " ":
            cipher += " "
        else:
            char = ((ord(plaintext[i]) - 65) + (ord(keyword_func[i]) - 65))
            cipher += chr((char % 26) + 65)
    return cipher
