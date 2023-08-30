from django.shortcuts import render
from django.http import JsonResponse
from .caesar_code import caesar
from .playfair_code import playfair_encrypt
from .hill_cipher import generate_random_key_matrix, hill_encrypt
from .vernam_cipher import vernam_encrypt
from .railfence_cipher import railfence_encrypt
from .vignere_cipher import vignere_encrypt
from .RSA import RSA_main
from .diffie_hellman import check_prime, generate_primitive_roots, diffie_hellman
from .des import des_encrypt
from .aes import aes_encrypt
from .elgamal import elgamal_encrypt
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
@api_view(['POST'])
def caesar_encrypt_view(request):
    text = request.data.get('input_str')
    shift = int(request.data.get('shift'))

    encrypted_text = caesar(text, shift)

    response_data = {
        'encrypted_text': encrypted_text
    }
    return JsonResponse(response_data)


@api_view(['POST'])
def playfair_encrypt_view(request):
    plaintext = request.data.get('plaintext')
    key = request.data.get('key')
    return_data = playfair_encrypt(plaintext, key)

    return return_data


@api_view(['POST'])
def hill_generateMatrix(request):
    size = request.data.get('size')
    generated_matrix = generate_random_key_matrix(size)
    return Response(generated_matrix)


@api_view(['POST'])
def hillEncrypt(request):
    plaintext = request.data.get('plaintext')
    key_matrix = request.data.get('key_matrix')
    return_data = hill_encrypt(plaintext, key_matrix)
    return Response(return_data)


@api_view(['POST'])
def vernam_encrypt_view(request):
    plaintext = request.data.get('input_str')
    key = request.data.get('key')
    return_data = vernam_encrypt(plaintext, key)
    print(return_data)
    return Response(return_data)


@api_view(['POST'])
def railfence_encrypt_view(request):
    plaintext = request.data.get('input_str')
    key = request.data.get('key')
    return_data = railfence_encrypt(plaintext, int(key))
    return Response(return_data)


@api_view(['POST'])
def vignere_encrypt_view(request):
    plaintext = request.data.get('input_str')
    key = request.data.get('key')
    return_data = vignere_encrypt(plaintext, key)
    return Response(return_data)


@api_view(['POST'])
def RSA_encrypt_view(request):
    plaintext = request.data.get('input_str')
    size = request.data.get('size')
    public_key = request.data.get('public_key')
    return_data = RSA_main(plaintext, size, public_key)
    return JsonResponse(return_data)


@api_view(['POST'])
def DH_generate_primitive_view(request):
    prime = request.data.get('prime')
    if check_prime(int(prime)):
        primitive_roots = generate_primitive_roots(int(prime))
        response_data = {
            'isPrime': True,
            'primitive_roots': primitive_roots
        }
        return JsonResponse(response_data)
    else:
        response_data = {
            'isPrime': False,
            'primitive_roots': []
        }
        return JsonResponse(response_data)


@api_view(['POST'])
def DH_generate_keys_view(request):
    prime = request.data.get('prime')
    primitive_root = request.data.get('primitive_root')
    response_data = diffie_hellman(int(prime), int(primitive_root))
    return JsonResponse(response_data)


@api_view(['POST'])
def des_encrypt_view(request):
    plaintext = request.data.get('input_str')
    key = request.data.get('key')
    return_data = des_encrypt(plaintext, key)
    return Response(return_data)


@api_view(['POST'])
def aes_encrypt_view(request):
    plaintext = request.data.get('input_str')
    key = request.data.get('key')
    return_data = aes_encrypt(plaintext, key.encode('utf-8'))
    return Response(return_data)


@api_view(['POST'])
def elgamal_encrypt_view(request):
    plaintext = request.data.get('input_str')
    size = request.data.get('size')
    return_data = elgamal_encrypt(plaintext, size)
    return JsonResponse(return_data)
