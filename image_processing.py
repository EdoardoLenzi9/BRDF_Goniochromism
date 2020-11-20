#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = 'Edoardo Lenzi'
__version__ = '1.0'
__license__ = '???'
__copyright__ = '???'


# load .env configs
from image_processing.utils.env import Env
Env.load()

# ade_detection/cli.py wrapper
import subprocess 
import os 
import sys 

from image_processing.cli import Parser
from image_processing.cli_handler import CliHandler

args = Parser().parse()    
CliHandler(args)