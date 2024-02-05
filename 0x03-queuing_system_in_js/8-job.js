import kue from 'kue';

// Function to create push notification jobs
const createPushNotificationsJobs = (jobs, queue) => {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData);

    // On successful job creation
    job.save((err) => {
      if (!err) {
        console.log(`Notification job created: ${job.id}`);
      } else {
        console.error(`Error creating job: ${err}`);
      }

      // On job completion
      job.on('complete', () => {
        console.log(`Notification job ${job.id} completed`);
      });

      // On job failure
      job.on('failed', (err) => {
        console.error(`Notification job ${job.id} failed: ${err}`);
      });

      job.on('progress', (progress) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });
    });
  });
};

export default createPushNotificationsJobs;
