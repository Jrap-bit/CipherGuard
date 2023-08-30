def verify(message, gen, prime, public, sign_arr, index):
    s1, s2 = sign_arr[index]
    v1 = pow(gen, message, prime)
    temp_1 = pow(public, int(s1))
    temp_2 = pow(int(s1), int(s2))
    v2 = (temp_1 * temp_2) % prime
    return v1, v2


def conv_message_to_arr(message):
    func_mess = message.upper()
    message_arr = []
    for i in func_mess:
        message_arr.append(ord(i) - 65)
    return message_arr


def elgamal_decrypt(message, prime, public, gen, sign_arr):
    index = 0
    mess_arr = conv_message_to_arr(message)
    for i in range(len(mess_arr)):
        v1, v2 = verify(mess_arr[i], gen, prime, public, sign_arr, i)
        index += 1
        if v1 != v2:
            return False
    return True
