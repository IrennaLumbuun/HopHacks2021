import sys
import os
import re

allIngredients = set()

with open('./ingredients.csv') as f:
    raw_data = f.readlines()
    for line in raw_data[1:]:
        itemset = [item.strip() for item in line.split('|')]
        if len(itemset) < 16:
            continue
        ingredients = itemset[8]
        ingredients = [ingredient.lower().strip('\n"\t )*.') for ingredient in ingredients.split(',')]
        # remove if item name is too long
        for i in ingredients:
            if len(i.split(" ")) <= 2 and i.isalpha():
                allIngredients.add(i)
    print(allIngredients)

with open('./foodName.json', 'w') as f:
    ls = list(allIngredients)
    s = '{ "foodName" : ['
    for l in ls:
        s += ('"' + l + '", ')
    s = s[:-2] + ']}'
    f.write(s)
