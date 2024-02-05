import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job';

describe('createPushNotificationsJobs', () => {
  let queue;

  before(() => {
    queue = kue.createQueue({ disableSearch: true, testMode: true });
  });

  after(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should display an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('invalid', queue)).to.throw('Jobs is not an array');
  });

  it('should create two new jobs to the queue', () => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'Message 1' },
      { phoneNumber: '4153518781', message: 'Message 2' },
    ];

    createPushNotificationsJobs(jobs, queue);

    // Validate jobs in the queue
    const jobIds = queue.testMode.jobs.map((job) => job.id);
    expect(jobIds).to.have.lengthOf(2);
    expect(jobIds).to.include.members([1, 2]);
  });

});