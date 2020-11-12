#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = 'Edoardo Lenzi'
__version__ = '1.0'
__license__ = '???'
__copyright__ = '???'


import subprocess
import argparse
import sys
import os 

from image_processing.cli_handler import CliHandler


class Parser(object):
    '''Cli entry point of the script, based on the library argparse
    see also: https://docs.python.org/3.9/library/argparse.html'''

    def __init__(self):
        self.parser = argparse.ArgumentParser(
            formatter_class=argparse.RawDescriptionHelpFormatter, 
            description = '''                              Welcome to Image Processing Script :)  

                  ___           ___                    ___         ___           ___           ___     
    ___          /__/\         /  /\                  /  /\       /  /\         /  /\         /  /\    
   /  /\        |  |::\       /  /:/_                /  /::\     /  /::\       /  /::\       /  /:/    
  /  /:/        |  |:|:\     /  /:/ /\              /  /:/\:\   /  /:/\:\     /  /:/\:\     /  /:/     
 /__/::\      __|__|:|\:\   /  /:/_/::\            /  /:/~/:/  /  /:/~/:/    /  /:/  \:\   /  /:/  ___ 
 \__\/\:\__  /__/::::| \:\ /__/:/__\/\:\          /__/:/ /:/  /__/:/ /:/___ /__/:/ \__\:\ /__/:/  /  /\\
    \  \:\/\ \  \:\~~\__\/ \  \:\ /~~/:/          \  \:\/:/   \  \:\/:::::/ \  \:\ /  /:/ \  \:\ /  /:/
     \__\::/  \  \:\        \  \:\  /:/            \  \::/     \  \::/~~~~   \  \:\  /:/   \  \:\  /:/ 
     /__/:/    \  \:\        \  \:\/:/              \  \:\      \  \:\        \  \:\/:/     \  \:\/:/  
     \__\/      \  \:\        \  \::/                \  \:\      \  \:\        \  \::/       \  \::/   
                 \__\/         \__\/                  \__\/       \__\/         \__\/         \__\/    ''',
            epilog = 'Source: https://github.com/EdoardoLenzi9/BRDF_Goniochromism' )


        self.parser.add_argument('--compare', dest='compare', metavar='N', type=str, nargs=2,
                                help='Compares 2 images')


    def parse(self):    
        return self.parser.parse_args()


    def parse_args(self, command):    
        return self.parser.parse_args(command)