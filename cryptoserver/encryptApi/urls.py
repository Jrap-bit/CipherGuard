from django.urls import path
from . import views

urlpatterns = [
    path('caesar/', views.caesar_encrypt_view, name='caesar-encrypt'),
    path('playfair/', views.playfair_encrypt_view, name='playfair-encrypt'),
    path('hill/', views.hillEncrypt, name='hill-encrypt'),
    path('hill/generateMatrix/', views.hill_generateMatrix, name='hill-generateMatrix'),
    path('vernam/', views.vernam_encrypt_view, name='vernam-encrypt'),
    path('railfence/', views.railfence_encrypt_view, name='railfence-encrypt'),
    path('vigenere/', views.vignere_encrypt_view, name='vignere-encrypt'),
    path('RSA/', views.RSA_encrypt_view, name='RSA-encrypt'),
    path('Diffie/generatePrimitive/', views.DH_generate_primitive_view, name='diffie-hellman-primitivegen'),
    path('Diffie/generateKeys/', views.DH_generate_keys_view, name='diffie-hellman-keygen'),
    path('DES/', views.des_encrypt_view, name='des-encrypt'),
    path('AES/', views.aes_encrypt_view, name='aes-encrypt'),
    path('Elgamal/', views.elgamal_encrypt_view, name='elgamal-encrypt')
]
