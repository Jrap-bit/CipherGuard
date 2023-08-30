from django.urls import path
from . import views

urlpatterns = [
    path('caesar/', views.caesar_decrypt_view, name='caesar-decrypt'),
    path('caesar/bruteforce/', views.caesar_bruteforce_view, name='caesar-bruteforce'),
    path('playfair/', views.playfair_decrypt_view, name='playfair-decrypt'),
    path('hill/verify/', views.verify_matrix, name='hill-verify'),
    path('hill/', views.hill_decrypt_view, name='hill-decrypt'),
    path('vernam/', views.vernam_decrypt_view, name='vernam-decrypt'),
    path('railfence/', views.railfence_decrypt_view, name='railfence-decrypt'),
    path('vigenere/', views.vigenere_decrypt_view, name='vigenere-decrypt'),
    path('RSA/', views.RSA_decrypt_view, name='rsa-decrypt'),
    path('DES/', views.des_decrypt_view, name='des-decrypt'),
    path('AES/', views.aes_decrypt_view, name='aes-decrypt'),
    path('Elgamal/', views.elgamal_decrypt_view, name='elgamal-decrypt'),
    ]