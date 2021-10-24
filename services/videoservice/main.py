from app.imports.external import *

# parse .env file if exists
if os.path.exists('.env'):
    for line in open('.env'):
        var = line.strip().split('=')
        if len(var) == 2:
            os.environ[var[0]] = var[1]

from app.create_app import create_app

app = create_app()

if __name__ == '__main__':
    # start consuming
    app.start_consuming()
