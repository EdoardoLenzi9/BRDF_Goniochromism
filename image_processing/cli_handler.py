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
        if not path.exists(loc.abs_path([loc.TMP, loc.BIO_BERT_GIT])):
            #ModelService.get_bio_git_model()
            pass
        if args.import_ds:
            self.import_handler()
        elif args.run is not None:
            self.run_handler(args.run[0])
        elif args.clean:
            self.clean_handler()
        else:
            self.default_handler()


    # Command Handlers 

    def default_handler(self):
        LOG.info('Welcome to ADE Detection script! Type -h for help \n\n' +
                 '[You have to type at least one command of the pipeline]\n')


    def clean_handler(self):
        LOG.info('clean')
        fm.rmdir(loc.TMP_PATH)

    
    def import_handler(self):
        if os.path.exists(loc.DB_PATH):
            os.remove(loc.DB_PATH)
        LOG.info('DB creation')
        DB = DatabaseService()
        DB.create_all()
        
        LOG.info('Import CADEC')
        CadecImporter()
        LOG.info('Import SMM4H-19')
        SMM4H19Importer()
        SMM4H19BlindImporter()
        LOG.info('Tokenization')
        TokenizationService(CORPUS.CADEC)
        TokenizationService(CORPUS.SMM4H19_TASK2)


    def set_all_seed(self, seed):
        LOG.info(f"random seed {seed}")
        np.random.seed(seed)
        random.seed(seed)
        torch.manual_seed(seed)
        # if you are using GPU
        if torch.cuda.is_available():
            torch.cuda.manual_seed(seed)
            torch.cuda.manual_seed_all(seed)


    def run_handler(self, run_path):
        json = fm.from_json(loc.abs_path([loc.ASSETS, loc.RUNS, run_path]))
        for task in json:
#            try:
                random_seed = int(task['train_config']['random_seed'])
                architecture = enum_by_name(ARCHITECTURE, task['architecture'])
                self.set_all_seed(random_seed) #TODO
                models = []
                for m in task["models"]:
                    model = enum_by_name(MODEL, m['model'])
                    train_config = TrainConfig( int(m['train_config']['max_patience']),
                                                float(m['train_config']['learning_rate']), 
                                                float(m['train_config']['dropout']),
                                                int(m['train_config']['epochs']), 
                                                random_seed, 
                                                float(m['train_config']['epsilon']) )
                    models.append(Model(model, train_config))

                task = Task( task['id'], task['split_folder'],  
                             enums_by_list(TIDY_MODE, task['tidy_modes']), 
                             enum_by_name(CORPUS, task['corpus']), 
                             enum_by_name(NOTATION, task['notation']), 
                             models, 
                             architecture,
                             enums_by_list(ANNOTATION_TYPE, task['goal']), 
                             enum_by_name(TRAIN_MODE, task['train_mode']) )
               
                if task.models[0].model == MODEL.DIRKSON:
                    self.dirkson_task_handler(task)
                else: 
                    self.bert_task_handler(task)
#            except:
#                LOG.warning('Task Failed')
        

    def dirkson_task_handler(self, task):
        DirksonTaskLoader(task)
        DirksonTrainer(task.corpus.name)
        DirksonFinalTrainer(task.corpus.name)
        Comparator.compare_dirkson(task.corpus.name)
    

    def bert_task_handler(self, task):
        
        if task.architecture == ARCHITECTURE.DUAL_BERT_LATE:
            loaded_task = DualBertTaskLoader(task)
            DualBertTrainer(loaded_task.task)
        elif task.architecture == ARCHITECTURE.DUAL_BERT_EARLY: #TODO
            loaded_task = DualBertTaskLoader(task)
            DualBertTrainer(loaded_task.task) 
        else:
            loaded_task = BertTaskLoader(task)
            BertTrainer(loaded_task.task) 


# Used when spawned in a new process

if __name__ == '__main__':
    LOG.info(f'Subprocess started {sys.argv}')
    sys.stdout.flush()
    from image_processing.cli import Parser
    args = Parser().parse()    
    CliHandler(args)