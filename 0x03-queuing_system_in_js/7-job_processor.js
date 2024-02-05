import kue from 'kue';

// Create an array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send a notification
const sendNotification = (phoneNumber, message, job, done) => {
  // Track the progress of the job
  job.progress(0, 100);

  // Check if phoneNumber is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    // Fail the job with an error message
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  } else {
    // Track progress to 50%
    job.progress(50, 100);

    // Log to the console
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

    done();
  }
};

const queue = kue.createQueue({ concurrency: 2 });

queue.process('push_notification_code_2', (job, done) => {
  // Extract data from the job
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function
  sendNotification(phoneNumber, message, job, done);
});

console.log('Waiting for jobs...');
