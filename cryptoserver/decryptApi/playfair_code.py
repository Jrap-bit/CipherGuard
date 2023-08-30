from django.http import JsonResponse


def matrix_creation(enc_key):
    enc_key = enc_key.upper()
    final_matrix = [[" " for _ in range(5)] for _ in range(5)]
    letters_used = []
    for letter in enc_key:
        if letter not in letters_used:
            letters_used.append(letter)
        else:
            continue
    for letter in "ABCDEFGHIKLMNOPQRSTUVWXYZ":
        if letter not in letters_used:
            if letter == 'J':
                continue
            else:
                letters_used.append(letter)
        else:
            continue
    index = 0
    for i in range(5):
        for j in range(5):
            final_matrix[i][j] = letters_used[index]
            index += 1
    return final_matrix


def letter_pairs(func_plaintext):
    func_plaintext = func_plaintext.upper()
    func_plaintext = func_plaintext.replace(" ", "")
    func_plaintext = func_plaintext.replace("J", "I")
    for i in range(len(func_plaintext)):
        if func_plaintext[i - 1] == func_plaintext[i]:
            func_plaintext = func_plaintext[:i] + "X" + func_plaintext[i:]
    if len(func_plaintext) % 2 != 0:
        func_plaintext += "X"
    pairs = []
    for i in range(0, len(func_plaintext), 2):
        pairs.append(func_plaintext[i:i + 2])
    return pairs


def find_position(func_matrix, func_letter):
    for i in range(5):
        for j in range(5):
            if func_matrix[i][j] == func_letter:
                return i, j


def playfair_decrypt(ciphertext, key):
    matrix = matrix_creation(key)
    cipher_letter_pairs = letter_pairs(ciphertext)

    decrypt_text = ""
    for i in cipher_letter_pairs:
        row1, col1 = find_position(matrix, i[0])
        row2, col2 = find_position(matrix, i[1])
        if row1 == row2:
            decrypt_text += matrix[row1][(col1 - 1) % 5] + matrix[row2][(col2 - 1) % 5]
        elif col1 == col2:
            decrypt_text += matrix[(row1 - 1) % 5][col1] + matrix[(row2 - 1) % 5][col2]
        else:
            decrypt_text += matrix[row1][col2] + matrix[row2][col1]

    response_data = {
        'decrypted_text': decrypt_text,
        'matrix': matrix_creation(key)  # Return the matrix as part of the response
    }
    return JsonResponse(response_data)
