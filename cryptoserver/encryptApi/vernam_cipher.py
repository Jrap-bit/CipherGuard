def xor(bit_1, bit_2):
    if bit_1 == bit_2:
        return "0"
    else:
        return "1"


def match_length(first, second):
    if len(first) < len(second):
        for i in range(len(second) - len(first)):
            first = "0" + first
    else:
        for i in range(len(first) - len(second)):
            second = "0" + second
    return first, second


def xor_vernam(char_1, char_2):
    encrypted = ""
    for i in range(len(char_1)):
        encrypted += xor(char_1[i], char_2[i])
    return encrypted


def vernam(plaintext_func, keyword_func):
    cipher_ret = ""
    extra = [False for i in range(len(plaintext_func))]
    for i in range(len(plaintext_func)):
        if plaintext_func[i] == " ":
            cipher_ret += " "
        else:
            char1 = bin((ord(plaintext_func[i]) - 65))
            char2 = bin((ord(keyword_func[i]) - 65))
            char1, char2 = char1[2:], char2[2:]
            char1, char2 = match_length(char1, char2)
            temp_cipher = int(xor_vernam(char1, char2), 2)
            if temp_cipher >= 26:
                temp_cipher -= 26
                extra[i] = True
            cipher_ret += chr(temp_cipher + 65)
    return cipher_ret, extra


def key_generation(accepted_plaintext, accepted_key):
    newkey = ""
    if len(accepted_key) < len(accepted_plaintext):
        for i in range(len(accepted_plaintext)):
            newkey += accepted_key[i % len(accepted_key)]
        return newkey
    else:
        return accepted_key


def vernam_encrypt(plaintext, key):
    pt = plaintext.upper()
    key_up = key.upper()
    keyword = key_generation(plaintext, key_up)
    cipher_ret, extra = vernam(pt, keyword)
    response_data = {
        'encrypted_text': cipher_ret,
        'extra': extra
    }
    return response_data
