from app.imports.external import *

if os.path.exists('.env'):
    for line in open('.env'):
        var = line.strip().split('=')
        if len(var) == 2:
            print(var[0], var[1])
            os.environ[var[0]] = var[1]

from app.create_app import create_app

app = create_app()

if __name__ == '__main__':
    app.start_consuming()