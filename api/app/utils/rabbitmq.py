from app.imports.external import *
from app.core.config import settings


class RabbitMQClient:
    def __init__(self, callback=None):
        credentials = pika.PlainCredentials(
            username=settings.RABBITMQ_USERNAME,
            password=settings.RABBITMQ_PASSWORD
        )
        self.connection_params = pika.ConnectionParameters(
            host=settings.RABBITMQ_HOST,
            virtual_host=settings.RABBITMQ_VHOST,
            port=settings.RABBITMQ_PORT,
            credentials=credentials,
            heartbeat=10,
        )
        self.connection = pika.BlockingConnection(
            parameters=self.connection_params
        )
        self.channel = self.connection.channel()
        self.callback = callback

    def create_queue(self, queue):
        if self.is_closed():
            self.connect()
        print(self.connection.is_closed)
        self.channel.queue_declare(queue=queue)

    def is_closed(self):
        print(f"Connection is closed {self.connection.is_closed}")
        return self.connection.is_closed

    def connect(self):
        if self.is_closed():
            print("Recreating connection")
            self.connection = pika.BlockingConnection(self.connection_params)
            self.channel = self.connection.channel()
            print(f"Connection is closed {self.connection.is_closed}")

    def create_queues(self, queues):
        if self.is_closed():
            self.connect()

        for queue in queues:
            self.create_queue(queue)

    def subscribe(self, queues):
        if self.is_closed():
            self.connect()

        for queue in queues:
            self.channel.queue_declare(queue=queue)

    def publish(self, queue, msg):
        if self.is_closed():
            self.connect()

        self.channel.basic_publish(exchange='', routing_key=queue, body=msg)
        # todo: check connection

    def handler(self, channel, method, properties, body):
        thread = threading.Thread(target=self.callback, args=(body,))
        thread.start()

        while thread.is_alive():
            channel._connection.sleep(1.0)
        channel.basic_ack(delivery_tag=method.delivery_tag)

    def start_consuming(self, queue):
        self.channel.basic_consume(queue=queue, on_message_callback=self.handler)
        self.channel.start_consuming()
