#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = 'Edoardo Lenzi'
__version__ = '1.0'
__license__ = '???'
__copyright__ = '???'


import os
import json


'''Localization keys and files'''


def abs_path(relative_path: list) -> str:

    ''' given an array of localizations (relative path) 
    returns and absolute path starting from cwd '''

    abs_path = os.getcwd()
    for p in relative_path:
        abs_path = os.path.join(abs_path, p)
    if os.path.isdir(abs_path) and not os.path.exists(abs_path):
        os.mkdir(abs_path)
    return abs_path


# Localizations for files

# Localizations for links

# Localizations for folders

ASSETS = 'assets'
TMP = 'tmp'
DATASETS = 'datasets'


# Localizations for paths

# Connection Strings

DB_CONNECTION_STRING = 'sqlite:///assets/db.sqlite'
TEST_DB_CONNECTION_STRING = 'sqlite:///tmp/test_db.sqlite'
INTEGRATION_TEST_DB_CONNECTION_STRING = 'sqlite:///tmp/integration_test_db.sqlite'
DB = 'db.sqlite'
TEST_DB = 'test_db.sqlite'
INTEGRATION_DB = 'integration_test_db.sqlite'
DB_PATH = abs_path([ASSETS, DB])
TEST_DB_PATH = abs_path([TMP, TEST_DB])
INTEGRATION_DB_PATH = abs_path([TMP, INTEGRATION_DB])


# Localizations for exceptions

FAIL_ENGINE_CREATION_EXCEPTION = 'Fail to create db engine'