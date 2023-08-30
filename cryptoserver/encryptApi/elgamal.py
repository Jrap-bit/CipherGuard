import random


def conv_message_to_arr(message):
    func_mess = message.upper()
    message_arr = []
    for i in func_mess:
        message_arr.append(ord(i) - 65)
    return message_arr


def gcd(k, q):
    if q == 0:
        return k
    else:
        return gcd(q, k % q)


def choose_k(prime):
    while True:
        k = random.randint(1, prime)
        if gcd(k, prime - 1) == 1:
            return k
        else:
            continue


def rabin_miller(prime_candidate):
    even = prime_candidate - 1
    num_of_two = 0
    while even % 2 == 0:
        even >>= 1
        num_of_two += 1
    for i in range(10):
        a = random.randrange(2, prime_candidate - 1)
        x = pow(a, even, prime_candidate)
        if x == 1:
            return True
        for j in range(num_of_two - 1):
            x = pow(a, 2 ** j * even, prime_candidate)
            if x == 1:
                return True
            if x == prime_candidate - 1:
                return True
        else:
            return False


def prime_gen(n):
    first_primes_list = [2, 3, 5, 11, 7, 13, 17, 19, 23, 29,
                         31, 37, 41, 43, 47, 53, 59, 61, 67,
                         71, 73, 79, 83, 89, 97, 101, 103,
                         107, 109, 113, 127, 131, 137, 139,
                         149, 151, 157, 163, 167, 173, 179,
                         181, 191, 193, 197, 199, 211, 223,
                         227, 229, 233, 239, 241, 251, 257,
                         263, 269, 271, 277, 281, 283, 293,
                         307, 311, 313, 317, 331, 337, 347, 349]

    while True:
        n_bit_prime = random.randrange(2 ** (n - 1) + 1, 2 ** n - 1)
        for i in first_primes_list:
            if n_bit_prime == i:
                return n_bit_prime
            if n_bit_prime % i == 0:
                break
        else:
            return n_bit_prime


def main_gen(n=512):
    if n == 2:
        return random.choice([2, 3])
    while True:
        prime_cand = prime_gen(n)
        if not rabin_miller(prime_cand):
            continue
        else:
            return prime_cand


def sign(message, prime, secret, gen):
    k = choose_k(prime)
    s1 = pow(gen, k, prime)
    inv_k = pow(k, -1, prime - 1)
    s2 = inv_k * (message - (secret * s1)) % (prime - 1)
    return s1, s2


def elgamal_encrypt(message, bits):
    mess_arr = conv_message_to_arr(message)
    prime = main_gen(bits)
    generator = random.randint(1, prime)
    private_key = random.randint(1, prime)
    public_key = pow(generator, private_key, prime)

    sign_arr = []
    index = 0

    for message in mess_arr:
        s1, s2 = sign(message, prime, private_key, generator)
        sign_arr.append([s1, s2])

    response = {
        "prime": prime,
        "generator": generator,
        "public_key": public_key,
        "private_key": private_key,
        "sign_arr": sign_arr

    }
    return response