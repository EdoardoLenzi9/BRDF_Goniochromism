#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = 'Edoardo Lenzi'
__version__ = '1.0'
__license__ = '???'
__copyright__ = '???'


import unittest
import sys
import os
from os import path

from image_processing.cli_handler import CliHandler
from image_processing.cli import Parser


class CliTest(unittest.TestCase):


    def setUp(self):
        '''test fixture''' 
        

    def test(self):
        command = '--diff assets/images/test0.jpg assets/images/test1.jpg'.split()
        args = Parser().parse_args(command)    
        CliHandler(args)