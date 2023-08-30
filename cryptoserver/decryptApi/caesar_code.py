def caesar(new_str, shift):
    decrypt = ""
    for i in range(len(new_str)):
        if new_str[i].isupper():
            char_shift = ord(new_str[i]) - shift - 65
            char_shift = (char_shift % 26)
            decrypt += chr(char_shift + 65)
        elif new_str[i].islower():
            char_shift = ord(new_str[i]) - shift - 97
            char_shift = char_shift % 26
            decrypt += chr(char_shift + 97)
    return decrypt


def caesarBruteforce(input_str):
    bruteforce_results = []
    print(input_str)
    for shift in range(1, 27):  # 26 shifts for Caesar cipher
        result = ""
        for char in input_str:
            if char.isalpha():
                shifted_char = chr(((ord(char.lower()) - 97 - shift) % 26) + 97)
                if char.isupper():
                    result += shifted_char.upper()
                else:
                    result += shifted_char
            else:
                result += char
        bruteforce_results.append(result)
    return bruteforce_results
