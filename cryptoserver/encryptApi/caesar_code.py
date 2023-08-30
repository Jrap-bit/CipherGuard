def caesar(inp_srt, shift):
    new_str = ""
    for i in range(len(inp_srt)):
        if inp_srt[i].isupper():
            char_shift = ord(inp_srt[i]) + shift - 65
            char_shift = (char_shift % 26)
            new_str += chr(char_shift + 65)
        elif inp_srt[i].islower():
            char_shift = ord(inp_srt[i]) + shift - 97
            char_shift = char_shift % 26
            new_str += chr(char_shift + 97)
    return new_str