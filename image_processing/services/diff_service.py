#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = 'Edoardo Lenzi'
__version__ = '1.0'
__license__ = '???'
__copyright__ = '???'


import logging
LOGGER = logging.getLogger(__name__)

from PIL import Image
from os import path
import os 


class DiffService(object):
    
    def __init__(self, img_path1, img_path2):
        img1 = Image.open(img_path1)
        img2 = Image.open(img_path2)
        pix1 = img1.load()
        pix2 = img2.load()
        assert img1.size[0] == img2.size[0]
        assert img1.size[1] == img2.size[1]

        for x in range(img1.size[0]):
            for y in range(img1.size[1]):
                if pix1[x, y] == pix2[x, y]:
                    pix1[x, y] = (0, 0, 0)
                    pix2[x, y] = (0, 0, 0) 
        file_name1 = os.path.basename(img_path1)
        file_name2 = os.path.basename(img_path2)
        img1.save(img_path1.replace(file_name1, "diff_" + file_name1))
        img2.save(img_path2.replace(file_name2, "diff_" + file_name2))