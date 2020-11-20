#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = 'Edoardo Lenzi'
__version__ = '1.0'
__license__ = '???'
__copyright__ = '???'


# load .env configs
from image_processing.utils.env import Env
Env.load()

Env.set_value(Env.DB, Env.TEST_DB)

import unittest

from tests import CliTest

'''Run all tests in tests/'''

unittest.main()