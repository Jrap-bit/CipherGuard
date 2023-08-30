import random
import numpy as np


def generate_random_key_matrix(size):
    flag = False
    while not flag:
        key_matrix = []
        for _ in range(size):
            row = []
            for _ in range(size):
                row.append(random.randint(0, 25))
            key_matrix.append(row)

        while np.linalg.det(key_matrix) % 26 == 0:
            key_matrix = []
            for _ in range(size):
                row = []
                for _ in range(size):
                    row.append(random.randint(0, 25))
                key_matrix.append(row)
        if is_valid_key_matrix(key_matrix):
            det = int(np.linalg.det(key_matrix))
            try:
                det_multiplicative_inverse = pow(det, -1, 26)
                flag = True
            except ValueError as e:
                flag = False
                continue

    return key_matrix


def multiply_matrix(matrix1, matrix2):
    rows1 = len(matrix1)
    cols1 = len(matrix1[0])
    rows2 = len(matrix2)
    cols2 = len(matrix2[0])

    if cols1 != rows2:
        raise ValueError("Matrix dimensions are not compatible for multiplication.")

    cipherMatrix = [[0] * cols2 for _ in range(rows1)]

    for i in range(rows1):
        for j in range(cols2):
            cipherMatrix[i][j] = 0
            for x in range(cols1):
                cipherMatrix[i][j] += (matrix1[i][x] * matrix2[x][j])
            cipherMatrix[i][j] = cipherMatrix[i][j] % 26

    return cipherMatrix


def convert_cipher_to_matrix(function_cipher, pair):
    cipher_matrix_func = []
    temp_func = []
    if len(function_cipher) % pair != 0:
        for i in range(pair - len(function_cipher) % pair):
            function_cipher += 'X'
    for i in range(0, len(function_cipher), pair):
        for j in range(pair):
            temp_func.append([ord(function_cipher[i + j]) - 65])
    for i in range(len(function_cipher) // pair):
        cipher_matrix_func.append(temp_func[(pair * i):(pair * i) + pair])
    return cipher_matrix_func


def is_valid_key_matrix(matrix):
    if not isinstance(matrix, list) or not all(isinstance(row, list) for row in matrix):
        return False

    size = len(matrix)
    if size == 0 or len(matrix[0]) != size:
        return False

    det = int(round(np.linalg.det(matrix))) % 26
    gcd_det_26 = np.gcd(det, 26)

    if gcd_det_26 != 1:
        return False

    return True


def hill_encrypt(plaintext, key_matrix):
    pt = plaintext.upper()
    pair_size = len(key_matrix)
    cipher_text_matrix = convert_cipher_to_matrix(pt, pair_size)
    ciphertext = ""
    for matrix in cipher_text_matrix:
        cipher = multiply_matrix(key_matrix, matrix)
        for i in cipher:
            ciphertext += chr(i[0] + 65)
    return ciphertext
