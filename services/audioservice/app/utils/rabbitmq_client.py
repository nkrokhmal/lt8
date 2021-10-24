from app.imports.external import *
from config import config
from app.utils.thread import ThreadWithReturnValue
import requests


class RabbitMQClient:
    def __init__(self, callback=None):
        self.callback = callback
        self.config = config
        self.channel_name = config.RABBITMQ_QUEUE_AUDIO_NAME
        credentials = pika.PlainCredentials(
            username=config.RABBITMQ_USERNAME,
            password=config.RABBITMQ_PASSWORD
        )
        rabbitmq_params = pika.ConnectionParameters(
            host=config.RABBITMQ_HOST,
            virtual_host=config.RABBITMQ_VHOST,
            port=config.RABBITMQ_PORT,
            credentials=credentials
        )
        connection = pika.BlockingConnection(parameters=rabbitmq_params)
        self.channel = connection.channel()
        self.channel.queue_declare(queue=self.channel_name)
        self.channel.basic_qos(prefetch_count=1)

    def publish(self, queue, msg):
        self.channel.basic_publish(exchange='', routing_key=queue, body=msg)

    def handler(self, channel, method, properties, body):
        try:
            data = json.loads(body.decode("utf-8"))['path']
        except:
            exit(1)

        thread = ThreadWithReturnValue(target=self.callback, args=(data, ))
        thread.start()

        while thread.is_alive():
            channel._connection.sleep(1.0)

        messages = thread.join()
        self.channel.queue_declare(queue=config.RABBITMQ_QUEUE_STT_NAME)

        for i, message in enumerate(messages):
            self.publish(config.RABBITMQ_QUEUE_STT_NAME, message)

        self.channel.basic_ack(delivery_tag=method.delivery_tag)

    def start_consuming(self):
        self.channel.basic_consume(
            queue=self.channel_name, on_message_callback=self.handler)
        print(' [*] Waiting for messages. To exit press CTRL+C')
        self.channel.start_consuming()