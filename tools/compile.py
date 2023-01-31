"""
Procuret JS Library
File Compilation Tool
author: hugh@blinkybeach.com
"""
import glob
from datetime import datetime
from typing import List

class CompiledJavaScript:

    @staticmethod
    def save_to_file(
        output_filename: str,
        source_path='../source'
    ) -> None:
        """
        Return None after taking all JavaScript source files and compiling them
        into one single output file. This file can then, for example, be
        included on a web page.
        """

        compiled_time = datetime.utcnow()

        with open('../VERSION') as vfile:
            version = vfile.read().replace('\n', '')

        with open(output_filename, 'w') as wfile:
            wfile.write(f'/*Procuret JS Library {version} compiled \
    {compiled_time}*/\n\n')
            pass

        files: List[str] = glob.glob(
            pathname=f'{source_path}/**/*.js',
            recursive=True
        )

        likely_independent: List[str] = []
        likely_dependent: List[str] = []

        for file in files:
            with open(file, 'r') as rfile:
                if ' extends PR_' in rfile.read():
                    likely_dependent.append(file)
                    continue
            likely_independent.append(file)
            continue

        for file in likely_independent + likely_dependent:
            with open(file, 'r') as rfile:
                with open(output_filename, 'a') as afile:
                    afile.write(rfile.read())
                    pass
                pass
            continue

        return None

if __name__ == '__main__':

    CompiledJavaScript.save_to_file(output_filename='procuret.js')

    pass
