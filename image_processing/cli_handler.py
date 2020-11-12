#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = 'Edoardo Lenzi'
__version__ = '1.0'
__license__ = '???'
__copyright__ = '???'

# load .env configs
from image_processing.utils.env import Env
Env.load()
from image_processing.utils.logger import Logger
LOG = Logger.getLogger(__name__)

from image_processing.services.diff_service import DiffService
import image_processing.utils.localizations as loc
import image_processing.utils.file_manager as fm

from os import path
import numpy as np
import random
import shutil
import torch
import sys
import os 


class CliHandler(object):

    '''Cli business logic, given the arguments typed
    calls the right handlers/procedures of the pipeline'''


    def __init__(self, args):
        if args.diff is not None:
            self.diff_handler(args.diff[0], args.diff[1])
        elif args.clean:
            self.clean_handler()
        else:
            self.default_handler()


    # Command Handlers 

    def default_handler(self):
        LOG.info('Welcome to Image Processing script! Type -h for help \n\n' +
                 '[You have to type at least one command of the pipeline]\n')


    def clean_handler(self):
        LOG.info('clean')
        fm.rmdir(loc.TMP_PATH)

    
    def diff_handler(self, img_path1, img_path2):
        DiffService( loc.abs_path( [ img_path1 ] ), 
                     loc.abs_path( [ img_path2 ] ) )


# Used when spawned in a new process

if __name__ == '__main__':
    LOG.info(f'Subprocess started {sys.argv}')
    sys.stdout.flush()
    from image_processing.cli import Parser
    args = Parser().parse()    
    CliHandler(args)