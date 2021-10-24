from app.scheduler import StatusScheduler

scheduler = StatusScheduler()

if __name__ == "__main__":
    scheduler.start_scheduling()
