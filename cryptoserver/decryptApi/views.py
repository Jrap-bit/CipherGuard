from django.shortcuts import render
from django.http import JsonResponse
from .caesar_code import caesar, caesarBruteforce
from .playfair_code import playfair_decrypt
from .hill_cipher import is_valid_key_matrix, decrypt_hill_cipher
from .vernam_cipher import vernam_decrypt
from .railfence_cipher import railfence_decrypt
from .vignere_cipher import vignere_decrypt
from .RSA import RSA_decrypt
from .des import des_decrypt
from .aes import aes_decrypt
from .elgamal import elgamal_decrypt
from rest_framework.decorators import api_view
from rest_framework.response import Response
import re

# Create your views here.
@api_view(['POST'])
def caesar_decrypt_view(request):
    encrypted_text = request.data.get('input_str')
    shift = int(request.data.get('shift'))

    decrypted_text = caesar(encrypted_text, shift)

    response_data = {
        'decrypted_text': decrypted_text
    }
    return JsonResponse(response_data)


@api_view(['POST'])
def caesar_bruteforce_view(request):
    encrypted_text = request.data.get('input_str')  # Use request.data instead of request.body
    decrypted_text = caesarBruteforce(encrypted_text)
    return Response(decrypted_text)


@api_view(['POST'])
def playfair_decrypt_view(request):
    ciphertext = request.data.get('ciphertext')
    key = request.data.get('key')
    resp = playfair_decrypt(ciphertext, key)
    return resp


@api_view(['POST'])
def verify_matrix(request):
    key_matrix = request.data.get('decryptMatrix')
    ans = is_valid_key_matrix(key_matrix)
    return Response(ans)


@api_view(['POST'])
def hill_decrypt_view(request):
    ciphertext = request.data.get('ciphertext')
    key = request.data.get('key')
    resp = decrypt_hill_cipher(ciphertext, key)
    return Response(resp)


@api_view(['POST'])
def vernam_decrypt_view(request):
    ciphertext = request.data.get('input_str')
    key = request.data.get('key')
    extra = request.data.get('extra')
    return_data = vernam_decrypt(ciphertext, key, extra)
    return Response(return_data)


@api_view(['POST'])
def railfence_decrypt_view(request):
    ciphertext = request.data.get('input_str')
    key = request.data.get('key')
    return_data = railfence_decrypt(ciphertext, int(key))
    return Response(return_data)


@api_view(['POST'])
def vigenere_decrypt_view(request):
    ciphertext = request.data.get('input_str')
    key = request.data.get('key')
    return_data = vignere_decrypt(ciphertext, key)
    return Response(return_data)


@api_view(['POST'])
def RSA_decrypt_view(request):
    ciphertext = request.data.get('ciphertext')
    d = request.data.get('d')
    n = request.data.get('n')
    resp = RSA_decrypt(ciphertext, d, n)
    return Response(resp)


@api_view(['POST'])
def des_decrypt_view(request):
    ciphertext = request.data.get('input_str')
    key = request.data.get('key')
    return_data = des_decrypt(ciphertext, key)
    return Response(return_data)

@api_view(['POST'])
def aes_decrypt_view(request):
    ciphertext = request.data.get('input_str')
    key = request.data.get('key')
    return_data = aes_decrypt(ciphertext, key.encode('utf-8'))
    return Response(return_data)

@api_view(['POST'])
def elgamal_decrypt_view(request):
    ciphertext = request.data.get('ciphertext')
    prime = request.data.get('prime')
    public = request.data.get('public')
    gen = request.data.get('gen')
    sign_arr = request.data.get('sign_arr')
    pairs = re.findall(r'\[([\d,]+)\]', sign_arr)
    two_d_array = [list(map(int, pair.split(','))) for pair in pairs]
    return_data = elgamal_decrypt(ciphertext, int(prime), int(public), int(gen), two_d_array)
    return Response(return_data)