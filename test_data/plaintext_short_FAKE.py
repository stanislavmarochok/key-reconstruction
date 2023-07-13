import random

with open('ciphertext_short.txt', 'r') as source_file:
    with open('plaintext_short_FAKE.txt', 'w') as target_file:
        sourceFileLines = source_file.readlines()
        for x in sourceFileLines:
            line = x.strip()
            for c in line:
                randomChrIdx = random.randint(0, 25)
                randomChr = chr(ord('a') + randomChrIdx)
                target_file.write(randomChr)
            target_file.write('\n')
