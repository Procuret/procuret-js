"""
Procuret JS Library
Test Compilation Tool
author: hugh@blinkybeach.com
"""
from compile import CompiledJavaScript


class Tests:
    """
    A utility for compiling a test tool for the Procuret JavaScript library.
    Use this tool to generate an HTML document that can be served from a web
    server for testing purposes.
    """

    @staticmethod
    def save_to_file(
        output_filename: str,
        source_path: str = '../source'
    ) -> None:
        """
        Return None after writing a test tool to `output_filename`.
        """
        
        library: str = CompiledJavaScript.make_compiled_string(
            source_path=source_path
        )

        test_script: str

        with open('test_script.js', 'r') as rfile:
            test_script = rfile.read()
            pass

        template: str

        with open('test_template.html', 'r') as rfile:
            template = rfile.read()
            pass

        test_file: str = template.format(
            library=library,
            test_script=test_script
        )

        with open(output_filename, 'w') as wfile:
            wfile.write(test_file)
            pass

        return None

if __name__ == '__main__':

    Tests.save_to_file(output_filename='test.html')

    pass
