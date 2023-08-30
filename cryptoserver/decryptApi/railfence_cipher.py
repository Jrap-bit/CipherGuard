import math


def railfence_decrypt(cipherText, key):
    plaintext_decrypted = ""
    rail = [['\n' for i in range(math.ceil(len(cipherText) / key))] for j in range(key)]
    for i in range(len(rail)):
        for j in range(len(rail[0])):
            try:
                rail[i][j] = cipherText[i * len(rail[0]) + j]
            except IndexError:
                pass

    for i in range(len(rail[0])):
        for j in range(len(rail)):
            if rail[j][i] != '\n':
                plaintext_decrypted += rail[j][i]

    return plaintext_decrypted
