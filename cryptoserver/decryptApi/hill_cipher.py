import random
import numpy as np
import math


def is_valid_key_matrix(matrix):
    modulus = 26
    if len(matrix) != len(matrix[0]):
        return False

    matrix_size = len(matrix)
    determinant = None

    if matrix_size == 2:
        determinant = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    elif matrix_size == 3:
        determinant = (
                matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1])
                - matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0])
                + matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
        )
    else:
        return False

    gcd = math.gcd(determinant, modulus)
    return gcd == 1


def decrypt_hill_cipher(ciphertext_func, key):
    key_inv = inverse_matrix(key)
    plaintext = ""
    n = len(ciphertext_func)
    pair = convert_cipher_to_matrix(ciphertext_func, len(key))
    for mat in pair:
        result = np.dot(key_inv, mat)
        plaintext += chr(int(result[0][0] % 26) + ord('A'))
        plaintext += chr(int(result[1][0] % 26) + ord('A'))
        plaintext += chr(int(result[2][0] % 26) + ord('A'))
    return plaintext


def inverse_matrix(K):
    det = int(np.linalg.det(K))
    det_multiplicative_inverse = pow(det, -1, 26)
    K_inv = [[0] * 3 for i in range(3)]
    for i in range(3):
        for j in range(3):
            Dji = K
            Dji = np.delete(Dji, (j), axis=0)
            Dji = np.delete(Dji, (i), axis=1)
            det = Dji[0][0] * Dji[1][1] - Dji[0][1] * Dji[1][0]
            K_inv[i][j] = (det_multiplicative_inverse * pow(-1, i + j) * det) % 26
    return K_inv


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
