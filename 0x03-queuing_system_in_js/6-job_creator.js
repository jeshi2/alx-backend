import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Create an object with Job data
const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, this is a notification!',
};

const job = queue.create('push_notification_code', jobData);

// On successful job creation
job.save((err) => {
  if (!err) {
    console.log(`Notification job created: ${job.id}`);
  } else {
    console.error(`Error creating job: ${err}`);
  }

  // Process the job
  queue.process('push_notification_code', (job, done) => {
    console.log('Processing job...');
    console.log(`Sending notification to ${job.data.phoneNumber}: ${job.data.message}`);
    done();
  });

  // On successful job completion
  job.on('complete', () => {
    console.log('Notification job completed');
    process.exit(0);
  });

  // On job failure
  job.on('failed', (err) => {
    console.error(`Notification job failed: ${err}`);
    process.exit(1);
  });
});
